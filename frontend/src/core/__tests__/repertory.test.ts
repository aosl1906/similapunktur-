import { describe, it, expect } from 'vitest';
import {
  doesPointMatchSymptom,
  buildUniqueRemediesList,
  getRemedyDetails,
  calculateRepertorisation
} from '../repertory';
import { PointData, SelectedSymptom } from '../types';
import { TtbDataset } from '../polarity';

describe('Repertory & Scoring Core Engine', () => {
  const samplePoints: PointData[] = [
    {
      point_id: "LU_1",
      name_german: "Mittlere Residenz",
      meridian: "lunge",
      effects: ["Reguliert das Lungen-Qi", "Senkt Schleim ab"],
      indications: ["Husten", "Dyspnoe", "Asthma", "Brustschmerz"],
      assigned_homeopathics: ["Bryonia", "Phosphorus"],
      general_analysis_rubrics: [
        {
          rubric_name: "Atmung - asthmatisch",
          remedies: [
            { name: "Bryonia", grade: 3 },
            { name: "Arsenicum", grade: 4 }
          ]
        }
      ]
    },
    {
      point_id: "HE_7",
      name_german: "Tor des Geistes",
      meridian: "herz",
      effects: ["Beruhigt den Geist", "Nährt das Herz-Blut"],
      indications: ["Schlaflosigkeit", "Herzklopfen", "Angst"],
      assigned_homeopathics: ["Aconitum", "Coffea"],
      general_analysis_rubrics: [
        {
          rubric_name: "Schlaf - schlaflos",
          remedies: [
            { name: "Coffea", grade: 4 },
            { name: "Aconitum", grade: 3 }
          ]
        }
      ]
    }
  ];

  it('checks point matching directly by effects, indications and rubrics', () => {
    expect(doesPointMatchSymptom(samplePoints[0], 'Husten')).toBe(true);
    expect(doesPointMatchSymptom(samplePoints[0], 'Asthma')).toBe(true);
    expect(doesPointMatchSymptom(samplePoints[0], 'Schlaflosigkeit')).toBe(false);

    expect(doesPointMatchSymptom(samplePoints[1], 'Schlaflosigkeit')).toBe(true);
    expect(doesPointMatchSymptom(samplePoints[1], 'Herzklopfen')).toBe(true);
  });

  it('matches symptoms using synonym dictionary', () => {
    const synonyms = {
      'schlafstörung': ['schlaflosigkeit', 'insomnie']
    };
    expect(doesPointMatchSymptom(samplePoints[1], 'Schlafstörung', synonyms)).toBe(true);
  });

  it('builds unique remedies list correctly', () => {
    const list = buildUniqueRemediesList(samplePoints);
    expect(list).toEqual(expect.arrayContaining(['Aconitum', 'Arsenicum', 'Bryonia', 'Coffea', 'Phosphorus']));
    for (let i = 0; i < list.length - 1; i++) {
      expect(list[i].localeCompare(list[i + 1], 'de', { sensitivity: 'base' })).toBeLessThanOrEqual(0);
    }
  });

  it('gets remedy details with rubrics and direct points', () => {
    const details = getRemedyDetails('Bryonia', samplePoints);
    expect(details.remedy).toBe('Bryonia');
    expect(details.direct_points).toContain('LU_1');
    expect(details.rubrics.some(r => r.rubric === 'Atmung - asthmatisch' && r.grade === 3)).toBe(true);
  });

  it('calculates repertorisation with exponential scoring and coverage bonus', () => {
    const symptoms: SelectedSymptom[] = [
      { id: 's1', text: 'Husten', weight: 2 },
      { id: 's2', text: 'Schlaflosigkeit', weight: 1 }
    ];

    // Linear calculation check:
    const linearResult = calculateRepertorisation({
      selectedSymptoms: symptoms,
      allPointsData: samplePoints,
      useExponentialScoring: false,
      useCoverageBonus: false
    });
    // Bryonia: direct match at LU_1 has grade 3 * weight 2 = 6
    const linearBryonia = linearResult.remedyScores.find(r => r.name === 'Bryonia');
    expect(linearBryonia?.score).toBe(6);

    // Exponential calculation check:
    // Bryonia: direct match has (3^2 = 9) * weight 2 = 18
    const expResult = calculateRepertorisation({
      selectedSymptoms: symptoms,
      allPointsData: samplePoints,
      useExponentialScoring: true,
      useCoverageBonus: false
    });
    const expBryonia = expResult.remedyScores.find(r => r.name === 'Bryonia');
    expect(expBryonia?.score).toBe(18);

    // Coverage bonus check:
    // If a remedy covers both symptoms (s1 and s2), it receives a totality boost!
    const multiCoverPoints: PointData[] = [
      {
        point_id: "LU_1",
        name_german: "Mittlere Residenz",
        meridian: "lunge",
        effects: ["Husten"],
        indications: ["Schlaflosigkeit"],
        assigned_homeopathics: ["SuperRemedy"]
      }
    ];
    const totalityResult = calculateRepertorisation({
      selectedSymptoms: symptoms,
      allPointsData: multiCoverPoints,
      useExponentialScoring: false,
      useCoverageBonus: true
    });
    const superRem = totalityResult.remedyScores.find(r => r.name === 'SuperRemedy');
    expect(superRem).toBeDefined();
    expect(superRem?.coverageBonusApplied).toBe(true);
    // Base score: (3 * 2) + (3 * 1) = 9. 100% coverage bonus = 9 * 1.25 = 11.25 -> round 11
    expect(superRem?.score).toBe(11);
  });

  it('applies polarity penalty to contraindicated remedies', () => {
    const mockTtb: TtbDataset = {
      "Kälte überhaupt, agg": [
        { name: "Pulsatilla", grade: 1 },
        { name: "Arsenicum", grade: 4 }
      ],
      "Wärme überhaupt, von": [
        { name: "Pulsatilla", grade: 4 },
        { name: "Arsenicum", grade: 1 }
      ]
    };

    const symptoms: SelectedSymptom[] = [
      { id: "s1", text: "[TTB] Kälte überhaupt, agg", weight: 2 }
    ];

    const result = calculateRepertorisation({
      selectedSymptoms: symptoms,
      allPointsData: [],
      staticTtbData: mockTtb,
      useExponentialScoring: false,
      usePolarityPenalty: true
    });

    const puls = result.remedyScores.find(r => r.name === 'Pulsatilla');
    expect(puls).toBeDefined();
    expect(puls?.isContraindicated).toBe(true);
    // Raw score was 1 * 2 = 2. With 50% penalty = 1.
    expect(puls?.rawScore).toBe(2);
    expect(puls?.score).toBe(1);

    const ars = result.remedyScores.find(r => r.name === 'Arsenicum');
    expect(ars).toBeDefined();
    expect(ars?.isContraindicated).toBe(false);
    expect(ars?.score).toBe(8); // 4 * 2 = 8
  });

  it('scores [Boericke] repertory symptoms exclusively with grades and weights', () => {
    const mockBoericke = {
      source: 'Essential Boericke Repertorium.rtf',
      chapters: [{ num: '1', name: 'Gemüt' }],
      rubrics: [
        {
          chapter_num: '1',
          chapter: 'Gemüt',
          parent_rubric: '',
          rubric: 'Angst',
          full_path: 'Gemüt > Angst',
          remedies: [
            { name: 'Acon.', grade: 2 },
            { name: 'Aeth.', grade: 1 }
          ]
        },
        {
          chapter_num: '1',
          chapter: 'Gemüt',
          parent_rubric: 'Angst',
          rubric: 'Sturm, Gewitter, während',
          full_path: 'Gemüt > Angst > Sturm, Gewitter, während',
          remedies: [
            { name: 'Acon.', grade: 1 },
            { name: 'Phos.', grade: 2 }
          ]
        }
      ]
    };

    const symptoms: SelectedSymptom[] = [
      { id: 'b1', text: '[Boericke] Gemüt > Angst', weight: 2 },
      { id: 'b2', text: '[Boericke] Gemüt > Angst > Sturm, Gewitter, während', weight: 1 }
    ];

    const result = calculateRepertorisation({
      selectedSymptoms: symptoms,
      allPointsData: [],
      staticBoerickeRepData: mockBoericke,
      useExponentialScoring: true,
      useCoverageBonus: true
    });

    // Acon covers both symptoms: (2^2 * 2) + (1^2 * 1) = 9, with +25% coverage bonus = 11
    expect(result.remedyScores[0].name).toBe('Acon');
    expect(result.remedyScores[0].matchesCount).toBe(2);
    expect(result.remedyScores[0].score).toBe(11);
    expect(result.remedyScores[0].coverageBonusApplied).toBe(true);
  });

  it('computes pointScores and recommendedPointIds from hybrid Boericke rubric point mappings', () => {
    const mockBoerickeWithPoints = {
      source: 'Essential Boericke Repertorium.rtf',
      chapters: [{ num: '1', name: 'Gemüt' }],
      rubrics: [
        {
          chapter_num: '1',
          chapter: 'Gemüt',
          parent_rubric: '',
          rubric: 'Angst',
          full_path: 'Gemüt > Angst',
          remedies: [{ name: 'Acon.', grade: 2 }],
          points: [
            { id: 'HE_7', score: 20, source: 'both' as const, reason: 'Indikation: Angst' },
            { id: 'LU_1', score: 10, source: 'indication' as const, reason: 'Indikation: Beklemmung' }
          ]
        }
      ]
    };

    const symptoms: SelectedSymptom[] = [
      { id: 'b1', text: '[Boericke] Gemüt > Angst', weight: 2 }
    ];

    const result = calculateRepertorisation({
      selectedSymptoms: symptoms,
      allPointsData: samplePoints,
      staticBoerickeRepData: mockBoerickeWithPoints
    });

    expect(result.pointScores.length).toBe(2);
    expect(result.pointScores[0].p.point_id).toBe('HE_7');
    expect(result.pointScores[0].matchedCount).toBe(1);
    expect(result.pointScores[0].score).toBe(40);
    expect(result.recommendedPointIds.has('HE_7')).toBe(true);
    expect(result.recommendedPointIds.has('LU_1')).toBe(true);
  });
});

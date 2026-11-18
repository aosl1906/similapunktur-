// Core Repertorisation & Remedy Scoring Engine for Similapunktur
import {
  PointData,
  SelectedSymptom,
  RemedyScore,
  PointScore,
  RepertorisationResult,
  RemedyDetails,
  BoerickeRepertoryDataset,
  BoerickeRepertoryRubric
} from './types';
import {
  calculatePolarityContraindications,
  calculatePolarityDifference,
  TtbDataset
} from './polarity';

/**
 * Checks whether an acupuncture point matches a symptom string directly or via synonyms
 */
export function doesPointMatchSymptom(
  p: PointData,
  symText: string,
  synonymsData: Record<string, string[]> = {}
): boolean {
  const cleanSym = symText.toLowerCase().trim();

  // 1. Direct match in effects
  if (p.effects && p.effects.some((e: string) => e.toLowerCase().includes(cleanSym))) return true;

  // 2. Direct match in indications
  if (p.indications && p.indications.some((i: string) => i.toLowerCase().includes(cleanSym))) return true;

  // 3. Direct match in rubrics
  if (p.general_analysis_rubrics && p.general_analysis_rubrics.some((r: any) => r.rubric_name.toLowerCase().includes(cleanSym))) return true;

  // 4. Synonym match
  const cleanQuery = cleanSym.replace('.', '');
  for (const key in synonymsData) {
    const group = synonymsData[key];
    const inGroup = group.some(term => term.toLowerCase().replace('.', '').includes(cleanQuery)) || key.toLowerCase().replace('.', '').includes(cleanQuery);
    if (inGroup) {
      for (const term of [key, ...group]) {
        const cleanTerm = term.toLowerCase();
        if (p.effects && p.effects.some((e: string) => e.toLowerCase().includes(cleanTerm))) return true;
        if (p.indications && p.indications.some((i: string) => i.toLowerCase().includes(cleanTerm))) return true;
        if (p.general_analysis_rubrics && p.general_analysis_rubrics.some((r: any) => r.rubric_name.toLowerCase().includes(cleanTerm))) return true;
      }
    }
  }

  return false;
}

/**
 * Builds a deduplicated, alphabetically sorted list of all homeopathic remedies in the points dataset
 */
export function buildUniqueRemediesList(allPointsData: PointData[]): string[] {
  const remSet = new Set<string>();
  allPointsData.forEach(p => {
    if (p.assigned_homeopathics) {
      p.assigned_homeopathics.forEach((rem: string) => remSet.add(rem));
    }
    if (p.general_analysis_rubrics) {
      p.general_analysis_rubrics.forEach((rub: any) => {
        if (rub.remedies) {
          rub.remedies.forEach((rem: any) => remSet.add(rem.name));
        }
      });
    }
  });
  return Array.from(remSet).sort((a, b) => a.localeCompare(b, 'de', { sensitivity: 'base' }));
}

/**
 * Extracts all associated rubrics and direct points for a given homeopathic remedy
 */
export function getRemedyDetails(remedyName: string, allPointsData: PointData[]): RemedyDetails {
  const cleanQuery = remedyName.toLowerCase().replace(/\.$/, "").trim();
  const direct_points: string[] = [];
  const rubricsMap = new Map<string, number>();

  allPointsData.forEach(p => {
    // 1. Direct assigned homeopathics
    if (p.assigned_homeopathics) {
      const match = p.assigned_homeopathics.some(
        (rem: string) => rem.toLowerCase().replace(/\.$/, "").trim() === cleanQuery
      );
      if (match) {
        if (!direct_points.includes(p.point_id)) {
          direct_points.push(p.point_id);
        }
      }
    }

    // 2. Rubrics of general analysis
    if (p.general_analysis_rubrics) {
      p.general_analysis_rubrics.forEach((rub: any) => {
        if (rub.remedies) {
          const remMatch = rub.remedies.find(
            (r: any) => r.name.toLowerCase().replace(/\.$/, "").trim() === cleanQuery
          );
          if (remMatch) {
            const currentGrade = rubricsMap.get(rub.rubric_name) || 0;
            if (remMatch.grade > currentGrade) {
              rubricsMap.set(rub.rubric_name, remMatch.grade);
            }
          }
        }
      });
    }
  });

  const rubrics = Array.from(rubricsMap.entries()).map(([rubric, grade]) => ({ rubric, grade }));
  rubrics.sort((a, b) => b.grade - a.grade);

  return { remedy: remedyName, rubrics, direct_points };
}

export interface RepertorisationParams {
  selectedSymptoms: SelectedSymptom[];
  allPointsData: PointData[];
  staticTtbData?: TtbDataset | null;
  staticBoerickeRepData?: BoerickeRepertoryDataset | null;
  rubricsRemediesMap?: Map<string, Map<string, number>>;
  activeModalities?: Set<string>;
  synonymsData?: Record<string, string[]>;
  /** Use non-linear exponential scoring (grade^2) to prevent the polychrest trap (default: true) */
  useExponentialScoring?: boolean;
  /** Apply Bönninghausen totality coverage bonus (default: true) */
  useCoverageBonus?: boolean;
  /** Apply Heiner Frei polarity malus (50% penalty for contraindicated remedies) (default: true) */
  usePolarityPenalty?: boolean;
}

/**
 * Executes full homeopathic repertorisation and acupuncture point ranking
 * Implements exponential scoring (grade^2), totality coverage bonus, and polarity penalty.
 */
export function calculateRepertorisation({
  selectedSymptoms,
  allPointsData,
  staticTtbData = null,
  staticBoerickeRepData = null,
  rubricsRemediesMap = new Map(),
  activeModalities = new Set(),
  synonymsData = {},
  useExponentialScoring = true,
  useCoverageBonus = true,
  usePolarityPenalty = true
}: RepertorisationParams): RepertorisationResult {
  if (selectedSymptoms.length === 0) {
    return {
      remedyScores: [],
      pointScores: [],
      recommendedPointIds: new Set(),
      contraindications: new Map()
    };
  }

  // Build O(1) lookup map for Boericke repertory rubrics if provided
  const boerickeRubricsMap = new Map<string, BoerickeRepertoryRubric>();
  if (staticBoerickeRepData?.rubrics) {
    staticBoerickeRepData.rubrics.forEach(r => {
      boerickeRubricsMap.set(r.full_path.toLowerCase().trim(), r);
    });
  }

  // 1. Calculate remedy matches
  const remedyScoresMap = new Map<string, { matches: Set<string>; score: number }>();

  selectedSymptoms.forEach(s => {
    const isTtb = s.text.startsWith("[TTB] ");
    const isBoericke = s.text.startsWith("[Boericke] ");
    const cleanSym = isTtb
      ? s.text.substring(6).toLowerCase().trim()
      : isBoericke
        ? s.text.substring(11).toLowerCase().trim()
        : s.text.toLowerCase().trim();

    if (isBoericke) {
      const rubric = boerickeRubricsMap.get(cleanSym);
      if (rubric?.remedies) {
        rubric.remedies.forEach(rem => {
          const cleanRemName = rem.name.replace(/\.$/, "");
          if (!remedyScoresMap.has(cleanRemName)) {
            remedyScoresMap.set(cleanRemName, { matches: new Set(), score: 0 });
          }
          const entry = remedyScoresMap.get(cleanRemName)!;
          if (!entry.matches.has(s.id)) {
            entry.matches.add(s.id);
            const gradeWeight = useExponentialScoring ? (rem.grade * rem.grade) : rem.grade;
            entry.score += gradeWeight * s.weight;
          }
        });
      }
    } else if (isTtb) {
      if (staticTtbData) {
        const rubricKeys = Object.keys(staticTtbData);
        const matchKey = rubricKeys.find(k => k.toLowerCase().trim() === cleanSym);
        if (matchKey) {
          const remedies = staticTtbData[matchKey];
          remedies.forEach(rem => {
            const cleanRemName = rem.name.replace(/\.$/, "");
            if (!remedyScoresMap.has(cleanRemName)) {
              remedyScoresMap.set(cleanRemName, { matches: new Set(), score: 0 });
            }
            const entry = remedyScoresMap.get(cleanRemName)!;
            if (!entry.matches.has(s.id)) {
              entry.matches.add(s.id);
              const gradeWeight = useExponentialScoring ? (rem.grade * rem.grade) : rem.grade;
              entry.score += gradeWeight * s.weight;
            }
          });
        }
      }
    } else {
      allPointsData.forEach(p => {
        if (p.general_analysis_rubrics) {
          p.general_analysis_rubrics.forEach((rub: any) => {
            if (rub.rubric_name.toLowerCase().includes(cleanSym)) {
              rub.remedies.forEach((rem: any) => {
                if (!remedyScoresMap.has(rem.name)) {
                  remedyScoresMap.set(rem.name, { matches: new Set(), score: 0 });
                }
                const entry = remedyScoresMap.get(rem.name)!;
                if (!entry.matches.has(s.id)) {
                  entry.matches.add(s.id);
                  const gradeWeight = useExponentialScoring ? (rem.grade * rem.grade) : rem.grade;
                  entry.score += gradeWeight * s.weight;
                }
              });
            }
          });
        }

        const directMatch = (p.effects && p.effects.some((e: string) => e.toLowerCase().includes(cleanSym))) ||
                            (p.indications && p.indications.some((i: string) => i.toLowerCase().includes(cleanSym)));
        if (directMatch && p.assigned_homeopathics) {
          p.assigned_homeopathics.forEach((remName: string) => {
            if (!remedyScoresMap.has(remName)) {
              remedyScoresMap.set(remName, { matches: new Set(), score: 0 });
            }
            const entry = remedyScoresMap.get(remName)!;
            if (!entry.matches.has(s.id)) {
              entry.matches.add(s.id);
              // Direct historical Weihe match defaults to grade 3 (exponential: 3^2 = 9)
              const weiheWeight = useExponentialScoring ? 9 : 3;
              entry.score += weiheWeight * s.weight;
            }
          });
        }
      });
    }
  });

  // Apply homeopathic modality boosts
  remedyScoresMap.forEach((entry, remName) => {
    activeModalities.forEach(modRubric => {
      const remMap = rubricsRemediesMap.get(modRubric);
      if (remMap) {
        const grade = remMap.get(remName);
        if (grade) {
          const modWeight = useExponentialScoring ? (grade * grade) * 2 : grade * 2;
          entry.score += modWeight;
        }
      }
    });
  });

  // Calculate polarity contraindications
  const allCandidateRemedies = Array.from(remedyScoresMap.keys());
  const contraindications = calculatePolarityContraindications(
    allCandidateRemedies,
    selectedSymptoms,
    staticTtbData
  );

  const numSymptoms = selectedSymptoms.length;
  const remedyScores: RemedyScore[] = [];

  remedyScoresMap.forEach((val, name) => {
    const matchesCount = val.matches.size;
    let score = val.score;
    const rawScore = score;
    let coverageBonusApplied = false;

    // Coverage-Bonus: Bönninghausen totality principle
    // Up to +25% bonus for complete 100% symptom coverage
    if (useCoverageBonus && numSymptoms > 1 && matchesCount > 1) {
      const coverageRatio = matchesCount / numSymptoms;
      const bonusMultiplier = 1.0 + (0.25 * coverageRatio);
      score = Math.round(score * bonusMultiplier);
      coverageBonusApplied = true;
    }

    // Polarity Analysis & Penalty (Heiner Frei)
    const isContraindicated = contraindications.has(name);
    const contraWarnings = isContraindicated ? Array.from(contraindications.get(name)!) : [];
    const polDiff = calculatePolarityDifference(name, selectedSymptoms, staticTtbData);

    if (usePolarityPenalty && isContraindicated) {
      // Apply 50% malus to rank safe indicated remedies above contraindicated ones
      score = Math.max(1, Math.round(score * 0.5));
    }

    remedyScores.push({
      name,
      matchesCount,
      score,
      rawScore,
      isContraindicated,
      contraindicationWarnings: contraWarnings,
      polarityDifference: polDiff.polarityDifference,
      coverageBonusApplied
    });
  });

  // Sort remedies: matchesCount desc, score desc
  remedyScores.sort((a, b) => {
    if (b.matchesCount !== a.matchesCount) return b.matchesCount - a.matchesCount;
    return b.score - a.score;
  });

  // 2. Calculate point matches (direct point indications + Hybrid Boericke rubric mappings)
  const pointMatchesMap = new Map<string, { p: PointData; matchedSymptoms: Set<string>; score: number }>();
  const pointById = new Map<string, PointData>();
  allPointsData.forEach(p => pointById.set(p.point_id, p));

  selectedSymptoms.forEach(s => {
    const isBoericke = s.text.startsWith("[Boericke] ");
    if (isBoericke) {
      const cleanSym = s.text.substring(11).toLowerCase().trim();
      const rubric = boerickeRubricsMap.get(cleanSym);
      if (rubric?.points && rubric.points.length > 0) {
        rubric.points.forEach(ptMatch => {
          const ptData = pointById.get(ptMatch.id);
          if (!ptData) return;
          if (!pointMatchesMap.has(ptMatch.id)) {
            pointMatchesMap.set(ptMatch.id, { p: ptData, matchedSymptoms: new Set(), score: 0 });
          }
          const entry = pointMatchesMap.get(ptMatch.id)!;
          if (!entry.matchedSymptoms.has(s.id)) {
            entry.matchedSymptoms.add(s.id);
            entry.score += ptMatch.score * s.weight;
          }
        });
      }
    }

    allPointsData.forEach(p => {
      const existing = pointMatchesMap.get(p.point_id);
      if (existing?.matchedSymptoms.has(s.id)) return;
      if (doesPointMatchSymptom(p, s.text, synonymsData)) {
        if (!pointMatchesMap.has(p.point_id)) {
          pointMatchesMap.set(p.point_id, { p, matchedSymptoms: new Set(), score: 0 });
        }
        const entry = pointMatchesMap.get(p.point_id)!;
        entry.matchedSymptoms.add(s.id);
        entry.score += s.weight;
      }
    });
  });

  const pointScores: PointScore[] = [];
  pointMatchesMap.forEach(entry => {
    if (entry.matchedSymptoms.size > 0) {
      pointScores.push({
        p: entry.p,
        matchedCount: entry.matchedSymptoms.size,
        score: entry.score
      });
    }
  });

  pointScores.sort((a, b) => {
    if (b.matchedCount !== a.matchedCount) return b.matchedCount - a.matchedCount;
    return b.score - a.score;
  });

  const recommendedPointIds = new Set(pointScores.map(item => item.p.point_id));

  return {
    remedyScores,
    pointScores,
    recommendedPointIds,
    contraindications
  };
}

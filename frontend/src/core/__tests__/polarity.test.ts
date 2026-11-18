import { describe, it, expect } from 'vitest';
import {
  calculatePolarityContraindications,
  calculatePolarityDifference,
  POLAR_CATEGORIES,
  TtbDataset
} from '../polarity';
import { SelectedSymptom } from '../types';

describe('Polarity Core Engine (Heiner Frei / Bönninghausen)', () => {
  const mockTtbData: TtbDataset = {
    "Kälte überhaupt, agg": [
      { name: "Acon.", grade: 3 },
      { name: "Ars.", grade: 4 },
      { name: "Puls.", grade: 1 }
    ],
    "Wärme überhaupt, von": [
      { name: "Acon.", grade: 1 },
      { name: "Ars.", grade: 1 },
      { name: "Puls.", grade: 4 }
    ]
  };

  it('detects polarity contraindication when opposite pole grade > selected pole grade', () => {
    // Patient has: [TTB] Kälte überhaupt, agg
    // Pulsatilla has Grade 1 on Kälte-Agg, but Grade 4 on Wärme überhaupt -> Contraindicated!
    // Arsenicum has Grade 4 on Kälte-Agg, Grade 1 on Wärme -> Valid!
    const symptoms: SelectedSymptom[] = [
      { id: "sym_1", text: "[TTB] Kälte überhaupt, agg", weight: 2 }
    ];

    const contra = calculatePolarityContraindications(
      ["Puls", "Ars"],
      symptoms,
      mockTtbData,
      POLAR_CATEGORIES
    );

    expect(contra.has("Puls")).toBe(true);
    expect(contra.has("Ars")).toBe(false);

    const pulsWarnings = Array.from(contra.get("Puls")!);
    expect(pulsWarnings[0]).toContain("Wärme-Agg. (Grad 4) vs. Kälte-Agg. (Grad 1)");
  });

  it('returns empty contraindications if no TTB symptoms present', () => {
    const symptoms: SelectedSymptom[] = [
      { id: "sym_1", text: "Kopfschmerz stechend", weight: 1 }
    ];

    const contra = calculatePolarityContraindications(
      ["Puls", "Ars"],
      symptoms,
      mockTtbData
    );

    expect(contra.size).toBe(0);
  });

  it('calculates polarity difference correctly', () => {
    const symptoms: SelectedSymptom[] = [
      { id: "sym_1", text: "[TTB] Kälte überhaupt, agg", weight: 1 }
    ];

    // Ars: patient = 4, opposite = 1 => diff = +3 (Positive = strongly indicated)
    const arsDiff = calculatePolarityDifference("Ars", symptoms, mockTtbData);
    expect(arsDiff.patientPoleSum).toBe(4);
    expect(arsDiff.oppositePoleSum).toBe(1);
    expect(arsDiff.polarityDifference).toBe(3);

    // Puls: patient = 1, opposite = 4 => diff = -3 (Negative = contraindicated!)
    const pulsDiff = calculatePolarityDifference("Puls", symptoms, mockTtbData);
    expect(pulsDiff.patientPoleSum).toBe(1);
    expect(pulsDiff.oppositePoleSum).toBe(4);
    expect(pulsDiff.polarityDifference).toBe(-3);
  });
});

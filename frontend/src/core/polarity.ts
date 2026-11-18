// Polarity Analysis & Contraindication Engine (Bönninghausen / Heiner Frei)
import { PolarMatch, SelectedSymptom } from './types';

export const POLAR_CATEGORIES: PolarMatch[] = [
  {
    key1: "kälte überhaupt, agg",
    key2: "wärme überhaupt, von",
    name1: "Kälte-Agg.",
    name2: "Wärme-Agg."
  },
  {
    key1: "kälte überhaupt, agg",
    key2: "kälte) eines",
    name1: "Kälte-Agg.",
    name2: "Kälte-Lind."
  },
  {
    key1: "wärme überhaupt, von",
    key2: "äußere wärme",
    name1: "Wärme-Agg.",
    name2: "Wärme-Lind."
  },
  {
    key1: "bewegung , agg",
    key2: "ruhe",
    name1: "Bewegungs-Agg.",
    name2: "Ruhe-Agg."
  },
  {
    key1: "trockenes wetter, agg",
    key2: "feuchtes wetter, agg",
    name1: "Trockene Luft-Agg.",
    name2: "Feuchte Luft-Agg."
  }
];

export interface TtbRemedyEntry {
  name: string;
  grade: number;
}

export type TtbDataset = Record<string, TtbRemedyEntry[]>;

/**
 * Calculates homeopathic polarity contraindications according to Heiner Frei's polarity analysis.
 * An active remedy is contraindicated if its grade on the opposite pole is higher than
 * its grade on the patient's selected pole.
 */
export function calculatePolarityContraindications(
  activeRemedies: string[],
  selectedSymptoms: SelectedSymptom[],
  staticTtbData: TtbDataset | null,
  categories: PolarMatch[] = POLAR_CATEGORIES
): Map<string, Set<string>> {
  const contraindications = new Map<string, Set<string>>();
  if (!staticTtbData) return contraindications;

  const ttbSymptoms = selectedSymptoms.filter(s => s.text.startsWith("[TTB] "));
  if (ttbSymptoms.length === 0) return contraindications;

  const rubricKeys = Object.keys(staticTtbData);

  activeRemedies.forEach(remName => {
    const cleanRem = remName.toLowerCase().replace(/\.$/, "").trim();
    ttbSymptoms.forEach(s => {
      const cleanSym = s.text.substring(6).toLowerCase().trim();

      categories.forEach(pair => {
        let isMatch = false;
        let oppositeKeyword = "";
        let selectedCategoryName = "";
        let oppositeCategoryName = "";

        if (cleanSym.includes(pair.key1.toLowerCase())) {
          isMatch = true;
          oppositeKeyword = pair.key2;
          selectedCategoryName = pair.name1;
          oppositeCategoryName = pair.name2;
        } else if (cleanSym.includes(pair.key2.toLowerCase())) {
          isMatch = true;
          oppositeKeyword = pair.key1;
          selectedCategoryName = pair.name2;
          oppositeCategoryName = pair.name1;
        }

        if (isMatch) {
          let selectedGrade = 0;
          const matchKey = rubricKeys.find(k => k.toLowerCase().trim() === cleanSym);
          if (matchKey) {
            const remedies = staticTtbData[matchKey];
            const found = remedies.find(r => r.name.toLowerCase().replace(/\.$/, "").trim() === cleanRem);
            if (found) selectedGrade = found.grade;
          }

          let oppositeGrade = 0;
          for (const key of rubricKeys) {
            if (key.toLowerCase().includes(oppositeKeyword.toLowerCase())) {
              const remedies = staticTtbData[key];
              const found = remedies.find(r => r.name.toLowerCase().replace(/\.$/, "").trim() === cleanRem);
              if (found) {
                if (found.grade > oppositeGrade) {
                  oppositeGrade = found.grade;
                }
              }
            }
          }

          if (oppositeGrade > selectedGrade) {
            if (!contraindications.has(remName)) {
              contraindications.set(remName, new Set());
            }
            contraindications.get(remName)!.add(
              `${oppositeCategoryName} (Grad ${oppositeGrade}) vs. ${selectedCategoryName} (Grad ${selectedGrade})`
            );
          }
        }
      });
    });
  });

  return contraindications;
}

/**
 * Calculates the net polarity difference for a remedy:
 * Polarity Difference = sum(patient pole grades) - sum(opposite pole grades)
 */
export function calculatePolarityDifference(
  remedyName: string,
  selectedSymptoms: SelectedSymptom[],
  staticTtbData: TtbDataset | null,
  categories: PolarMatch[] = POLAR_CATEGORIES
): { patientPoleSum: number; oppositePoleSum: number; polarityDifference: number } {
  if (!staticTtbData) {
    return { patientPoleSum: 0, oppositePoleSum: 0, polarityDifference: 0 };
  }

  const cleanRem = remedyName.toLowerCase().replace(/\.$/, "").trim();
  const ttbSymptoms = selectedSymptoms.filter(s => s.text.startsWith("[TTB] "));
  const rubricKeys = Object.keys(staticTtbData);

  let patientPoleSum = 0;
  let oppositePoleSum = 0;

  ttbSymptoms.forEach(s => {
    const cleanSym = s.text.substring(6).toLowerCase().trim();
    let symptomMatched = false;
    let selectedGrade = 0;
    let maxOppositeGrade = 0;

    categories.forEach(pair => {
      let isMatch = false;
      let oppositeKeyword = "";

      if (cleanSym.includes(pair.key1.toLowerCase())) {
        isMatch = true;
        oppositeKeyword = pair.key2;
      } else if (cleanSym.includes(pair.key2.toLowerCase())) {
        isMatch = true;
        oppositeKeyword = pair.key1;
      }

      if (isMatch) {
        symptomMatched = true;

        if (selectedGrade === 0) {
          const matchKey = rubricKeys.find(k => k.toLowerCase().trim() === cleanSym);
          if (matchKey) {
            const remedies = staticTtbData[matchKey];
            const found = remedies.find(r => r.name.toLowerCase().replace(/\.$/, "").trim() === cleanRem);
            if (found) selectedGrade = found.grade;
          }
        }

        for (const key of rubricKeys) {
          if (key.toLowerCase().includes(oppositeKeyword.toLowerCase())) {
            const remedies = staticTtbData[key];
            const found = remedies.find(r => r.name.toLowerCase().replace(/\.$/, "").trim() === cleanRem);
            if (found && found.grade > maxOppositeGrade) {
              maxOppositeGrade = found.grade;
            }
          }
        }
      }
    });

    if (symptomMatched) {
      patientPoleSum += selectedGrade;
      oppositePoleSum += maxOppositeGrade;
    }
  });

  return {
    patientPoleSum,
    oppositePoleSum,
    polarityDifference: patientPoleSum - oppositePoleSum
  };
}

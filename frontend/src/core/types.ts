// Core Type Definitions for Similapunktur

export interface SelectedSymptom {
  id: string;
  text: string;
  weight: number;
}

export interface PolarMatch {
  key1: string;
  key2: string;
  name1: string;
  name2: string;
}

export interface Meridian {
  id: string;
  name: string;
  short: string;
}

export interface RubricRemedy {
  name: string;
  grade: number;
}

export interface PointGeneralAnalysisRubric {
  rubric_name: string;
  grade?: number;
  remedies?: RubricRemedy[];
}

export interface PointVisuals {
  image_filename?: string;
  relative_coordinates?: {
    x_percent: number;
    y_percent: number;
  };
}

export interface PointData {
  point_id: string;
  name_german: string;
  name_chinese?: string;
  name_translation?: string;
  meridian: string;
  localisation_text?: string;
  effects?: string[];
  indications?: string[];
  assigned_homeopathics?: string[];
  general_analysis_rubrics?: PointGeneralAnalysisRubric[];
  precautions_or_contraindications?: string | null;
  visuals?: PointVisuals;
  [key: string]: any;
}

export interface RemedyScore {
  name: string;
  matchesCount: number;
  score: number;
  rawScore?: number;
  isContraindicated?: boolean;
  contraindicationWarnings?: string[];
  polarityDifference?: number;
  coverageBonusApplied?: boolean;
}

export interface PointScore {
  p: PointData;
  matchedCount: number;
  score: number;
}

export interface RepertorisationResult {
  remedyScores: RemedyScore[];
  pointScores: PointScore[];
  recommendedPointIds: Set<string>;
  contraindications: Map<string, Set<string>>;
}

export interface RemedyDetails {
  remedy: string;
  rubrics: Array<{ rubric: string; grade: number }>;
  direct_points: string[];
}

export interface BoerickePointMatch {
  id: string;
  score: number;
  source: 'indication' | 'effect' | 'both' | 'manual';
  reason?: string;
}

export interface BoerickeRepertoryRubric {
  chapter_num: string;
  chapter: string;
  parent_rubric: string;
  rubric: string;
  full_path: string;
  remedies: RubricRemedy[];
  points?: BoerickePointMatch[];
}

export interface BoerickeRepertoryDataset {
  source: string;
  chapters: Array<{ num: string; name: string }>;
  rubrics: BoerickeRepertoryRubric[];
}

export type ProgramType = "BUILTIN" | "CUSTOM";

export type ProgramDifficulty = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

export type DaySplitType = "PUSH_PULL_LEGS" | string;

export interface ProgramCount {
  weeks: number;
  reviews: number;
}

export interface ProgramCount {
  weeks: number;
  reviews: number;
}

export interface Program {
  id: string;
  name: string;
  description: string;
  type: ProgramType | string;
  difficulty: ProgramDifficulty | string;
  durationWeeks: number;
  daysPerWeek: number;
  daySplitType: DaySplitType;
  isPremium: boolean;
  isActive: boolean;
  isPublished: boolean;
  thumbnailUrl: string | null;
  sortOrder: number;
  features: string[];
  tags: string[];
  hasBFR: boolean;
  hasAbsWorkout: boolean;
  hasActivation: boolean;
  trainingDays: string[];
  restDays: string[];
  dayFocus: string[];
  accessories: string[];
  createdByUserId: string;
  createdAt: string;
  updatedAt: string;
  analytics: unknown | null;
  _count: ProgramCount;
}

export interface ProgramMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ProgramData {
  data: Program[];
  meta: ProgramMeta;
}

export interface ProgramResponseData {
  success: boolean;
  data: ProgramData;
  timestamp: string;
  path: string;
  method: string;
}

export interface ProgramApiResponse {
  success: boolean;
  data: ProgramResponseData;
  timestamp: string;
  path: string;
  method: string;
}

export interface ProgramsParams {
  page?: number;
  limit?: number;
  search?: string;
  isPublished?: boolean;
}

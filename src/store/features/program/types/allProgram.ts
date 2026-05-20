import type { ExerciseType } from "./newProgram";

export interface ProgrammesResponse {
  success: boolean;
  data: ProgrammesData;
  timestamp: string;
  path: string;
  method: string;
}

export interface ProgrammesData {
  success: boolean;
  message: string;
  total: number;
  data: Programme[];
}

export interface Programme {
  id: string;
  name: string;
  status: string;
  description: string;
  isActive: boolean;
  isDeleted: boolean;
  isPublished: boolean;
  isPremium: boolean;
  features: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  weeks: Week[];
  purchases: any[];
}

export interface Week {
  id: string;
  programId: string;
  name: string;
  isPremium: boolean;
  restDays: number[];
  trainingDays: number[];
  createdAt: string;
  updatedAt: string;
  days: TrainingDay[];
}

export interface TrainingDay {
  id: string;
  programId: string;
  weekId: string;
  dayNumber: number;
  dayFocus: string;
  dayFocusMuscle: string[];
  trainingMethodId: string;
  description: string;
  accessories: any[];
  executeHint: string;
  isEnableBFR: boolean;
  isEnableABS: boolean;
  createdAt: string;
  updatedAt: string;
  trainingMethod: TrainingMethod;
  exercises: Exercise[];
}

export interface TrainingMethod {
  id: string;
  name: string;
  shortDescription: string;
  relatedDescription: string;
  defaultSet: number;
  defaultReps: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Exercise {
  id: string;
  dayId: string;
  name: string;
  exerciseType: ExerciseType;
  exerciseFor: string;
  description: string | null;
  image: string | null;
  animation: string | null;
  defaultSet: number;
  defaultReps: number;
  createdAt: string;
  updatedAt: string;
  newTrainingMethodId: string | null;
  sets: Set[];
  newTrainingMethod: any | null;
}

export interface Set {
  id: string;
  exerciseId: string;
  weight: number;
  reps: number;
  rest: number;
  sequence: number;
  createdAt: string;
  updatedAt: string;
}

import type { ExerciseType } from "./newProgram";

export interface SingleExerciseResponse {
  success: boolean;
  data: Exercise;
  timestamp: string;
  path: string;
  method: string;
}

export interface Exercise {
  id: string;
  dayId: string;
  name: string;
  exerciseType: ExerciseType;
  exerciseFor: string;
  description: string;
  image: string | null;
  animation: string | null;
  defaultSet: number;
  defaultReps: number;
  createdAt: string;
  updatedAt: string;
  newTrainingMethodId: string | null;
}

export type WeekBody = {
  isPremium: boolean;
  name: string;
};

// dashboard card

interface ProgramAnalytics {
  totalPrograme: number;
  premiumProgramme: number;
  activeEnrollment: number;
}

export interface DashboardCardStartResponse {
  success: boolean;
  data: ProgramAnalytics;
  timestamp: string;
  path: string;
  method: string;
}

export type ExerciseType = "Main" | "BFR" | "ABS";

// Set / rep entry
interface WorkoutSet {
  weight: number;
  reps: number;
  rest: number;
  sequence: number;
}

// Individual exercise within a day
interface Exercise {
  name: string;
  exerciseType: ExerciseType;
  exerciseFor: string; // e.g. "Chest"
  description?: string;
  defaultSet: number;
  defaultReps: number;
  sets: WorkoutSet[];
}

// A single training day
interface TrainingDay {
  dayNumber: number;
  dayFocus: string;
  dayFocusMuscle: string[];
  description: string;
  trainingMethodId: string;
  executeHint: string;
  isEnableBFR: boolean;
  isEnableABS: boolean;
  exercises: Exercise[];
}

// A week block
interface Week {
  name: string;
  isPremium: boolean;
  restDays: number[];
  trainingDays: number[];
  days: TrainingDay[];
}

export interface ProgramPayload {
  name: string;
  description: string;
  features: string[];
  tags: string[];
  weeks: Week[];
}

// single program
export type UUID = string;
export type ISODateString = string;

export interface TrainingMethod {
  id: UUID;
  name: string;
  shortDescription: string;
  relatedDescription: string;
  defaultSet: number;
  defaultReps: number;
  isDeleted: boolean;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface WorkoutSetSingle {
  id: UUID;
  exerciseId: UUID;
  weight: number;
  reps: number;
  rest: number;
  sequence: number;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface ExerciseSingle {
  id: UUID;
  dayId: UUID;
  name: string;
  exerciseType: string;
  exerciseFor: string;
  description: string | null;
  image: string | null;
  animation: string | null;
  defaultSet: number;
  defaultReps: number;
  newTrainingMethodId: UUID | null;
  newTrainingMethod: TrainingMethod | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  sets: WorkoutSetSingle[];
}

export interface TrainingDaySingle {
  id: UUID;
  programId: UUID;
  weekId: UUID;
  dayNumber: number;
  dayFocus: string;
  dayFocusMuscle: string[];
  trainingMethodId: UUID;
  trainingMethod: TrainingMethod;
  description: string;
  accessories: string[]; // Confirmed as string[] from response
  executeHint: string;
  isEnableBFR: boolean;
  isEnableABS: boolean;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  exercises: ExerciseSingle[];
}

export interface WeekSingle {
  id: UUID;
  programId: UUID;
  name: string;
  isPremium: boolean;
  restDays: number[];
  trainingDays: number[];
  createdAt: ISODateString;
  updatedAt: ISODateString;
  days: TrainingDaySingle[];
}

export type ProgramStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export interface Programme {
  id: UUID;
  name: string;
  status: ProgramStatus;
  description: string;
  isActive: boolean;
  features: string[];
  tags: string[];
  createdAt: ISODateString;
  updatedAt: ISODateString;
  weeks: WeekSingle[];
  purchases: any[]; // You can define a proper type later if needed
}

// Inner most payload
export interface SingleProgrammeData {
  success: boolean;
  message: string;
  data: Programme;
}

// Middle wrapper
export interface SingleProgrammeWrapper {
  success: boolean;
  data: SingleProgrammeData;
}

// Final Response
export interface SingleProgramResponse {
  success: boolean;
  data: SingleProgrammeWrapper;
  timestamp: ISODateString;
  path: string;
  method: string;
}

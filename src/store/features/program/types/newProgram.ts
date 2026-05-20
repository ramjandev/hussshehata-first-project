export type ExerciseType = "Main" | "BFR" | "ABS";

export type publishedStatus = "PUBLISHED" | "DRAFT";
export type ProgramStatusParams = {
  publishedStatus?: publishedStatus;
};

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
  exerciseFor: string; //
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
  accessories: string[];
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
  exerciseType: ExerciseType;
  exerciseFor: string;
  description: string | null;
  image: string | null;
  animation: string | null;
  defaultSet: number;
  defaultReps: number;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  newTrainingMethodId: UUID | null;
  sets: WorkoutSetSingle[];
  newTrainingMethod: TrainingMethod | null;
}

export interface TrainingDaySingle {
  id: UUID;
  programId: UUID;
  weekId: UUID;
  dayNumber: number;
  dayFocus: string;
  dayFocusMuscle: string[];
  trainingMethodId: UUID;
  description: string;
  accessories: string[];
  executeHint: string;
  isEnableBFR: boolean;
  isEnableABS: boolean;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  trainingMethod: TrainingMethod;
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

export interface Purchase {
  id: string;
  userId: UUID;
  programId: UUID;
  plan: string;
  status: string;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  stripePriceId: string;
  stripePaymentIntentId: string;
  currentPeriodStart: ISODateString;
  currentPeriodEnd: ISODateString;
  cancelAtPeriodEnd: boolean;
  cancelledAt: ISODateString | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  user?: {
    id: UUID;
    name: string;
    email: string;
  };
}

export interface Programme {
  id: UUID;
  name: string;
  status: ProgramStatus;
  description: string;
  isActive: boolean;
  isDeleted: boolean;
  isPublished: boolean;
  isPremium: boolean;
  features: string[];
  tags: string[];
  createdAt: ISODateString;
  updatedAt: ISODateString;
  weeks: WeekSingle[];
  purchases: Purchase[];
}

export interface SingleProgrammeApiResponse {
  success: boolean;
  message: string;
  data: Programme;
}

export interface SingleProgramResponse {
  success: boolean;
  data: SingleProgrammeApiResponse;
  timestamp: ISODateString;
  path: string;
  method: string;
}

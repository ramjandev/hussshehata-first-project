export interface ExerciseSet {
  setNumber: number;
  reps: string;
  restSeconds: number;
  notes: string;
}

export type ExerciseTabType = "MAIN_EXERCISE" | "BFR_EXERCISE" | "ABS_EXERCISE";

export type SetType =
  | "NORMAL"
  | "WARMUP"
  | "DROP_SET"
  | "SUPER_SET"
  | "FAILURE"
  | "BFR";

export interface ExercisePayload {
  exerciseId: string;
  exerciseName: string;
  exerciseDescription: string;
  exerciseFor: string;
  exerciseImageUrl: string;
  exerciseAnimationUrl: string;
  tabType: ExerciseTabType;
  sets: ExerciseSet[];
  setType: SetType;
  isOptional: boolean;
  accessoryNote: string;
  sortOrder: number;
}

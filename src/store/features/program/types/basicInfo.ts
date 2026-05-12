export type TrainingDayType = "PUSH" | "PULL" | "LEGS";

export interface Day {
  dayType: TrainingDayType;
  name: string;
  trainingMethod: string;
  description: string;
  howToExecute: string;
  exerciseHint: string;
  hasBFR: boolean;
  hasAbs: boolean;
}

export interface Week {
  weekNumber: number;
  trainingDays: string[];
  restDays: string[];
  accessories: string[];
  days: Day[];
}

export interface ProgramSchedule {
  weeks: Week[];
}
//basic info
export interface BasicInfo {
  name: string;
  durationWeeks: number;
  description: string;
  features: string[];
}

export type BasicInfoResponse = {
  success: boolean;
  data: {
    success: boolean;
    data: {
      id: string;
      name: string;
      description: string;
      type: "BUILTIN" | string;
      difficulty: "INTERMEDIATE" | string;
      durationWeeks: number;
      daysPerWeek: number;
      daySplitType: "PUSH_PULL_LEGS" | string;
      isPremium: boolean;
      isActive: boolean;
      isPublished: boolean;
      thumbnailUrl: string | null;
      sortOrder: number;
      features: any[]; // or string[] if known
      tags: any[]; // or string[] if known
      hasBFR: boolean;
      hasAbsWorkout: boolean;
      hasActivation: boolean;
      trainingDays: any[]; // could be a structured type
      restDays: any[];
      dayFocus: any[];
      accessories: any[];
      createdByUserId: string;
      createdAt: string; // ISO date string
      updatedAt: string; // ISO date string
    };
    timestamp: string; // ISO date string
    path: string;
    method: string;
  };
  timestamp: string; // ISO date string
  path: string;
  method: string;
};

export type ExerciseSets = {
  sets: {
    setNumber: number;
    reps: string;
    restSeconds: number;
  }[];
};

export type OrderedIdsPayload = {
  orderedIds: string[];
};

//  new
export type EquipmentType =
  | "BARBELL"
  | "DUMBBELL"
  | "CABLE"
  | "MACHINE"
  | "BODYWEIGHT"
  | "BANDS"
  | "KETTLEBELL"
  | "SMITH_MACHINE"
  | "NONE";

export type TrainingMethodType =
  | "FIVE_BY_FIVE"
  | "MAX_OT"
  | "BULLDOZER"
  | "BURNS"
  | "GIRONDA_8X8"
  | "TEN_BY_THREE"
  | "HIGH_REP_20_REP_SQUAT"
  | "YATES_HIGH_INTENSITY"
  | "WESTSIDE_CONJUGATE"
  | "MODERATE_VOLUME"
  | "SINGLES_DOUBLES_TRIPLES"
  | "ACTIVATION"
  | "CUSTOM";
export type MediaType = "IMAGE" | "VIDEO" | "GIF";

export type SetType =
  | "NORMAL"
  | "WARMUP"
  | "DROP_SET"
  | "SUPER_SET"
  | "FAILURE"
  | "BFR";
export type WorkoutDayType =
  | "PUSH"
  | "PULL"
  | "LEGS"
  | "UPPER"
  | "LOWER"
  | "FULL_BODY"
  | "REST"
  | "CUSTOM";
export type MuscleGroup =
  | "CHEST"
  | "BACK"
  | "SHOULDERS"
  | "BICEPS"
  | "TRICEPS"
  | "LEGS"
  | "QUADS"
  | "HAMSTRINGS"
  | "CALVES"
  | "GLUTES"
  | "ABS"
  | "TRAPS"
  | "FOREARMS"
  | "FULL_BODY";
export type DayOfWeek = "1" | "2" | "3" | "4" | "5" | "6" | "7";

export interface BfrExercise extends MainExercise {
  setType: SetType; // usually "BFR"
  isOptional: boolean;
  accessoryNote: string;
}

export interface AbsExercise extends MainExercise {
  setType: SetType; // usually "NORMAL"
  isOptional: boolean;
}

export interface ProgramReviewResponse {
  success: boolean;
  data: ProgramReviewDataWrapper;
  timestamp: string;
  path: string;
  method: string;
}

export interface ProgramReviewDataWrapper {
  success: boolean;
  data: Program;
  timestamp: string;
  path: string;
  method: string;
}

export interface Program {
  id: string;
  name: string;
  description: string;
  duration: string;
  trainingDays: DayOfWeek[];
  restDays: DayOfWeek[];
  accessories: string[];
  dayFocusItems: DayFocusItem[];
  weeks: Week[];
}

export interface DayFocusItem {
  label: string;
  muscleGroups: MuscleGroup[];
}

export interface Week {
  weekNumber: number;
  trainingDays: DayOfWeek[];
  restDays: DayOfWeek[];
  accessories: string[];
  days: ProgramDay[];
}

export interface ProgramDay {
  id: string;
  dayNumber: number;
  name: string;
  dayType: WorkoutDayType;
  muscleGroups: MuscleGroup[];
  method: string;
  notes: string;
  mainExercises: MainExercise[];
  bfrExercises: BfrExercise[];
  absExercises: AbsExercise[];
  bfrFinisher: BfrFinisher | null;
  absNote: string | null;
}

export interface ExerciseMedia {
  id: string;
  exerciseId: string;
  type: MediaType;
  url: string;
  label: string;
  sortOrder: number;
  createdAt: string;
}

export interface SetDetail {
  id: string;
  programDayExerciseId: string;
  setNumber: number;
  reps: string;
  restSeconds: number;
  setType: SetType;
  notes: string | null;
}
export interface MainExercise {
  id: string;
  exerciseId: string;
  exerciseName: string;
  sets: number;
  reps: string;
  rest: string;
  equipment: EquipmentType;
  muscleGroups: MuscleGroup[];
  setDetails: SetDetail[];
  media: ExerciseMedia[];
}

export interface BfrFinisher {
  // unknown structure from API right now
  [key: string]: any;
}

//user management
export type UserType =
  | "USER"
  | "PREMIUM"
  | "COACH"
  | "ADMIN"
  | "SUPERADMIN"
  | "MODERATOR"
  | "SUPPORT"
  | string;
// Core entity types
interface CoachProfile {
  id: string;
  userId: string;
  bio: string | null;
  specialties: string[];
  certifications: string[];
  profilePhoto: string | null;
  phoneNumber: string | null;
  isVerified: boolean;
  isActive: boolean;
  rating: number;
  totalReviews: number;
  totalClients: number;
  totalSessionsHeld: number;
  gymName: string | null;
  gymLocation: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  role: UserType;
  isActive: boolean;
  isPremium: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  coachProfile: CoachProfile | null;
}

interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPage: number;
}

interface DashboardData {
  lastMonthUserCount: number;
  totalUserCount: number;
  totalActiveUser: number;
  premiumUser: number;
}

interface UserListData {
  meta: PaginationMeta;
  dashboardData: DashboardData;
  data: User[];
}

// API response wrapper types

export interface userManagementResponse {
  success: boolean;
  data: UserListData;
  timestamp: string;
  path: string;
  method: string;
}

// param
export interface GetUsersParams {
  page?: number;
  limit?: number;
  role?: UserType;
  status?: string;
  search?: string;
}

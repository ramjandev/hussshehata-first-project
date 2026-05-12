import type { UserType } from "./review";

// Meta information
interface Meta {
  workoutCompliteToday: number;
  activeSession: number;
  avgSessionTime: number;
}

// User Activity Log
type ActivityType =
  | "LOGIN_FAILED"
  | "ENROLLED_IN_PROGRAM"
  | "COMPLETED_WORKOUT";

interface LoginFailedMeta {
  reason: "invalid_credentials" | "wrong_password";
  ipAddress: string;
}

interface EnrolledInProgramMeta {
  programId: string;
  programName: string;
}

interface CompletedWorkoutMeta {
  totalVolume: number;
  workoutLogId: string;
  durationSeconds: number;
  programCompleted: boolean;
}

type ActivityMeta =
  | LoginFailedMeta
  | EnrolledInProgramMeta
  | CompletedWorkoutMeta;

interface UserActivityLog {
  id: string;
  userId: string;
  type: ActivityType;
  meta: ActivityMeta;
  createdAt: string;
}

// User

type WeightUnit = "KG" | "LB";
type MeasureUnit = "CM" | "INCH";

type Provider = "EMAIL" | "GOOGLE" | "APPLE" | "FIREBASE";
interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  avatar: string | null;
  googleId: string | null;
  appleId: string | null;
  firebaseUid: string | null;
  provider: Provider;
  role: UserType;
  permissions: string[];
  isPremium: boolean;
  premiumUntil: string | null;
  trialEndsAt: string;
  gender: string | null;
  age: number | null;
  phoneNumber: string | null;
  weightUnit: WeightUnit;
  measureUnit: MeasureUnit;
  focusScore: number;
  streakDays: number;
  lastActiveDate: string | null;
  totalWorkouts: number;
  isActive: boolean;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string | null;
}

// Popular Programme
interface PopularProgramme {
  programId: string;
  name: string;
  users: number;
  completionRate: number;
}

// Inner Data
interface ActivityTrackingData {
  meta: Meta;
  userActivityLog: UserActivityLog[];
  mostRecentActiveUser: User[];
  mostPopulerProgramme: PopularProgramme[];
}

// API Response wrapper
interface ApiInnerResponse {
  success: boolean;
  data: ActivityTrackingData;
  timestamp: string;
  path: string;
  method: string;
}

export interface ActivityTrackingResponse {
  success: boolean;
  data: ApiInnerResponse;
  timestamp: string;
  path: string;
  method: string;
}

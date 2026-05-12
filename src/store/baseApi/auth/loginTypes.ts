export type UserRole =
  | "USER"
  | "PREMIUM"
  | "COACH"
  | "ADMIN"
  | "SUPERADMIN"
  | "MODERATOR"
  | "SUPPORT";
export interface LoginResponse {
  success: boolean;
  data: AuthData;
  timestamp: string;
  path: string;
  method: string;
}

export interface AuthData {
  accessToken: string;
  refreshToken: string;
  sessionId: string;
  user: User;
  context: UserContext;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string | null;
  role: UserRole;
  permissions: string[];
  isPremium: boolean;
}

export interface UserContext {
  isTrainee: boolean;
  isExerciseUser: boolean;
  isCoach: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  clientProfileId: string | null;
  coachName: string | null;
  traineeStatus: string | null;
  coachProfileId: string | null;
  activeProfiles: string[];
}

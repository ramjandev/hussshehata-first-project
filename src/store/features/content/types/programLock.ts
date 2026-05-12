export interface ProgramLockStatus {
  success: boolean;
  data: ProgramLockStatusWrapper;
  timestamp: string;
  path: string;
  method: string;
}

export interface ProgramLockStatusWrapper {
  success: boolean;
  data: ProgramLockStatusData;
  timestamp: string;
  path: string;
  method: string;
}

export interface ProgramLockStatusData {
  programId: string;
  programName: string;
  isPremium: boolean;
  weeks: ProgramWeek[];
}

export interface ProgramWeek {
  weekId: string;
  weekNumber: number;
  isPremium: boolean;
  lockConfig: boolean;
}

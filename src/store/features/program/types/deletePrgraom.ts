import type { ProgramStatus } from "./newProgram";

export interface DeletedProgramme {
  id: string;
  name: string;
  status: ProgramStatus;
  description: string;
  isActive: boolean;
  isDeleted: boolean;
  isPublished: boolean;
  isPremium: boolean;
  features: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface DeletedProgrammeInner {
  success: boolean;
  message: string;
  data: DeletedProgramme[];
}

export interface DeletedProgrammeResponse {
  success: boolean;
  data: DeletedProgrammeInner;
  timestamp: string;
  path: string;
  method: string;
}

export type bodyType = "UPPER" | "LOWER" | " FULL_BODY";
export type BfrSessionCategory =
  | "HYPERTROPHY"
  | "STRENGTH"
  | "ENDURANCE"
  | "RECOVERY";

export interface BfrSession {
  id: string;
  category: "BFR_SESSION" | string;
  title: string;
  shortDescription: string;
  richContent: string;
  finalMessage: string | null;
  sessionCategory: BfrSessionCategory;
  bodyType: bodyType;
  durationMinutes: number;
  exerciseCount: number;
  researchCategory: string | null;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface BfrListInnerData {
  success: boolean;
  data: BfrSession[];
  timestamp: string;
  path: string;
  method: string;
}

export interface BfrListApiResponse {
  success: boolean;
  data: BfrListInnerData;
  timestamp: string;
  path: string;
  method: string;
}
export type BfrParams = {
  sessionCategory?: BfrSessionCategory;
};

/// bfr details

export interface BfrSession {
  id: string;
  category: string;
  title: string;
  shortDescription: string;
  richContent: string;
  finalMessage: string | null;
  sessionCategory: BfrSessionCategory;
  bodyType: bodyType;
  durationMinutes: number;
  exerciseCount: number;
  researchCategory: string | null;
  isActive: boolean;
  sortOrder: number;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export interface CreateBfrSessionPayload {
  title: string;
  bodyType: bodyType;
  sessionCategory: BfrSessionCategory;
  time: number;
  exercise: number;
  shortDescription: string;
  richContent: string;
}

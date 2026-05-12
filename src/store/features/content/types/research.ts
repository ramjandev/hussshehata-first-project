export interface ResearchEducation {
  id: string;
  category: "RESEARCH_AND_EDUCATION" | string;
  title: string;
  shortDescription: string;
  richContent: string;
  finalMessage: string | null;
  sessionCategory: string | null;
  bodyType: string | null;
  durationMinutes: number | null;
  exerciseCount: number | null;
  researchCategory: "BASIC" | "ADVANCED" | "DETAIL";
  isActive: boolean;
  sortOrder: number;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
}

// Inner data wrapper
interface ResearchEducationData {
  success: boolean;
  data: ResearchEducation[];
  timestamp: string;
  path: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
}

// Outer response wrapper
export interface ResearchEducationApiResponse {
  success: boolean;
  data: ResearchEducationData;
  timestamp: string;
  path: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
}

//single

export type ResearchEducationDataWrapper = {
  success: boolean;
  data: ResearchEducation;
  timestamp: string;
  path: string;
  method: "GET" | "POST" | "PATCH" | "DELETE" | string;
};

// Full API response type
export type GetResearchEducationResponse = {
  success: boolean;
  data: ResearchEducationDataWrapper;
  timestamp: string;
  path: string;
  method: "GET" | "POST" | "PATCH" | "DELETE" | string;
};

// post

export type ResearchEducationPayload = {
  title: string;
  researchCategory: "BASIC" | "ADVANCED" | "DETAIL";
  shortDescription: string;
  richContent: string;
  sortOrder: number;
};

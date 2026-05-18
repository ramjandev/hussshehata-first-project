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
  createdAt: string;
  updatedAt: string;
}

export interface ResearchEducationApiResponse {
  success: boolean;
  data: ResearchEducation[];
  timestamp: string;
  path: string;
  method: string;
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

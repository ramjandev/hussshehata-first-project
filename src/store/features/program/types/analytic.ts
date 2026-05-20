export interface ProgramHighlight {
  id: string;
  name: string;
  enrollments: number;
  completionRate: number;
}

export interface ProgramHighlightsData {
  mostPopular: ProgramHighlight;
  highestCompletion: ProgramHighlight;
}

export interface ProgramHighlightsResponse {
  success: boolean;
  data: ProgramHighlightsData;
  timestamp: string;
  path: string;
  method: string;
}
// breakdown

export interface WeeklyEnrollment {
  id: string;
  name: string;
  users: number;
  completionRate: number;
}

export interface WeeklyEnrollmentsResponse {
  success: boolean;
  data: WeeklyEnrollment[];
  timestamp: string;
  path: string;
  method: string;
}

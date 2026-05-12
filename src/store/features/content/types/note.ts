export interface ExecutionNote {
  id: string;
  title: string;
  notes: string[];
  finalMessage: string;
  position: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ExecutionNoteInnerResponse {
  success: boolean;
  data: ExecutionNote[];
  timestamp: string;
  path: string;
  method: string;
}

export interface ExecutionNoteApiResponse {
  success: boolean;
  data: ExecutionNoteInnerResponse;
  timestamp: string;
  path: string;
  method: string;
}

//single note

export interface ExecutionNoteSingle {
  id: string;
  title: string;
  notes: string[];
  finalMessage: string;
  position: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ExecutionNoteInnerSingleResponse {
  success: boolean;
  data: ExecutionNoteSingle;
  timestamp: string;
  path: string;
  method: string;
}

export interface GetExecutionNoteResponseSingle {
  success: boolean;
  data: ExecutionNoteInnerSingleResponse;
  timestamp: string;
  path: string;
  method: string;
}

// post note
export interface WorkoutDurationRule {
  title: string;
  notes: string[];
  finalMessage: string;
  position: number;
  isActive: boolean;
}

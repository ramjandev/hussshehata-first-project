export interface SafetyContentItem {
  id: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string | null;
  finalMessage: string;
  category: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface EssentialContentResponse {
  success: boolean;
  data: SafetyContentItem[];
  timestamp: string;
  path: string;
  method: string;
}

export interface SafetyResponse {
  success: boolean;
  data: EssentialContentResponse;
  timestamp: string;
  path: string;
  method: string;
}

//post
export interface EssentialContentBody {
  title: string;
  description: string;
  content: string;
  finalMessage: string;
  category: string;
  isActive: boolean;
}
//single safety
export type EssentialSingleContent = {
  success: boolean;
  data: {
    success: boolean;
    data: EssentialContent;
    timestamp: string;
    path: string;
    method: string;
  };
  timestamp: string;
  path: string;
  method: string;
};

export type EssentialContent = {
  id: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string | null;
  finalMessage: string;
  category: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

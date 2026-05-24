export type MethodPayload = {
  name: string;
  shortDescription: string;
  relatedDescription: string;
  defaultSet: number;
  defaultReps: number;
};

export interface TTrainingMethod {
  id: string;
  name: string;
  shortDescription: string;
  relatedDescription: string;
  defaultSet: number;
  defaultReps: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TrainingMethodsResponse {
  success: boolean;
  data: {
    success: boolean;
    total: number;
    data: TTrainingMethod[];
  };
  timestamp: string;
  path: string;
  method: string;
}

// single method
interface TrainingMethod {
  id: string;
  name: string;
  shortDescription: string;
  relatedDescription: string;
  defaultSet: number;
  defaultReps: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface InnerResponse {
  success: boolean;
  data: TrainingMethod;
}

export interface SingleTrainingMethodResponse {
  success: boolean;
  data: InnerResponse;
  timestamp: string;
  path: string;
  method: string;
}

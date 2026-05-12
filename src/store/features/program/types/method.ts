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

// Health marker item type
export interface HealthMarkerItem {
  id: string;
  title: string;
  items: string[];
  description: string | null;
  isActive: boolean;
  createdAt: string;
}

// Pagination meta data
interface MetaData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Inner data wrapper
interface InnerDataWrapper {
  meta: MetaData;
  data: HealthMarkerItem[];
}

// Outer data wrapper
interface DataWrapper {
  success: boolean;
  data: InnerDataWrapper;
  timestamp: string;
  path: string;
  method: string;
}

// Root response type
export interface HealthMarkersResponse {
  success: boolean;
  data: DataWrapper;
  timestamp: string;
  path: string;
  method: string;
}

export interface HealthMarkersParams {
  page?: number;
  limit?: number;
}

export type HealthMarkerPayload = {
  title: string;
  details: string[];
};

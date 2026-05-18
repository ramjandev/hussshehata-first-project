export type ClinicPlayLoad = {
  name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  openingHours: string;
  closeTime: string;
  isActive: boolean;
};

// get  partner

export type PartnerClinic = {
  id: string;
  name: string;
  description: string | null;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string | null;
  website: string | null;
  bookingUrl: string | null;
  imageUrl: string | null;
  distanceMiles: number | null;
  openingHours: string;
  closeTime: string;
  isActive: boolean;
  sortOrder: number;
  latitude: number | null;
  longitude: number | null;
  createdAt: string;
  updatedAt: string;
};

export type PartnerClinicResponse = {
  success: boolean;
  data: PartnerClinic[];
  timestamp: string;
  path: string;
  method: string;
};

//get supplement product

export type SupplementProduct = {
  id: string;
  name: string;
  category: "PERFORMANCE" | "RECOVERY" | "OPTIONAL" | "FOUNDATION";
  price: number;
  currency: string;
  vendorName: string;
  purchasePageUrl: string;
  benefits: string[];
  imageUrl: string;
  inStock: boolean;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type PaginationMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type SupplementList = {
  data: SupplementProduct[];
  meta: PaginationMeta;
};

export type SupplementApiResponse = {
  success: boolean;
  data: SupplementList;
  timestamp: string;
  path: string;
  method: string;
};

export interface SupplementParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: "FOUNDATION" | "PERFORMANCE" | "RECOVERY" | "OPTIONAL" | string;
}

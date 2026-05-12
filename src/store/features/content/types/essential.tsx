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
export type PartnerClinicData = {
  success: boolean;
  data: PartnerClinic[];
  timestamp: string;
  path: string;
  method: string;
};

export type PartnerClinicResponse = {
  success: boolean;
  data: PartnerClinicData;
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

export type SupplementApiInner = {
  success: boolean;
  data: SupplementList;
  timestamp: string;
  path: string;
  method: string;
};

export type SupplementApiResponse = {
  success: boolean;
  data: SupplementApiInner;
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

// // program card
// export type ProgramDifficulty = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

// export type DaySplitType = "PUSH_PULL_LEGS" | string;

// export type Program = {
//   id: string;
//   name: string;
//   description: string;
//   type: string;
//   difficulty: ProgramDifficulty;
//   durationWeeks: number;
//   daysPerWeek: number;
//   daySplitType: DaySplitType;
//   isPremium: boolean;
//   isActive: boolean;
//   isPublished: boolean;
//   thumbnailUrl: string | null;
//   sortOrder: number;
//   features: string[];
//   tags: string[];
//   hasBFR: boolean;
//   hasAbsWorkout: boolean;
//   hasActivation: boolean;
//   trainingDays: unknown[];
//   restDays: unknown[];
//   dayFocus: unknown[];
//   accessories: unknown[];
//   createdByUserId: string;
//   createdAt: string;
//   updatedAt: string;
// };

// export type ProgramMeta = {
//   page: number;
//   limit: number;
//   total: number;
//   totalPage: number;
// };

// export type ProgramListData = {
//   meta: ProgramMeta;
//   data: Program[];
// };

// export type ProgramApiResponse = {
//   success: boolean;
//   data: ProgramListData;
//   timestamp: string;
//   path: string;
//   method: string;
// };

// export type ProgramListResponse = {
//   success: boolean;
//   data: ProgramApiResponse;
//   timestamp: string;
//   path: string;
//   method: string;
// };

// export type ProgramListParams = {
//   page?: number;
//   limit?: number;
//   search?: string;
//   isActive?: boolean;
//   isPublished?: boolean;
//   isPremium?: boolean;
//   type?: string;
//   difficulty?: ProgramDifficulty;
// };

type Program = {
  id: string;
  name: string;
  type: string;
  durationWeeks: number;
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | string;
  isPremium: boolean;
  isActive: boolean;
  isPublished: boolean;
  thumbnailUrl: string | null;
  enrollments: number;
  activeUsers: number;
  completionRate: number;
  completedCount: number;
  estimatedRevenue: number;
  trend: "DECLINING" | "GROWING" | "STABLE" | string;
  trendIcon: string;
  reviewCount: number;
};

type Meta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  totalRevenue: number;
  premiumUserCount: number;
};

type InnerData = {
  data: Program[];
  meta: Meta;
};

export type ProgramAnalyticsResponse = {
  success: boolean;
  data: {
    success: boolean;
    data: InnerData;
    timestamp: string;
    path: string;
    method: "GET" | "POST" | "PUT" | "DELETE" | string;
  };
  timestamp: string;
  path: string;
  method: string;
};

export type ProgramParams = {
  limit?: number;
  page?: number;
};

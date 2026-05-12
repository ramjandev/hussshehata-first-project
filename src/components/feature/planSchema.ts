import { z } from "zod";

export const PlanEnum = z.enum(["FREE", "MONTHLY", "ANNUAL"]);

// API schema — features stays string[] for the backend
const baseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  plan: PlanEnum,
  priceUSD: z.number().min(0, "Price must be positive"),
  features: z.array(z.string().min(1, "Feature required")),
  isActive: z.boolean(),
});

export const createPlanSchema = z.discriminatedUnion("plan", [
  baseSchema.extend({ plan: z.literal("FREE") }),
  baseSchema.extend({
    plan: z.literal("MONTHLY"),
    billingPeriod: z.literal("MONTHLY"),
    isPopular: z.boolean().optional(),
  }),
  baseSchema.extend({
    plan: z.literal("ANNUAL"),
    billingPeriod: z.literal("ANNUAL"),
    savingsPercent: z.number().optional(),
    isPopular: z.boolean().optional(),
  }),
]);

export type CreatePlanPayload = z.infer<typeof createPlanSchema>;

export type PlanFormValues = {
  name: string;
  plan: "FREE" | "MONTHLY" | "ANNUAL";
  priceUSD: number;
  features: { value: string }[];
  isActive: boolean;
  billingPeriod?: "MONTHLY" | "ANNUAL" | null;
  savingsPercent?: number | null;
  isPopular?: boolean;
};

export const planFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  plan: PlanEnum,
  priceUSD: z.number().min(0, "Price must be positive"),
  features: z.array(z.object({ value: z.string().min(1, "Feature required") })),
  isActive: z.boolean(),
  billingPeriod: z.enum(["MONTHLY", "ANNUAL"]).nullable().optional(),
  savingsPercent: z.number().nullable().optional(),
  isPopular: z.boolean().optional(),
});

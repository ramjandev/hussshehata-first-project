import { z } from "zod";

const BaseSetSchema = z.object({
  setNumber: z.number().int("Set number must be an integer"),
  reps: z.string().min(1, "Reps cannot be empty"),
  restSeconds: z.number().int("Rest must be an integer in seconds"),
});

const NormalSetSchema = BaseSetSchema;

const BFRSetSchema = BaseSetSchema.extend({
  notes: z.string().optional(),
});

const SetTypeSchema = z.enum(["Main", "ABS", "BFR"]);

const BaseExercisePayloadSchema = z.object({
  exerciseName: z.string().min(1, "Exercise name cannot be empty"),
  exerciseDescription: z
    .string()
    .min(1, "Exercise description cannot be empty"),
  exerciseFor: z.string().min(1, "Exercise target cannot be empty"),
  setType: SetTypeSchema,
  isOptional: z.boolean(),
  accessoryNote: z.string().optional(),
  sortOrder: z.number().int("Sort order must be an integer"),
});

export const ExercisePayloadSchema = z.discriminatedUnion("tabType", [
  BaseExercisePayloadSchema.extend({
    tabType: z.literal("MAIN_EXERCISE"),
    sets: z.array(NormalSetSchema).min(1, "At least one set is required"),
  }),
  BaseExercisePayloadSchema.extend({
    tabType: z.literal("ABS_EXERCISE"),
    sets: z.array(NormalSetSchema).min(1, "At least one set is required"),
  }),
  BaseExercisePayloadSchema.extend({
    tabType: z.literal("BFR_EXERCISE"),
    sets: z.array(BFRSetSchema).min(1, "At least one set is required"),
  }),
]);

export type AddExercisePayload = z.infer<typeof ExercisePayloadSchema>;

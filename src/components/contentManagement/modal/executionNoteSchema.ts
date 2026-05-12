import { z } from "zod";

export const executionNoteSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),

  notes: z
    .array(
      z.object({
        value: z.string().min(1, "Note cannot be empty"),
      }),
    )
    .min(1, "At least one note is required"),

  finalMessage: z.string().min(1, "Final message is required"),

  position: z.number().min(0, "Position must be 0 or greater"),

  isActive: z.boolean(),
});

export type ExecutionNoteFormValues = z.infer<typeof executionNoteSchema>;

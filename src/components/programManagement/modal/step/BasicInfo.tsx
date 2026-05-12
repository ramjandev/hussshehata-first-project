import ActionButton from "@/common/button/ActionButton";
import CommonButton from "@/common/button/CommonButton";
import CommonHeader from "@/common/header/CommonHeader";
import {
  next,
  updateProgram,
} from "@/store/baseApi/programSlice/program.slice";

import { useAppDispatch, useAppSelector } from "@/store/hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

export const inputClass = {
  label: "block text-sm font-normal text-[#090818] font-inter mb-2",
  input:
    "w-full border border-[#CBD5E1] rounded-md p-3 outline-none text-[#090818] text-xs border-[#A78BFA] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#A78BFA]",
  error: "text-red-500 text-sm mt-1",
};

const basicInfoSchema = z.object({
  name: z
    .string()
    .min(1, "Program name is required")
    .max(100, "Name must be 100 characters or fewer"),
  features: z
    .array(z.object({ value: z.string().min(1, "Feature cannot be empty") }))
    .min(1, "At least one feature is required"),
  description: z
    .string()
    .min(1, "Program description is required")
    .max(500, "Description must be 500 characters or fewer"),
});

type BasicInfoFormValues = z.infer<typeof basicInfoSchema>;

const BasicInfo = () => {
  const dispatch = useAppDispatch();
  const { program } = useAppSelector((state) => state.program);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BasicInfoFormValues>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      name: program?.name ?? "",
      description: program?.description ?? "",
      features: program?.features?.length
        ? program.features.map((f) => ({ value: f }))
        : [{ value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray<
    BasicInfoFormValues,
    "features"
  >({
    control,
    name: "features",
  });

  const onSubmit = async (data: BasicInfoFormValues) => {
    dispatch(
      updateProgram({
        name: data.name,
        description: data.description,
        features: data.features.map((item) => item.value),
        tags: [],
      }),
    );

    dispatch(next());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <CommonHeader size="lg">Basic Program Information</CommonHeader>

      {/* Program Name */}
      <div>
        <label className={inputClass.label}>Program Name *</label>
        <input
          {...register("name")}
          className={inputClass.input}
          placeholder="Enter program name"
        />
        {errors.name && (
          <p className={inputClass.error}>{errors.name.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className={inputClass.label}>Program Description</label>
        <textarea
          {...register("description")}
          className={inputClass.input}
          placeholder="Enter program description"
          rows={4}
        />
        {errors.description && (
          <p className={inputClass.error}>{errors.description.message}</p>
        )}
      </div>

      {/* Features */}
      <div>
        <label className={inputClass.label}>Program Features *</label>
        <div className="space-y-2">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <input
                {...register(`features.${index}.value`)}
                className={inputClass.input}
                placeholder={`Feature ${index + 1}`}
              />

              <ActionButton
                onClick={() => remove(index)}
                variant="delete"
                isDelete={fields.length === 1}
              >
                <Trash2 className="w-5 h-5" />
              </ActionButton>
            </div>
          ))}
        </div>
        {errors.features && (
          <p className={inputClass.error}>
            {errors.features.message as string}
          </p>
        )}

        <button
          type="button"
          onClick={() => append({ value: "" })}
          className="mt-2 text-sm text-[#A78BFA] cursor-pointer"
        >
          + Add Feature
        </button>
      </div>

      <CommonButton type="submit">Next Step</CommonButton>
    </form>
  );
};

export default BasicInfo;

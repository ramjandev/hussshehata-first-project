import ButtonWithLoading from "@/common/button/ButtonWithLoading";
import CloseButton from "@/common/button/CloseButton";
import CommonButton from "@/common/button/CommonButton";
import CommonSelect from "@/common/custom/CommonSelect";
import { inputClass } from "@/components/programManagement/modal/showExerciseModal";

import {
  usePostSupplementMutation,
  useUpdateSupplementMutation,
} from "@/store/features/content/essentialManagement";
import type { SupplementProduct } from "@/store/features/content/types/essential";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const supplementSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  category: z.enum(["FOUNDATION", "PERFORMANCE", "RECOVERY", "OPTIONAL"]),
  price: z.number().min(1, "Price is required"),
  vendorName: z.string().optional(),
  purchasePageUrl: z.string().url(),
  benefits: z
    .array(z.object({ value: z.string().min(1) }))
    .min(1, "Add at least one benefit"),
  image: z.any().optional(),
});

export type SupplementFormValues = z.infer<typeof supplementSchema>;

interface AddSupplementProductModalProps {
  onClose: () => void;
  selectSupplement: SupplementProduct | null;
}

const AddSupplementProductModal: React.FC<AddSupplementProductModalProps> = ({
  onClose,
  selectSupplement,
}) => {
  const isEditMode = !!selectSupplement;

  const [postSupplement, { isLoading }] = usePostSupplementMutation();
  const [updateSupplement, { isLoading: isUpdating }] =
    useUpdateSupplementMutation();

  const [preview, setPreview] = useState<string | null>(
    selectSupplement?.imageUrl ?? null,
  );

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SupplementFormValues>({
    resolver: zodResolver(supplementSchema),
    defaultValues: isEditMode
      ? {
          name: selectSupplement.name,
          category: selectSupplement.category,
          price: selectSupplement.price,
          vendorName: selectSupplement.vendorName,
          purchasePageUrl: selectSupplement.purchasePageUrl,
          benefits: selectSupplement.benefits.map((b) => ({ value: b })),
        }
      : {
          benefits: [],
        },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "benefits",
  });

  const [benefitInput, setBenefitInput] = useState("");

  const onSubmit = async (data: SupplementFormValues) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("category", data.category);
      formData.append("price", String(data.price));

      if (data.vendorName) {
        formData.append("vendorName", data.vendorName);
      }

      formData.append("purchasePageUrl", data.purchasePageUrl);

      if (data.benefits && data.benefits.length > 0) {
        data.benefits.forEach((b) => {
          formData.append("benefits[]", b.value);
        });
      }

      if (data.image?.[0]) {
        formData.append("image", data.image[0]);
      }

      if (isEditMode) {
        await updateSupplement({
          id: selectSupplement.id,
          data: formData,
        }).unwrap();
      } else {
        await postSupplement(formData).unwrap();
      }

      onClose();
    } catch (error) {
      console.error(
        `Failed to ${isEditMode ? "update" : "create"} supplement:`,
        error,
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {isEditMode
                ? "Edit Supplement Product"
                : "Add Supplement Product"}
            </h2>
            <CloseButton action={onClose} />
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              {/* Product Name */}
              <div>
                <label className={inputClass.label}>Product Name</label>
                <input
                  {...register("name")}
                  type="text"
                  placeholder="e.g., Creatine Monohydrate"
                  className={inputClass.input}
                />
                {errors.name && (
                  <p className={inputClass.error}>{errors.name.message}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className={inputClass.label}>Category</label>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <CommonSelect
                      value={field.value}
                      onValueChange={field.onChange}
                      item={[
                        { label: "Foundation", value: "FOUNDATION" },
                        { label: "Performance", value: "PERFORMANCE" },
                        { label: "Recovery", value: "RECOVERY" },
                        { label: "Optional", value: "OPTIONAL" },
                      ]}
                      className="w-full"
                    />
                  )}
                />
                {errors.category && (
                  <p className={inputClass.error}>{errors.category.message}</p>
                )}
              </div>

              {/* Price */}
              <div>
                <label className={inputClass.label}>Price</label>
                <input
                  {...register("price", { valueAsNumber: true })}
                  type="number"
                  placeholder="0.00"
                  className={inputClass.input}
                />
                {errors.price && (
                  <p className={inputClass.error}>{errors.price.message}</p>
                )}
              </div>

              {/* Vendor */}
              <div>
                <label className={inputClass.label}>Vendor Name</label>
                <input
                  {...register("vendorName")}
                  type="text"
                  placeholder="e.g., Optimum Nutrition"
                  className={inputClass.input}
                />
              </div>

              {/* URL */}
              <div>
                <label className={inputClass.label}>
                  Product Purchase Page URL *
                </label>
                <input
                  {...register("purchasePageUrl")}
                  type="text"
                  placeholder="https://example.com/product-page"
                  className={inputClass.input}
                />
                {errors.purchasePageUrl && (
                  <p className={inputClass.error}>
                    {errors.purchasePageUrl.message}
                  </p>
                )}
              </div>

              {/* Benefits */}
              <div>
                <label className={inputClass.label}>Product Benefits</label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={benefitInput}
                    onChange={(e) => setBenefitInput(e.target.value)}
                    placeholder="Add benefit"
                    className={inputClass.input}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!benefitInput.trim()) return;
                      append({ value: benefitInput });
                      setBenefitInput("");
                    }}
                    className="bg-primary px-4 py-2 rounded text-white cursor-pointer"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="bg-blue text-white px-4 py-2 rounded-md flex items-center gap-2"
                    >
                      <span>{field.value}</span>
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-white hover:text-red-500 cursor-pointer"
                      >
                        ×
                      </button>
                      <input
                        type="hidden"
                        {...register(`benefits.${index}.value`)}
                      />
                    </div>
                  ))}
                </div>
                {errors.benefits && (
                  <p className={inputClass.error}>{errors.benefits.message}</p>
                )}
              </div>

              {/* Image Upload */}
              <div>
                <label className={inputClass.label}>Product Image</label>
                <Controller
                  control={control}
                  name="image"
                  render={({ field }) => (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center relative">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="productImage"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setPreview(URL.createObjectURL(file));
                            field.onChange(e.target.files);
                          }
                        }}
                      />

                      {!preview ? (
                        <label
                          htmlFor="productImage"
                          className="flex flex-col items-center justify-center cursor-pointer"
                        >
                          <div className="w-16 h-16 mb-4 text-gray-400">
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                            >
                              <rect
                                x="3"
                                y="3"
                                width="18"
                                height="18"
                                rx="2"
                                ry="2"
                              />
                              <circle cx="8.5" cy="8.5" r="1.5" />
                              <polyline points="21 15 16 10 5 21" />
                            </svg>
                          </div>
                          <p className="text-gray-500">
                            Click to upload product image
                          </p>
                        </label>
                      ) : (
                        <div className="relative flex justify-center">
                          <img
                            src={preview}
                            alt="preview"
                            className="max-h-40 rounded-md object-contain"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setPreview(null);
                              field.onChange(undefined);
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                />
                {errors.image?.message && (
                  <p className={inputClass.error}>
                    {String(errors.image.message)}
                  </p>
                )}
              </div>
            </div>

            <div className="pt-6">
              <CommonButton type="submit">
                {isLoading || isUpdating ? (
                  <ButtonWithLoading title="Saving..." />
                ) : isEditMode ? (
                  "Update Product"
                ) : (
                  "Add Product"
                )}
              </CommonButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSupplementProductModal;

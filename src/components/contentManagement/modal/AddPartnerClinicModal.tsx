import CloseButton from "@/common/button/CloseButton";
import CommonButton from "@/common/button/CommonButton";
import { inputClass } from "@/components/programManagement/modal/showExerciseModal";
import { Clock } from "lucide-react";

import ButtonWithLoading from "@/common/button/ButtonWithLoading";
import {
  usePostPartnerMutation,
  useUpdatePartnerMutation,
} from "@/store/features/content/essentialManagement";
import type { PartnerClinic } from "@/store/features/content/types/essential";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const clinicSchema = z.object({
  name: z.string().min(1, "Clinic name is required"),
  phone: z.string().min(1, "Phone number is required"),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  address: z.string().min(1, "Address is required"),
  openingHours: z.string().min(1, "Opening time is required"),
  closeTime: z.string().min(1, "Closing time is required"),
  isActive: z.boolean().default(true),
});

export type ClinicFormValues = z.input<typeof clinicSchema>;
export type ClinicPlayLoad = z.output<typeof clinicSchema>;

interface AddPartnerClinicModalProps {
  onClose: () => void;
  selectPartner: PartnerClinic | null;
}

const AddPartnerClinicModal: React.FC<AddPartnerClinicModalProps> = ({
  onClose,
  selectPartner,
}) => {
  const [postPartner, { isLoading }] = usePostPartnerMutation();
  const [updatePartner, { isLoading: updateLoading }] =
    useUpdatePartnerMutation();
  const isEditMode = !!selectPartner;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClinicFormValues>({
    resolver: zodResolver(clinicSchema),
    defaultValues: {
      name: selectPartner?.name ?? "",
      phone: selectPartner?.phone ?? "",
      country: selectPartner?.country ?? "",
      city: selectPartner?.city ?? "",
      address: selectPartner?.address ?? "",
      openingHours: selectPartner?.openingHours ?? "",
      closeTime: selectPartner?.closeTime ?? "",
      isActive: selectPartner?.isActive ?? true,
    },
  });

  const onSubmit = async (data: ClinicFormValues) => {
    try {
      const payload: ClinicPlayLoad = clinicSchema.parse(data);

      if (selectPartner) {
        await updatePartner({ id: selectPartner.id, data: payload }).unwrap();
      } else {
        await postPartner(payload).unwrap();
      }

      onClose();
    } catch (error) {
      console.error("Failed to save clinic:", error);
    }
  };
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {isEditMode ? "Edit Partner Clinic" : "Add Partner Clinic"}
            </h2>
            <CloseButton action={onClose} />
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="border border-darkPurple rounded-lg p-6 space-y-4">
              {/* Clinic Name */}
              <div>
                <label className={inputClass.label}>Clinic Name</label>
                <input
                  {...register("name")}
                  type="text"
                  placeholder="e.g., Elite Diagnostics Center"
                  className={inputClass.input}
                />
                {errors.name && (
                  <p className={inputClass.error}>{errors.name.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className={inputClass.label}>Phone Number</label>
                <input
                  {...register("phone")}
                  type="text"
                  placeholder="+1 (555) 123-4567"
                  className={inputClass.input}
                />
                {errors.phone && (
                  <p className={inputClass.error}>{errors.phone.message}</p>
                )}
              </div>

              {/* Country City */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={inputClass.label}>Country</label>
                  <input
                    {...register("country")}
                    type="text"
                    placeholder="USA"
                    className={inputClass.input}
                  />
                  {errors.country && (
                    <p className={inputClass.error}>{errors.country.message}</p>
                  )}
                </div>

                <div>
                  <label className={inputClass.label}>City</label>
                  <input
                    {...register("city")}
                    type="text"
                    placeholder="e.g., New York"
                    className={inputClass.input}
                  />
                  {errors.city && (
                    <p className={inputClass.error}>{errors.city.message}</p>
                  )}
                </div>
              </div>

              {/* Address */}
              <div>
                <label className={inputClass.label}>Address</label>
                <input
                  {...register("address")}
                  type="text"
                  placeholder="Street address"
                  className={inputClass.input}
                />
                {errors.address && (
                  <p className={inputClass.error}>{errors.address.message}</p>
                )}
              </div>

              {/* Open Close Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={inputClass.label}>Open Time</label>
                  <div className="relative">
                    <input
                      {...register("openingHours")}
                      type="text"
                      placeholder="8.00 Am"
                      className={inputClass.input}
                    />
                    <Clock
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                  </div>
                  {errors.openingHours && (
                    <p className={inputClass.error}>
                      {errors.openingHours.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className={inputClass.label}>Close Time</label>
                  <div className="relative">
                    <input
                      {...register("closeTime")}
                      type="text"
                      placeholder="5.00 Pm"
                      className={inputClass.input}
                    />
                    <Clock
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                  </div>
                  {errors.closeTime && (
                    <p className={inputClass.error}>
                      {errors.closeTime.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-6">
              <CommonButton type="submit">
                {isLoading || updateLoading ? (
                  <ButtonWithLoading title="Saving..." />
                ) : isEditMode ? (
                  "Update Clinic"
                ) : (
                  "Add Clinic"
                )}
              </CommonButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPartnerClinicModal;

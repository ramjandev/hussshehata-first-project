import CloseButton from "@/common/button/CloseButton";
import CommonButton from "@/common/button/CommonButton";
import AddButton from "@/common/custom/AddButton";
import CommonHeader from "@/common/header/CommonHeader";
import { inputClass } from "@/components/programManagement/modal/showExerciseModal";
import {
  usePostExecutionNoteMutation,
  useUpdateExecutionNoteMutation,
} from "@/store/features/content/contentAPI";
import type { ExecutionNoteSingle } from "@/store/features/content/types/note";

import ButtonWithLoading from "@/common/button/ButtonWithLoading";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { RiDeleteBin5Line } from "react-icons/ri";
import {
  executionNoteSchema,
  type ExecutionNoteFormValues,
} from "./executionNoteSchema";

interface ExecutionNoteProps {
  onClose: () => void;
  selectedNote?: ExecutionNoteSingle | null;
}

const AddExecutionNoteModal: React.FC<ExecutionNoteProps> = ({
  onClose,
  selectedNote,
}) => {
  const [postNote, { isLoading: isPosting }] = usePostExecutionNoteMutation();
  const [updateNotes, { isLoading: isUpdating }] =
    useUpdateExecutionNoteMutation();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ExecutionNoteFormValues>({
    resolver: zodResolver(executionNoteSchema),
    defaultValues: {
      title: selectedNote?.title ?? "",
      notes: selectedNote?.notes?.length
        ? selectedNote.notes.map((n) => ({ value: n }))
        : [{ value: "" }],
      finalMessage: selectedNote?.finalMessage ?? "",
      position: selectedNote?.position ?? 0,
      isActive: selectedNote?.isActive ?? true,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "notes",
  });

  const onSubmit = async (data: ExecutionNoteFormValues) => {
    const formattedData = {
      ...data,
      notes: data.notes.map((n) => n.value),
    };

    if (selectedNote?.id) {
      await updateNotes({
        id: selectedNote.id,
        data: formattedData,
      });
    } else {
      await postNote(formattedData);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <CommonHeader size="xl">Add Execution Note</CommonHeader>
            <CloseButton action={onClose} />
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="border border-darkPurple rounded-2xl p-8 mb-6">
              <div className="space-y-6">
                <div>
                  <label className={inputClass.label}>Execution Title</label>
                  <input
                    type="text"
                    className={inputClass.input}
                    {...register("title")}
                    placeholder="Workout Duration Rule"
                  />
                  {errors.title && (
                    <p className={inputClass.error}>{errors.title.message}</p>
                  )}
                </div>

                <div>
                  <label className={inputClass.label}>Execution note</label>

                  {fields.map((field, index) => (
                    <div key={field.id} className="mb-3">
                      <textarea
                        {...register(`notes.${index}.value` as const)}
                        className={inputClass.input}
                        placeholder={`Aim to complete all sessions in under 60 minutes.`}
                        rows={2}
                      />

                      {errors.notes?.[index]?.value && (
                        <p className={inputClass.error}>
                          {errors.notes[index]?.value?.message}
                        </p>
                      )}

                      {fields.length > 1 && (
                        <button
                          type="button"
                          className="cursor-pointer text-blue mt-1"
                          onClick={() => remove(index)}
                        >
                          <RiDeleteBin5Line size={20} />
                        </button>
                      )}
                    </div>
                  ))}

                  <div className="flex justify-end">
                    <AddButton action={() => append({ value: "" })} />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <CommonHeader size="md" className="!font-bold !text-[#090818]">
                Final Message
              </CommonHeader>

              <textarea
                {...register("finalMessage")}
                className={inputClass.input}
                placeholder="The Monster Confusion Cycle rejects routine comfort. It forces continuous adaptation through rotating stimuli and strategic challenge, ensuring constant progress in neuromuscular performance, speed, strength, and muscle growth."
                rows={4}
              />

              {errors.finalMessage && (
                <p className={inputClass.error}>
                  {errors.finalMessage.message}
                </p>
              )}
            </div>

            <CommonButton
              type="submit"
              className="mt-8"
              disabled={isPosting || isUpdating}
            >
              {isPosting || isUpdating ? (
                <ButtonWithLoading
                  title={selectedNote ? "Updating..." : "Saving..."}
                />
              ) : selectedNote ? (
                "Update Execution Note"
              ) : (
                "Save Execution Note"
              )}
            </CommonButton>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddExecutionNoteModal;

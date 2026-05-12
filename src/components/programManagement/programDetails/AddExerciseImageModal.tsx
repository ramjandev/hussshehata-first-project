import ButtonWithLoading from "@/common/button/ButtonWithLoading";
import CommonButton from "@/common/button/CommonButton";
import FileUpload from "@/common/custom/FileUpload";
import ModalContainer from "@/common/custom/ModalContainer";
import {
  useAddImageMutation,
  useGetExerciseQuery,
} from "@/store/features/program/programAPI";
import { useState } from "react";

interface AddExerciseImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  exerciseId: string;
}

const AddExerciseImageModal: React.FC<AddExerciseImageModalProps> = ({
  isOpen,
  onClose,
  exerciseId,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [addImage, { isLoading }] = useAddImageMutation();
  const { data: exercise } = useGetExerciseQuery(exerciseId, {
    skip: !exerciseId,
  });

  const handleImageChange = (file: File | null) => {
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!imageFile || !exerciseId) return;

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      await addImage({
        id: exerciseId,
        data: formData,
      }).unwrap();

      onClose();
      setImageFile(null);
      setPreview(null);
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen) return null;
  const imageSrc = preview ?? exercise?.data.image ?? undefined;
  return (
    <ModalContainer title="Add Exercise Image" onClose={onClose} size="xl">
      <div className="space-y-4">
        <FileUpload
          fileType="image"
          label="Upload Image"
          onChange={handleImageChange}
        />

        {imageSrc && (
          <div className="overflow-hidden rounded-xl border">
            <img
              src={imageSrc}
              alt="Preview"
              className="h-64 w-full object-cover"
            />
          </div>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-5">
        <CommonButton variant="secondary" onClick={onClose}>
          Cancel
        </CommonButton>
        <CommonButton disabled={isLoading} onClick={handleSubmit}>
          {isLoading ? <ButtonWithLoading title="Uploading..." /> : "Upload"}
        </CommonButton>
      </div>
    </ModalContainer>
  );
};

export default AddExerciseImageModal;

import ButtonWithLoading from "@/common/button/ButtonWithLoading";
import CommonButton from "@/common/button/CommonButton";
import ModalContainer from "@/common/custom/ModalContainer";

import FileUpload from "@/common/custom/FileUpload";
import {
  useAddAnimationMutation,
  useGetExerciseQuery,
} from "@/store/features/program/programAPI";
import { useState } from "react";

interface AddExerciseAnimationModalProps {
  isOpen: boolean;
  onClose: () => void;
  exerciseId: string;
}

const AddExerciseAnimationModal = ({
  isOpen,
  onClose,
  exerciseId,
}: AddExerciseAnimationModalProps) => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { data: exercise } = useGetExerciseQuery(exerciseId, {
    skip: !exerciseId,
  });

  const [addAnimation, { isLoading }] = useAddAnimationMutation();

  const handleVideoChange = (file: File | null) => {
    if (file) {
      setVideoFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!videoFile) return;

    const formData = new FormData();
    formData.append("animation", videoFile);

    try {
      await addAnimation({
        id: exerciseId,
        data: formData,
      }).unwrap();

      onClose();
      setVideoFile(null);
      setPreview(null);
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen) return null;
  const animation = preview ?? exercise?.data.animation ?? undefined;
  return (
    <ModalContainer title="Upload Exercise Animation" onClose={onClose}>
      <FileUpload
        fileType="video"
        onChange={handleVideoChange}
        label="Upload Video"
      />

      {animation && (
        <div className="mt-4 overflow-hidden rounded-xl border">
          <video
            src={animation}
            controls
            className="h-64 w-full object-cover"
          />
        </div>
      )}

      <div className="flex justify-end gap-3 pt-5">
        <CommonButton variant="secondary" onClick={onClose}>
          Cancel
        </CommonButton>
        <CommonButton disabled={!videoFile || isLoading} onClick={handleSubmit}>
          {isLoading ? <ButtonWithLoading title="Uploading..." /> : "Upload"}
        </CommonButton>
      </div>
    </ModalContainer>
  );
};

export default AddExerciseAnimationModal;

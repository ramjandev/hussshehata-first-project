import { inputClass } from "@/components/programManagement/modal/showExerciseModal";
import React from "react";
import { FiImage } from "react-icons/fi";
import { IoVideocamOutline } from "react-icons/io5";

type FileType = "image" | "video";

interface FileUploadProps {
  fileType: FileType;
  label?: string;
  description?: string;
  onChange: (file: File | null) => void;
}

const configMap: Record<
  FileType,
  {
    accept: string;
    icon: React.ReactNode;
    title: string;
    desc: string;
  }
> = {
  image: {
    accept: "image/*",
    icon: <FiImage className="size-7" />,
    title: "Click to upload image",
    desc: "PNG, JPG, WEBP up to 10MB",
  },
  video: {
    accept: "video/*",
    icon: <IoVideocamOutline className="size-7" />,
    title: "Click to upload video",
    desc: "MP4, MOV, AVI up to 100MB",
  },
};

const FileUpload: React.FC<FileUploadProps> = ({
  fileType,
  label,
  description,
  onChange,
}) => {
  const config = configMap[fileType];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    onChange(file);

    e.target.value = "";
  };

  return (
    <div className="w-full">
      {label && <label className={inputClass.label}>{label}</label>}

      <label className="group flex w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-10 transition-all hover:border-blue hover:bg-blue/5">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-3 flex size-14 items-center justify-center rounded-full bg-white text-gray-500 shadow-sm transition-colors group-hover:text-blue">
            {config.icon}
          </div>

          <p className="text-sm font-medium text-gray-700">{config.title}</p>

          <p className="mt-1 text-xs text-gray-500">
            {description || config.desc}
          </p>
        </div>

        <input
          type="file"
          accept={config.accept}
          onChange={handleChange}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default FileUpload;

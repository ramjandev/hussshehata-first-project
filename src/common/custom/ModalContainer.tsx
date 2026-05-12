import React from "react";
import CloseButton from "../button/CloseButton";
import CommonHeader from "../header/CommonHeader";

interface Props {
  title?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  children: React.ReactNode;
  onClose: () => void;
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
};

const ModalContainer: React.FC<Props> = ({
  title,
  size = "lg",
  children,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        className={`w-full ${sizeClasses[size]} rounded-2xl bg-white p-5 shadow-xl`}
      >
        <div className="relative mb-4 flex items-center justify-between">
          {title ? (
            <CommonHeader size="lg" className="text-gray-900">
              {title}
            </CommonHeader>
          ) : (
            <div />
          )}

          <CloseButton action={onClose} />
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
};

export default ModalContainer;

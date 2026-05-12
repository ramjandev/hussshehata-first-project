import React, { type ReactNode } from "react";

interface CommonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  editClassName?: string;
  variant?: "edit" | "delete" | "add";
  isDelete?: boolean;
  title?: string;
}

const ActionButton: React.FC<CommonButtonProps> = ({
  children,
  className = "",
  variant = "edit",
  isDelete = false,
  editClassName = "",
  title,
  ...props
}) => {
  const baseClasses =
    "py-2 px-3 rounded-md font-medium transition text-base cursor-pointer flex items-center justify-center gap-1";
  const variantClasses = {
    edit: ` bg-blue text-white ${editClassName}`,
    add: "bg-blue text-white disabled:bg-gray-200 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed",
    delete:
      "bg-white border border-[#FFA2A2] text-[#E7000B] disabled:bg-gray-200 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed",
  };

  return (
    <button
      title={title}
      disabled={isDelete}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default ActionButton;

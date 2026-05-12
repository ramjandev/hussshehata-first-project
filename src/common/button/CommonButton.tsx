import React, { type ReactNode } from "react";

interface CommonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
}

const CommonButton: React.FC<CommonButtonProps> = ({
  children,
  className = "",
  variant = "primary",
  ...props
}) => {
  const baseClasses =
    "px-4  py-2 rounded-md font-medium transition text-lg cursor-pointer flex items-center justify-center gap-1  disabled:cursor-not-allowed";
  const variantClasses = {
    primary: "bg-blue text-white ",
    secondary: "bg-white border border-blue text-[#919EAB]",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default CommonButton;

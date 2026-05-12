import clsx from "clsx";
import React, { type ReactNode } from "react";

interface CommonHeaderProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
}

const CommonHeader: React.FC<CommonHeaderProps> = ({
  children,
  className = "",
  size = "md",
  ...props
}) => {
  // Only base style is optional
  const baseStyles = "text-[#101828]";

  // Fixed leading for each size
  const sizeStyles: Record<typeof size, string> = {
    xs: "text-xs leading-4",
    sm: "text-sm leading-5 !text-[#4A5565] font-normal",
    md: "text-base leading-6 !text-[#5B667B] font-normal",
    lg: "text-sm sm:text-lg leading-5 sm:leading-7 font-bold",
    xl: "text-xl leading-8 font-bold",
    "2xl": "text-2xl leading-9 font-bold",
    "3xl": "text-3xl leading-10 font-bold",
    "4xl": "text-4xl leading-[3rem] font-bold",
  };

  return (
    <h2 className={clsx(baseStyles, sizeStyles[size], className)} {...props}>
      {children}
    </h2>
  );
};

export default CommonHeader;

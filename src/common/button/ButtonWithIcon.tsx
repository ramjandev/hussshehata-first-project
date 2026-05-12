import type { ComponentPropsWithoutRef, ComponentType, ReactNode } from "react";

interface ButtonWithIconProps extends ComponentPropsWithoutRef<"button"> {
  children: ReactNode;
  icon?: ComponentType<{ className?: string }>;
}

const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({
  children,
  icon: Icon,
  className = "",
  ...props
}) => (
  <button
    {...props}
    className={`flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2.5 rounded-2xl font-medium text-sm sm:text-lg transition  cursor-pointer bg-blue text-white ${className}`}
  >
    {Icon && <Icon className="min-w-4 min-h-4" />}
    {children}
  </button>
);

export default ButtonWithIcon;

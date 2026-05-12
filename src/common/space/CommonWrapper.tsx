import { type ReactNode } from "react";

// Define the props interface
interface CommonWrapperProps {
  children: ReactNode; // Type for children (can be any valid React node)
  className?: string; // Optional className prop
}

// Define the component
const CommonWrapper: React.FC<CommonWrapperProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={` w-full max-w-[1400px] mx-auto my-auto px-4 md:px-10  ${className}`}
    >
      {children}
    </div>
  );
};

export default CommonWrapper;

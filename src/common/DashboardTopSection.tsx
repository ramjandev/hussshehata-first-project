import ButtonWithIcon from "@/common/button/ButtonWithIcon";
import CommonHeader from "@/common/header/CommonHeader";
import { FaPlus } from "react-icons/fa6";

interface ManagementHeaderProps {
  title: string;
  description?: string;
  className?: string;
  buttonText?: string;
  action?: () => void;
  descriptionClassName?: string;
}

const DashboardTopSection = ({
  title,
  description,
  className,
  buttonText,
  descriptionClassName,
  action,
}: ManagementHeaderProps) => {
  return (
    <div
      className={`flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6  ${className} mb-6 `}
    >
      <div className="space-y-1.5 ">
        {title && <CommonHeader size="2xl">{title}</CommonHeader>}
        {description && (
          <div className="w-full ">
            <CommonHeader className={`${descriptionClassName}`}>
              {description}
            </CommonHeader>
          </div>
        )}
      </div>
      <div className="flex gap-4.5 items-center">
        {buttonText && (
          <ButtonWithIcon
            icon={FaPlus}
            className="w-full lg:w-auto flex justify-center  shrink-0 "
          >
            <p onClick={action}>{buttonText}</p>
          </ButtonWithIcon>
        )}
      </div>
    </div>
  );
};
export default DashboardTopSection;

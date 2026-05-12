import CommonHeader from "../header/CommonHeader";

interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
}
const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  className,
}) => {
  return (
    <div className={`mb-6 ${className} `}>
      <CommonHeader size="lg" className="">
        {title}
      </CommonHeader>
      {description && (
        <CommonHeader size="sm" className="!text-gray-500">
          {description}
        </CommonHeader>
      )}
    </div>
  );
};

export default SectionHeader;

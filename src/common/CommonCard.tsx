import { type LucideIcon } from "lucide-react";
import React from "react";

interface CommonCardProps {
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  percentage?: string;
  value: string | number;
  title: string;
  subtitle?: string;
  subtitleColor?: string;
  showSplit?: boolean;
  splitPremium?: string | number;
  splitFree?: string | number;
}

const CommonCard: React.FC<CommonCardProps> = ({
  icon: Icon,
  iconBgColor,
  iconColor,
  percentage,
  value,
  title,
  subtitle,
  subtitleColor = "text-gray-600",
  showSplit = false,
  splitPremium,
  splitFree,
}) => {
  return (
    <div className="bg-white text-black rounded-2xl p-6 relative overflow-hidden">
      <div className="flex items-start justify-between mb-4">
        <div className={`${iconBgColor} p-3 rounded-xl`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        {percentage && (
          <span className="text-green-500 text-sm font-semibold">
            {percentage}
          </span>
        )}
      </div>
      <h3 className="text-3xl font-bold mb-1">{value}</h3>
      <p className="text-gray-600 text-sm mb-2">{title}</p>
      {showSplit ? (
        <p className="text-sm">
          <span className={`${subtitleColor} font-semibold`}>
            {splitPremium} Premium
          </span>
          <span className="text-gray-400"> {splitFree} Free</span>
        </p>
      ) : (
        subtitle && (
          <p className={`${subtitleColor} text-sm font-semibold`}>{subtitle}</p>
        )
      )}
    </div>
  );
};

export default CommonCard;

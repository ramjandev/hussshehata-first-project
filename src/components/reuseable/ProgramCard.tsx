import ActionButton from "@/common/button/ActionButton";
import CommonHeader from "@/common/header/CommonHeader";
import { Edit2, Trash2 } from "lucide-react";
import React from "react";

interface ProgramCardProps {
  id: string;
  title: string;
  category?: "Advanced" | "Beginner" | "Intermediate" | string;
  position: number;
  icon?: React.ReactNode;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  iconAction?: () => void;
  isLoading?: boolean;
}

const ProgramCard: React.FC<ProgramCardProps> = ({
  id,
  title,
  category,
  position,
  icon,
  iconAction,
  onEdit,
  onDelete,
  isLoading,
}) => {
  const getCategoryStyles = () => {
    switch (category) {
      case "Advanced":
        return "bg-red-100 text-red-700";
      case "Beginner":
        return "bg-green-100 text-green-700";
      case "Intermediate":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              {icon && (
                <div onClick={iconAction} className="shrink-0 cursor-pointer">
                  {icon}
                </div>
              )}
              <CommonHeader size="lg" className="line-clamp-1">
                {title}
              </CommonHeader>
              {category && (
                <span
                  className={`text-xs px-3 py-1 rounded-full hidden md:block ${getCategoryStyles()}`}
                >
                  {category}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <p className="text-sm text-gray-600">Position {position}</p>
              <span
                className={`text-xs px-3 py-1 rounded-full md:hidden ${getCategoryStyles()}`}
              >
                {category}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          {onEdit && (
            <ActionButton variant="edit" onClick={() => onEdit(id)}>
              <Edit2 size={16} />
              <span className="hidden sm:inline">Edit</span>
            </ActionButton>
          )}
          {onDelete && (
            <ActionButton
              isDelete={isLoading}
              variant="delete"
              onClick={() => onDelete(id)}
            >
              <Trash2 size={16} />
            </ActionButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgramCard;

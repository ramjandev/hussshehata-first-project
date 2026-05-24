import ActionButton from "@/common/button/ActionButton";
import CommonHeader from "@/common/header/CommonHeader";
import type { publishedStatus } from "@/store/features/program/types/newProgram";
import { Edit2, Trash2 } from "lucide-react";
import React from "react";
import { getLevelColor } from "../programManagement/AllProgram";

interface ProgramCardProps {
  id: string;
  title: string;
  description?: string;
  week?: number;
  status?: publishedStatus;
  icon?: React.ReactNode;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  iconAction?: () => void;
  isLoading?: boolean;
}

const ProgramCard: React.FC<ProgramCardProps> = ({
  id,
  title,
  status,
  week,
  icon,
  description,
  iconAction,
  onEdit,
  onDelete,
  isLoading,
}) => {
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

              {status && (
                <span
                  className={`text-xs px-3 py-1 rounded-full hidden md:block ${getLevelColor(status)}`}
                >
                  {status}
                </span>
              )}
            </div>
            <div className="   ">
              {description && (
                <CommonHeader size="sm" className="hidden md:block">
                  {description}
                </CommonHeader>
              )}
              {week && (
                <CommonHeader size="sm" className="mt-1">
                  {week} Weeks
                </CommonHeader>
              )}
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

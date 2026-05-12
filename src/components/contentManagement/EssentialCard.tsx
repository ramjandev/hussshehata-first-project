import ActionButton from "@/common/button/ActionButton";
import { Edit2, Trash2 } from "lucide-react";

export interface EssentialCardProps {
  name: string;
  list: string[];
  onEdit: () => void;
  onDelete: () => void;
  isLoading?: boolean;
}
const EssentialCard: React.FC<EssentialCardProps> = ({
  name,
  list,
  onEdit,
  onDelete,
  isLoading,
}) => {
  return (
    <div className="bg-white rounded-lg border border-[#8E96A4] p-4">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className="font-bold mb-2">{name}</h4>
          <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
            {list.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        {/* <span className="text-sm text-gray-500">{mark} markers</span> */}
      </div>
      <div className="flex gap-2 mt-4">
        <ActionButton onClick={onEdit} variant="edit">
          <Edit2 size={16} />
          Edit
        </ActionButton>
        <ActionButton isDelete={isLoading} onClick={onDelete} variant="delete">
          <Trash2 size={16} />
        </ActionButton>
      </div>
    </div>
  );
};

export default EssentialCard;

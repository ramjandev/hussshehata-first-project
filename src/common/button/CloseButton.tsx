import { X } from "lucide-react";

interface CloseButtonProps {
  action: () => void;
}
const CloseButton: React.FC<CloseButtonProps> = ({ action }) => {
  return (
    <div>
      <button onClick={action} className="text-gray-400 hover:text-gray-600">
        <X className="w-6 h-6 cursor-pointer" />
      </button>
    </div>
  );
};

export default CloseButton;

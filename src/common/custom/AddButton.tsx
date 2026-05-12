import { HiPlus } from "react-icons/hi";

interface Props {
  action: () => void;
}
const AddButton: React.FC<Props> = ({ action }) => {
  return (
    <div
      onClick={action}
      className="bg-blue text-white rounded-full text-xl cursor-pointer flex justify-center items-center w-6 h-6"
    >
      <HiPlus />
    </div>
  );
};

export default AddButton;

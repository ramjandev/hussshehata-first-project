import { Search } from "lucide-react";

interface CommonSearchProps {
  className?: string;
  placeholder?: string;
  setValue?: (e: React.ChangeEvent<HTMLInputElement>) => void; // renamed for clarity
  value?: string;
}

const CommonSearch: React.FC<CommonSearchProps> = ({
  className = "",
  placeholder = "search user",
  setValue = () => {},
  value = "",
}) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-7 h-7 text-[#919EAB]" />
        <input
          type="text"
          placeholder={placeholder || "Search"}
          value={value}
          onChange={setValue}
          className="w-full pl-12 p-3 bg-[#A78BFA]/12 rounded-lg text-sm outline-none"
        />
      </div>
    </div>
  );
};

export default CommonSearch;

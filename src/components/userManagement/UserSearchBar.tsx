import CommonSelect from "@/common/custom/CommonSelect";
import CommonSearch from "../CommonSearch";

interface SelectItem {
  label: string;
  value: string;
}

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchValue?: string;
  selectValue?: string;
  onSelectChange?: (value: string) => void;
  selectItems?: SelectItem[];
  selectClassName?: string;
  showSelect?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  className = "",
  placeholder,
  onSearchChange,
  searchValue,
  selectValue,
  onSelectChange,
  selectItems = [],
  selectClassName = "sm:w-50! w-full!",
  showSelect = true,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 bg-white rounded-lg p-4">
      <CommonSearch
        setValue={onSearchChange}
        value={searchValue}
        placeholder={placeholder}
        className={className}
      />

      {showSelect && selectItems.length > 0 && (
        <CommonSelect
          value={selectValue || ""}
          onValueChange={onSelectChange || (() => {})}
          className={selectClassName}
          item={selectItems}
        />
      )}
    </div>
  );
};

export default SearchBar;

type TabButtonProps<T extends string> = {
  label: string;
  value: T;
  activeValue: T;
  onChange: (value: T) => void; // ✅ Changed this
  className?: string;
};

const TabButton = <T extends string>({
  label,
  value,
  activeValue,
  onChange,
  className = "",
}: TabButtonProps<T>) => {
  const isActive = activeValue === value;

  return (
    <button
      type="button"
      onClick={() => onChange(value)}
      className={`px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
        isActive
          ? "bg-darkBlue text-white"
          : "bg-white text-darkBlue border border-[#E9D5FF]"
      } ${className}`}
    >
      {label}
    </button>
  );
};

export default TabButton;

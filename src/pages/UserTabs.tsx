import React, { useEffect, useRef, useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
interface UserTabsProps {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const UserTabs: React.FC<UserTabsProps> = ({
  tabs,
  activeTab,
  setActiveTab,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="lg:hidden relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
        >
          <span>{activeTab}</span>

          <RiArrowDownSLine
            className={`w-7 h-7 transition-transform text-gray-500 ${
              isDropdownOpen ? "transform rotate-180" : ""
            }`}
          />
        </button>

        {isDropdownOpen && (
          <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setIsDropdownOpen(false);
                }}
                className={`w-full text-left px-4 py-3 cursor-pointer text-sm font-medium hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                  activeTab === tab
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="hidden lg:flex border-b border-gray-200 space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-medium relative cursor-pointer ${
              activeTab === tab
                ? "text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
            )}
          </button>
        ))}
      </div>
    </>
  );
};

export default UserTabs;

// Header.tsx
import CommonHeader from "@/common/header/CommonHeader";
import { FaBars } from "react-icons/fa6";

interface HeaderProps {
  sheetOpen: boolean;
  setSheetOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ sheetOpen, setSheetOpen }) => {
  return (
    <header className="bg-white border-l-[1px] border-l-[rgba(9,8,24,0.12)] px-6 h-18 flex items-center justify-between fixed top-0 left-0 right-0 lg:left-68 z-10">
      {/* Mobile hamburger menu */}
      <button
        className="lg:hidden mr-4 p-2 bg-white rounded-md shadow-md"
        onClick={() => setSheetOpen(!sheetOpen)}
      >
        <FaBars className="w-5 h-5 text-black" />
      </button>

      <div className="flex-1 max-w-md">
        <CommonHeader size="xl">Fitness Admin Panel</CommonHeader>
      </div>
    </header>
  );
};

export default Header;

// Header.tsx
import CommonHeader from "@/common/header/CommonHeader";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { FaBars, FaRegBell } from "react-icons/fa6";

interface HeaderProps {
  sheetOpen: boolean;
  setSheetOpen: (open: boolean) => void;
}

const notifications = [
  {
    id: 1,
    title: "New Ride Request",
    message: "You have a new ride request from John Doe",
    time: "5 min ago",
    read: false,
  },
  {
    id: 2,
    title: "Ride Completed",
    message: "Ride with Sarah Smith has been completed",
    time: "15 min ago",
    read: false,
  },
  {
    id: 3,
    title: "Payment Received",
    message: "Payment of $45.50 has been received",
    time: "1 hour ago",
    read: true,
  },
  {
    id: 4,
    title: "System Update",
    message: "System maintenance scheduled for tonight",
    time: "3 hours ago",
    read: true,
  },
];

const Header: React.FC<HeaderProps> = ({ sheetOpen, setSheetOpen }) => {
  const [openNotifications, setOpenNotifications] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

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

      <div className="flex items-center gap-6 ml-auto">
        <DropdownMenu
          open={openNotifications}
          onOpenChange={setOpenNotifications}
        >
          <DropdownMenuTrigger asChild>
            <div className="cursor-pointer flex items-center justify-center p-4 rounded-full bg-[rgba(9,8,24,0.12)] transition-colors duration-300">
              <FaRegBell className="text-black text-xl" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="px-4 py-3 border-b border-border">
              <h3 className="font-semibold text-sm">Notifications</h3>
              {unreadCount > 0 && (
                <p className="text-xs text-gray-500">{unreadCount} new</p>
              )}
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                    !notif.read ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-1.5 ${
                        !notif.read ? "bg-teal-600" : "bg-transparent"
                      }`}
                    ></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {notif.title}
                      </p>
                      <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">
                        {notif.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-4 py-2 border-t border-border text-center">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-teal-600 hover:text-teal-700"
              >
                View All Notifications
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;

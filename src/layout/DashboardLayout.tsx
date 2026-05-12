// DashboardLayout.tsx
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="hidden lg:flex w-68 fixed left-0 top-0 bottom-0 z-20">
        <Sidebar />
      </aside>

      <main className="flex-1 lg:ml-68 flex flex-col">
        <Header sheetOpen={isSheetOpen} setSheetOpen={setIsSheetOpen} />
        <div className="bg-gray-100 flex-1 overflow-y-auto overflow-x-hidden p-6 pt-22 min-h-0 w-full max-w-full">
          <Outlet />
        </div>
      </main>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="left" className="w-64 pt-2">
          <Sidebar onItemClick={() => setIsSheetOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default DashboardLayout;

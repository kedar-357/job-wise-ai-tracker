
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-jobwise-light/30 dark:from-jobwise-dark dark:to-black dark:text-white flex">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Menu Button */}
        <div className="lg:hidden absolute top-4 left-4 z-50">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="bg-white/80 hover:bg-white dark:bg-jobwise-dark/50 dark:hover:bg-jobwise-dark/80"
          >
            <Menu className="h-5 w-5 text-jobwise-medium dark:text-white" />
          </Button>
        </div>
        
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {/* Add a CSS class to the Outlet that will be applied to all pages */}
          <div className="job-tiles-container">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;


import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Briefcase, 
  FileText, 
  Search, 
  BarChart, 
  User,
  ChevronLeft
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const location = useLocation();
  
  const navigationItems = [
    { path: "/home", label: "Home", icon: Home },
    { path: "/job-tracker", label: "Job Tracker", icon: Briefcase },
    { path: "/resume-feedback", label: "AI Resume Feedback", icon: FileText },
    { path: "/jd-analysis", label: "JD Analysis", icon: Search },
    { path: "/analytics", label: "Analytics", icon: BarChart },
  ];

  return (
    <div 
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col bg-gradient-to-b from-jobwise-dark to-jobwise-medium text-white transition-all duration-300 ease-in-out lg:relative",
        isOpen ? "w-64" : "w-20",
        !isOpen && "items-center"
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
        <Link to="/home" className="flex items-center">
          {isOpen ? (
            <h1 className="font-heading text-xl font-bold tracking-wider">
              JobWise AI
            </h1>
          ) : (
            <span className="font-heading text-xl font-bold">JW</span>
          )}
        </Link>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsOpen(!isOpen)}
          className="lg:flex hidden text-white hover:text-white hover:bg-white/10"
        >
          <ChevronLeft className={cn("h-5 w-5 transition-transform", !isOpen && "rotate-180")} />
        </Button>
      </div>

      <div className="flex-1 flex flex-col gap-1 px-2 py-4 overflow-y-auto">
        {navigationItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
              location.pathname === item.path
                ? "bg-white/20 text-white"
                : "text-white/70 hover:bg-white/10 hover:text-white",
              !isOpen && "justify-center px-2"
            )}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {isOpen && <span>{item.label}</span>}
          </Link>
        ))}
      </div>

      <div className="p-4 border-t border-white/10">
        <div 
          className={cn(
            "flex items-center gap-3",
            !isOpen && "justify-center"
          )}
        >
          <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
            <User className="h-4 w-4" />
          </div>
          {isOpen && (
            <div className="flex flex-col">
              <span className="text-sm font-medium">John Doe</span>
              <span className="text-xs text-white/70">john@example.com</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

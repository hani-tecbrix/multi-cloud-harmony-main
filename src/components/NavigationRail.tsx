import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Store, 
  FileText, 
  BarChart3, 
  HelpCircle, 
  Settings,
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import logo from "@/assets/mw_logo_h.svg";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Store, label: "Marketplace", path: "/marketplace" },
  { icon: Users, label: "Customers", path: "/customers" },
  { icon: FileText, label: "Invoices", path: "/invoices" },
  { icon: BarChart3, label: "Reports", path: "/reports" },
  { icon: HelpCircle, label: "Help", path: "/help" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

interface NavigationRailProps {
  onToggleExpand?: (expanded: boolean) => void;
}

export const NavigationRail = ({ onToggleExpand }: NavigationRailProps = {} as NavigationRailProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleToggle = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    onToggleExpand?.(newState);
  };

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-screen bg-[hsl(210,15%,18%)] border-r border-[hsl(210,15%,25%)] transition-all duration-300 z-50 flex flex-col",
        isExpanded ? "w-64" : "w-20"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-[hsl(210,15%,25%)] h-16">
        {isExpanded && (
          <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-2 duration-300">
            <img src={logo} alt="MindVerse" className="h-8" />
          </div>
        )}
        {!isExpanded && (
          <div className="flex items-center gap-2 mx-auto">
            <img src="/mw_favicon.svg" alt="MW" className="w-10 h-10" />
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggle}
          className={cn("h-8 w-8 text-white hover:bg-white/10", isExpanded ? "ml-auto" : "absolute bottom-4 left-1/2 -translate-x-1/2")}
        >
          {isExpanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>

      <nav className="flex-1 p-3 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                isExpanded 
                  ? "flex items-center gap-3 px-3 py-2.5 rounded transition-all duration-200" 
                  : "flex flex-col items-center justify-center gap-1 px-2 py-3 rounded transition-all duration-200",
                "hover:bg-white/10 text-white",
                isActive && "bg-accent text-white shadow-lg"
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={cn(
                  isExpanded ? "h-5 w-5 flex-shrink-0" : "h-5 w-5",
                  "text-white"
                )} />
                {isExpanded && (
                  <span className={cn(
                    "text-sm text-white",
                    isActive && "font-semibold"
                  )}>
                    {item.label}
                  </span>
                )}
                {!isExpanded && (
                  <span className={cn(
                    "text-xs text-center leading-tight text-white",
                    isActive && "font-semibold"
                  )}>
                    {item.label}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

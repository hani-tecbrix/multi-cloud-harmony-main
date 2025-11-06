import { RoleBasedNavigationRail } from "./RoleBasedNavigationRail";
import { Header } from "./Header";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const [isNavExpanded, setIsNavExpanded] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-100">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* Header - Full Width at Top */}
      <Header 
        onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        onToggleAside={() => setIsNavExpanded(!isNavExpanded)}
        isAsideExpanded={isNavExpanded}
      />
      
      {/* Main Layout: Aside + Main Content */}
      <div className="flex flex-1 w-full overflow-hidden">
        {/* Aside Navigation */}
        <RoleBasedNavigationRail 
          onToggleExpand={setIsNavExpanded} 
          isMobileOpen={isMobileMenuOpen}
          onMobileClose={() => setIsMobileMenuOpen(false)}
          isExpanded={isNavExpanded}
        />
        
        {/* Main Content Area */}
        <main 
          className={cn(
            "flex-1 transition-all duration-300 overflow-y-auto",
            isNavExpanded ? "lg:ml-64" : "lg:ml-20"
          )}
        >
          <div className="p-4 lg:p-6 mx-auto max-w-8xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

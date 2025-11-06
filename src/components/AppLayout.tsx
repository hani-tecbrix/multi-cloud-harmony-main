import { RoleBasedNavigationRail } from "./RoleBasedNavigationRail";
import { Header } from "./Header";
import { useState } from "react";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const [isNavExpanded, setIsNavExpanded] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <div className="min-h-screen w-full flex bg-muted">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      <RoleBasedNavigationRail 
        onToggleExpand={setIsNavExpanded} 
        isMobileOpen={isMobileMenuOpen}
        onMobileClose={() => setIsMobileMenuOpen(false)}
      />
      <div className={`flex-1 transition-all duration-300 w-full ${isNavExpanded ? 'lg:ml-64' : 'lg:ml-20'}`}>
        <Header onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
        <main className="p-4 lg:p-6 mx-auto max-w-7xl">
          {children}
        </main>
      </div>
    </div>
  );
};

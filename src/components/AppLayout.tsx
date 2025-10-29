import { RoleBasedNavigationRail } from "./RoleBasedNavigationRail";
import { Header } from "./Header";
import { useState } from "react";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const [isNavExpanded, setIsNavExpanded] = useState(true);
  
  return (
    <div className="min-h-screen w-full flex bg-muted">
      <RoleBasedNavigationRail onToggleExpand={setIsNavExpanded} />
      <div className={`flex-1 transition-all duration-300 ${isNavExpanded ? 'ml-64' : 'ml-20'}`}>
        <Header />
        <main className="p-4 mx-auto max-w-7xl">
          {children}
        </main>
      </div>
    </div>
  );
};

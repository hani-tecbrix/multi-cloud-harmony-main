import { Construction } from "lucide-react";
import { useLocation } from "react-router-dom";

const UnderConstruction = () => {
  const location = useLocation();
  
  // Extract page name from path
  const getPageName = () => {
    const path = location.pathname;
    const segments = path.split('/').filter(Boolean);
    
    if (segments.length > 1) {
      // Format: "admin/reports" -> "Reports"
      const pageName = segments[segments.length - 1];
      return pageName.charAt(0).toUpperCase() + pageName.slice(1);
    }
    
    return "Page";
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center justify-center text-center space-y-4 max-w-md px-4">
        <Construction className="h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-semibold text-foreground">
          {getPageName()} Under Construction
        </h1>
        <p className="text-sm text-muted-foreground">
          This page is currently being developed. Please check back soon.
        </p>
      </div>
    </div>
  );
};

export default UnderConstruction;


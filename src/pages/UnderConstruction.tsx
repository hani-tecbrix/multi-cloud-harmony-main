import { Card, CardContent } from "@/components/ui/card";
import { Construction, Hammer, Wrench, HardHat } from "lucide-react";
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
      <Card className="max-w-2xl w-full border-2 border-dashed">
        <CardContent className="p-12">
          <div className="flex flex-col items-center justify-center text-center space-y-6">
            {/* Animated Construction Icons */}
            <div className="relative w-32 h-32 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <Construction className="h-20 w-20 text-primary animate-pulse" />
              </div>
              <div className="absolute -top-2 -right-2 animate-bounce" style={{ animationDelay: '0s' }}>
                <Hammer className="h-8 w-8 text-yellow-500" />
              </div>
              <div className="absolute -bottom-2 -left-2 animate-bounce" style={{ animationDelay: '0.3s' }}>
                <Wrench className="h-8 w-8 text-orange-500" />
              </div>
              <div className="absolute top-1/2 -right-6 animate-bounce" style={{ animationDelay: '0.6s' }}>
                <HardHat className="h-6 w-6 text-blue-500" />
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-foreground">
                {getPageName()} Under Construction
              </h1>
              <p className="text-lg text-muted-foreground">
                We're working hard to bring you this feature
              </p>
            </div>

            {/* Description */}
            <div className="space-y-4 pt-4">
              <p className="text-muted-foreground max-w-md">
                This page is currently being developed. Our team is working diligently 
                to create an amazing experience for you. Please check back soon!
              </p>
              
              {/* Progress Indicator */}
              <div className="w-full max-w-sm mx-auto pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground">Progress</span>
                  <span className="text-sm font-medium text-muted-foreground">75%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: '75%' }}
                  />
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="flex items-center gap-2 pt-4">
              <div className="h-1 w-1 rounded-full bg-primary animate-ping" style={{ animationDelay: '0s' }} />
              <div className="h-1 w-1 rounded-full bg-primary animate-ping" style={{ animationDelay: '0.3s' }} />
              <div className="h-1 w-1 rounded-full bg-primary animate-ping" style={{ animationDelay: '0.6s' }} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UnderConstruction;


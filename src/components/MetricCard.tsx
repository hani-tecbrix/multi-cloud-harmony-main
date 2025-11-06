import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  borderColor?: string;
}

export const MetricCard = ({ title, value, change, changeType, icon: Icon, borderColor }: MetricCardProps) => {
  const topBorderColor = borderColor || 'hsl(var(--border))';
  
  // Convert hex color to rgba for background with opacity
  const getBackgroundColor = (color: string): string => {
    if (color.startsWith('#')) {
      // Convert hex to rgba with 10% opacity
      const hex = color.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, 0.1)`;
    }
    // For hsl colors, use a muted version
    return 'hsl(var(--muted))';
  };
  
  const iconBgColor = borderColor ? getBackgroundColor(borderColor) : 'hsl(var(--muted))';
  
  return (
    <Card 
      className="hover:shadow-sm transition-shadow relative overflow-hidden"
      style={{ borderTop: `1px solid ${topBorderColor}` }}
    >
      <CardContent className="p-4 relative">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground font-medium">{title}</p>
          <p className="text-2xl font-semibold">{value}</p>
          <p className={cn(
            "text-xs",
            changeType === "positive" && "text-success",
            changeType === "negative" && "text-destructive",
            changeType === "neutral" && "text-muted-foreground"
          )}>
            {change}
          </p>
        </div>
        
        {/* Icon positioned at bottom right */}
        <div className="absolute bottom-4 right-4">
          <div 
            className="p-1.5 rounded"
            style={{ backgroundColor: iconBgColor }}
          >
            <Icon className="h-4 w-4 text-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

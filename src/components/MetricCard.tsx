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
  return (
    <Card className="hover:shadow-sm transition-shadow relative overflow-hidden">
      {borderColor && (
        <div 
          className="absolute top-0 left-0 right-0 h-1"
          style={{ backgroundColor: borderColor }}
        />
      )}
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="p-1.5 rounded bg-muted">
            <Icon className="h-4 w-4 text-foreground" />
          </div>
        </div>
        
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
      </CardContent>
    </Card>
  );
};

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface SectionCardProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  children: ReactNode;
  badge?: ReactNode;
  action?: ReactNode;
  className?: string;
  borderColor?: string;
}

// Color mapping based on icon name
const getBorderColorByIcon = (Icon?: LucideIcon): string => {
  if (!Icon) return 'hsl(var(--border))';
  
  // Get icon name from multiple possible sources
  const iconName = Icon.displayName || Icon.name || (Icon.toString().match(/function\s+(\w+)/)?.[1]) || '';
  
  // Map icon names to colors
  const colorMap: { [key: string]: string } = {
    'Cloud': '#06b6d4', // Cyan for Cloud Providers
    'Database': '#8B5CF6', // Purple for SaaS/Database
    'Mail': '#3B82F6', // Blue for Contact/Mail
    'Users': '#8B5CF6', // Purple for Users/Customers
    'ShoppingBag': '#F59E0B', // Amber for Orders/Shopping
    'Receipt': '#10B981', // Green for Transactions/Receipts
    'BarChart3': '#3B82F6', // Blue for Charts/Visualization
    'FileText': '#3B82F6', // Blue for Tables/Documents
  };
  
  return colorMap[iconName] || 'hsl(var(--border))';
};

export const SectionCard = ({ 
  title, 
  description, 
  icon: Icon, 
  children, 
  badge,
  action,
  className,
  borderColor
}: SectionCardProps) => {
  const topBorderColor = borderColor || getBorderColorByIcon(Icon);
  
  return (
    <Card 
      className={className}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-4 relative">
        <div 
          className="absolute left-0 top-0 bottom-0 w-1 rounded-l"
          style={{ backgroundColor: topBorderColor }}
        />
        <div className="pl-4 flex-1">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            {Icon && <Icon className="h-5 w-5 text-primary" />}
            {title}
          </CardTitle>
          {description && (
            <p className="text-xs text-muted-foreground mt-1">
              {description}
            </p>
          )}
        </div>
        {badge && <div className="ml-4">{badge}</div>}
        {action && <div className="ml-4">{action}</div>}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};


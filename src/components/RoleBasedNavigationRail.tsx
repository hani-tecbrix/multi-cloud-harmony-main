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
  ChevronLeft,
  Shield,
  Cloud,
  UserPlus,
  Briefcase,
  Package,
  TrendingUp,
  Receipt,
  CreditCard,
  Eye,
  ShoppingBag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useUserRole } from "@/contexts/UserRoleContext";
import Help from "@/pages/Help";

interface NavItem {
  icon: any;
  label: string;
  path: string;
  roles: ('admin' | 'partner' | 'customer')[];
  badge?: string;
}

const navigationConfig: NavItem[] = [
  // Admin Navigation
  { 
    icon: LayoutDashboard, 
    label: "Dashboard", 
    path: "/dashboard", 
    roles: ['admin', 'partner', 'customer'] 
  },
  { 
    icon: Store, 
    label: "Marketplace", 
    path: "/marketplace", 
    roles: ['admin'] 
  },
  { 
    icon: Briefcase, 
    label: "Partners", 
    path: "/admin/partners", 
    roles: ['admin'] 
  },
  { 
    icon: Users, 
    label: "Users", 
    path: "/admin/users", 
    roles: ['admin'] 
  },
  { 
    icon: TrendingUp, 
    label: "Reports", 
    path: "/admin/reports", 
    roles: ['admin'] 
  },
  { 
    icon: ShoppingBag, 
    label: "Orders", 
    path: "/orders", 
    roles: ['admin'] 
  },
  { 
    icon: HelpCircle, 
    label: "Help & Support", 
    path: "/admin/help", 
    roles: ['admin'] 
  },
  { 
    icon: Settings, 
    label: "Settings", 
    path: "/admin/settings", 
    roles: ['admin'] 
  },
  
  // Partner Navigation
  { 
    icon: Store, 
    label: "Marketplace", 
    path: "/marketplace", 
    roles: ['partner'] 
  },
  { 
    icon: Users, 
    label: "Customers", 
    path: "/partner/customers", 
    roles: ['partner'] 
  },
  { 
    icon: Receipt, 
    label: "Transactions", 
    path: "/partner/transactions", 
    roles: ['partner'] 
  },
  { 
    icon: ShoppingBag, 
    label: "Orders", 
    path: "/orders", 
    roles: ['partner'] 
  },
  { 
    icon: BarChart3, 
    label: "Reports", 
    path: "/partner/reports", 
    roles: ['partner'] 
  },
  { 
    icon: HelpCircle, 
    label: "Help & Support", 
    path: "/partner/help", 
    roles: ['partner'] 
  },
  { 
    icon: Settings, 
    label: "Settings", 
    path: "/partner/settings", 
    roles: ['partner'] 
  },
  
  // Customer Navigation
  { 
    icon: Package, 
    label: "Packages", 
    path: "/customer/packages", 
    roles: ['customer'] 
  },
  { 
    icon: TrendingUp, 
    label: "Usage Details", 
    path: "/customer/usage", 
    roles: ['customer'] 
  },
  { 
    icon: FileText, 
    label: "Billing History", 
    path: "/customer/billing", 
    roles: ['customer'] 
  },
  { 
    icon: HelpCircle, 
    label: "Help & Support", 
    path: "/customer/help", 
    roles: ['customer'] 
  },
  { 
    icon: Settings, 
    label: "Settings", 
    path: "/customer/settings", 
    roles: ['customer'] 
  },
];

interface RoleBasedNavigationRailProps {
  onToggleExpand?: (expanded: boolean) => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export const RoleBasedNavigationRail = ({ 
  onToggleExpand, 
  isMobileOpen = false,
  onMobileClose 
}: RoleBasedNavigationRailProps = {} as RoleBasedNavigationRailProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { user, isAdmin, isPartner, isCustomer } = useUserRole();
  
  const handleToggle = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    onToggleExpand?.(newState);
  };

  // Filter navigation items based on user role
  const filteredNavItems = navigationConfig.filter(item => 
    user && item.roles.includes(user.role)
  );

  // Get role-specific styling
  const getRoleColor = () => {
    if (isAdmin) return 'from-purple-500 to-purple-700';
    if (isPartner) return 'from-blue-500 to-blue-700';
    if (isCustomer) return 'from-green-500 to-green-700';
    return 'from-gray-500 to-gray-700';
  };

  const getRoleBadgeColor = () => {
    if (isAdmin) return 'bg-purple-500/10 text-purple-700 border-purple-500/30';
    if (isPartner) return 'bg-blue-500/10 text-blue-700 border-blue-500/30';
    if (isCustomer) return 'bg-green-500/10 text-green-700 border-green-500/30';
    return 'bg-gray-500/10 text-gray-700 border-gray-500/30';
  };

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-screen bg-white border-r border-border transition-all duration-300 z-30 flex flex-col shadow-sm",
        // Mobile: hidden by default, show when isMobileOpen is true, always full width on mobile
        "lg:translate-x-0",
        isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        // Desktop: expanded/collapsed states, Mobile: always full width
        isExpanded ? "w-64" : "w-64 lg:w-20"
      )}
    >
      {/* Header with Toggle Button */}
      <div className="flex flex-col h-auto">
        <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-border lg:border-b-0">
          {/* Mobile: Show logo when expanded */}
          {isExpanded && (
            <div className="flex items-center gap-2 lg:hidden">
              <img src="/mw_favicon.svg" alt="MW" className="w-8 h-8" />
            </div>
          )}
          
          {/* Desktop: Show toggle button */}
          <div className="flex items-center gap-2 ml-auto w-full lg:w-auto lg:justify-end">
            {/* Mobile Close Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onMobileClose}
              className={cn("h-8 w-8 hover:bg-muted lg:hidden")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {/* Desktop Toggle Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggle}
              className={cn("h-8 w-8 hover:bg-muted hidden lg:flex")}
            >
              {isExpanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        
        {/* Role Badge */}
        {isExpanded && user && (
          <div className="px-4 pb-3 hidden">
            <Badge 
              variant="outline" 
              className={cn("w-full justify-center text-xs font-semibold uppercase tracking-wide", getRoleBadgeColor())}
            >
              {user.role === 'admin' && <Shield className="h-3 w-3 mr-1" />}
              {user.role === 'partner' && <Briefcase className="h-3 w-3 mr-1" />}
              {user.role === 'customer' && <Eye className="h-3 w-3 mr-1" />}
              {user.role} Portal
            </Badge>
          </div>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-3 pt-4 space-y-1 overflow-y-auto">
        {filteredNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => {
              // Close mobile menu when navigation item is clicked
              if (onMobileClose) {
                onMobileClose();
              }
            }}
            className={({ isActive }) =>
              cn(
                "relative",
                isExpanded 
                  ? "flex items-center gap-6 px-3 py-2.5 rounded-lg transition-all duration-200" 
                  : "flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg transition-all duration-200 lg:flex-col",
                "hover:bg-muted/50 text-foreground",
                isActive && "bg-primary/10"
              )
            }
          >
            {({ isActive }) => (
              <>
                {/* Accent Bar for Active State */}
                {isActive && (
                  <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-l-full" />
                )}
                
                <item.icon className={cn(
                  isExpanded ? "h-5 w-5 flex-shrink-0" : "h-5 w-5",
                  "text-muted-foreground transition-all",
                  isActive && "text-primary"
                )} />
                {isExpanded && (
                  <span className={cn(
                    "text-sm text-foreground flex-1 transition-all",
                    isActive && "font-semibold text-primary"
                  )}>
                    {item.label}
                  </span>
                )}
                {!isExpanded && (
                  <span className={cn(
                    "text-[10px] text-center leading-tight text-muted-foreground transition-all hidden lg:block",
                    isActive && "font-semibold text-primary"
                  )}>
                    {item.label.split(' ')[0]}
                  </span>
                )}
                {isExpanded && item.badge && (
                  <Badge variant="secondary" className="ml-auto text-xs">
                    {item.badge}
                  </Badge>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Info Footer */}
      {isExpanded && user && (
        <div className="p-4 border-t border-border hidden lg:block">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold",
              `bg-gradient-to-br ${getRoleColor()}`
            )}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};


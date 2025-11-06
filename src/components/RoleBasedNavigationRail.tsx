import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Store, 
  FileText, 
  BarChart3, 
  HelpCircle, 
  Settings,
  ChevronLeft,
  Shield,
  Briefcase,
  Package,
  TrendingUp,
  Receipt,
  Eye,
  ShoppingBag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useUserRole } from "@/contexts/UserRoleContext";

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
    roles: ['admin', 'partner'] 
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
  isExpanded?: boolean;
}

export const RoleBasedNavigationRail = ({ 
  onToggleExpand, 
  isMobileOpen = false,
  onMobileClose,
  isExpanded = true
}: RoleBasedNavigationRailProps = {} as RoleBasedNavigationRailProps) => {
  const { user, isAdmin, isPartner, isCustomer } = useUserRole();

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
        "fixed left-0 top-14 h-[calc(100vh-3.5rem)] bg-white transition-all duration-300 z-30 flex flex-col shadow-lg",
        // Mobile: hidden by default, show when isMobileOpen is true, always full width on mobile
        "lg:translate-x-0",
        isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        // Desktop: expanded/collapsed states, Mobile: always full width
        isExpanded ? "w-64" : "w-64 lg:w-20"
      )}
    >
      {/* Mobile Header with Close Button */}
      <div className="flex items-center justify-between px-4 py-3 bg-background border-b border-border lg:hidden">
        {isExpanded && (
          <div className="flex items-center gap-2">
            <img src="/mw_favicon.svg" alt="MW" className="w-8 h-8" />
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onMobileClose}
          className="h-8 w-8 hover:bg-muted ml-auto"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
      

      {/* Enhanced Navigation Items */}
      <nav className="flex-1 p-3 pt-4 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
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
                "relative group",
                isExpanded 
                  ? "flex items-center gap-4 px-3 py-2.5 rounded-xl transition-all duration-200" 
                  : "flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-xl transition-all duration-200 lg:flex-col",
                "hover:bg-muted/60 text-foreground hover:shadow-sm",
                isActive && "bg-primary/10 shadow-md border border-primary/20"
              )
            }
          >
            {({ isActive }) => (
              <>
                {/* Enhanced Accent Bar for Active State */}
                {isActive && (
                  <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-1 h-10 bg-gradient-to-b from-primary to-primary/60 rounded-l-full shadow-lg" />
                )}
                
                {/* Icon Container with Enhanced Styling */}
                <div className={cn(
                  "relative flex items-center justify-center transition-all duration-200",
                  isExpanded ? "flex-shrink-0" : "w-full",
                  isActive && "scale-110"
                )}>
                  <item.icon className={cn(
                    isExpanded ? "h-5 w-5" : "h-5 w-5",
                    "transition-all duration-200",
                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                  )} />
                </div>
                
                {isExpanded && (
                  <span className={cn(
                    "text-sm flex-1 transition-all duration-200",
                    isActive ? "font-semibold text-primary" : "text-foreground group-hover:text-foreground"
                  )}>
                    {item.label}
                  </span>
                )}
                {!isExpanded && (
                  <span className={cn(
                    "text-[10px] text-center leading-tight transition-all duration-200 hidden lg:block",
                    isActive ? "font-semibold text-primary" : "text-muted-foreground"
                  )}>
                    {item.label.split(' ')[0]}
                  </span>
                )}
                {isExpanded && item.badge && (
                  <Badge variant="secondary" className="ml-auto text-xs animate-in fade-in slide-in-from-right-2">
                    {item.badge}
                  </Badge>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Enhanced User Info Footer */}
      {isExpanded && user && (
        <div className="p-4 border-t border-border bg-background/50 backdrop-blur-sm hidden lg:block">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors duration-200">
            <div className={cn(
              "w-11 h-11 rounded-full flex items-center justify-center text-white font-semibold shadow-lg ring-2 ring-background transition-all duration-200",
              `bg-gradient-to-br ${getRoleColor()}`
            )}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate mt-0.5">{user.email}</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};


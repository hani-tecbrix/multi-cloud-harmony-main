import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Shield, Briefcase, Eye, ChevronDown } from "lucide-react";
import { useUserRole, UserRole } from "@/contexts/UserRoleContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const RoleSwitcher = () => {
  const { user, setUser } = useUserRole();
  const navigate = useNavigate();

  const switchRole = (role: UserRole) => {
    const roleConfig = {
      admin: {
        id: '1',
        name: 'Admin User',
        email: 'admin@mindware.com',
        role: 'admin' as UserRole,
        permissions: ['all']
      },
      partner: {
        id: '2',
        name: 'Partner User',
        email: 'partner@company.com',
        role: 'partner' as UserRole,
        companyName: 'Partner Company',
        permissions: ['manage_customers', 'assign_services', 'view_reports']
      },
      customer: {
        id: '3',
        name: 'Customer User',
        email: 'customer@email.com',
        role: 'customer' as UserRole,
        permissions: ['view_subscriptions', 'view_usage', 'view_billing']
      }
    };

    setUser(roleConfig[role]);
    toast.success(`Switched to ${role.charAt(0).toUpperCase() + role.slice(1)} role`);
    navigate('/dashboard');
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'admin': return <Shield className="h-4 w-4 mr-2" />;
      case 'partner': return <Briefcase className="h-4 w-4 mr-2" />;
      case 'customer': return <Eye className="h-4 w-4 mr-2" />;
    }
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'admin': return 'text-gray-500';
      case 'partner': return 'text-gray-500';
      case 'customer': return 'text-gray-500';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          {user && getRoleIcon(user.role)}
          <span className={getRoleColor(user?.role || 'admin')}>
            {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
          </span>
          <ChevronDown className="h-3 w-3 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Switch Role</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={() => switchRole('admin')}
          className={user?.role === 'admin' ? 'bg-gray/10' : ''}
        >
          <Shield className="h-4 w-4 mr-2" />
          <span>Admin</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => switchRole('partner')}
          className={user?.role === 'partner' ? 'bg-gray/10' : ''}
        >
          <Briefcase className="h-4 w-4 mr-2" />
          <span>Partner</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => switchRole('customer')}
          className={user?.role === 'customer' ? 'bg-gray/10' : ''}
        >
          <Eye className="h-4 w-4 mr-2" />
          <span>Customer</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};


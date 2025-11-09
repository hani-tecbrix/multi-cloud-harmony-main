import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'admin' | 'partner' | 'customer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  companyName?: string;
  permissions?: string[];
}

interface UserRoleContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAdmin: boolean;
  isPartner: boolean;
  isCustomer: boolean;
  hasPermission: (permission: string) => boolean;
}

const UserRoleContext = createContext<UserRoleContextType | undefined>(undefined);

export const UserRoleProvider = ({ children }: { children: ReactNode }) => {
  // Default to admin for development - in production, this would come from authentication
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'Admin User',
    email: 'user@mindverse.com',
    role: 'admin',
    permissions: ['all']
  });

  const isAdmin = user?.role === 'admin';
  const isPartner = user?.role === 'partner';
  const isCustomer = user?.role === 'customer';

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    if (user.permissions?.includes('all')) return true;
    return user.permissions?.includes(permission) || false;
  };

  return (
    <UserRoleContext.Provider
      value={{
        user,
        setUser,
        isAdmin,
        isPartner,
        isCustomer,
        hasPermission
      }}
    >
      {children}
    </UserRoleContext.Provider>
  );
};

export const useUserRole = () => {
  const context = useContext(UserRoleContext);
  if (context === undefined) {
    // Return safe defaults for public access (when used outside UserRoleProvider)
    return {
      user: null,
      setUser: () => {},
      isAdmin: false,
      isPartner: false,
      isCustomer: false,
      hasPermission: () => false,
    };
  }
  return context;
};


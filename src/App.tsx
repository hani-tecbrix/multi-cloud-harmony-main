import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import PartnerCustomers from "./pages/PartnerCustomers";
import PartnerTransactions from "./pages/PartnerTransactions";
import AdminPartners from "./pages/AdminPartners";
import Marketplace from "./pages/Marketplace";
import Checkout from "./pages/Checkout";
import OrderHistory from "./pages/OrderHistory";
import Invoices from "./pages/Invoices";
import Reports from "./pages/Reports";
import Help from "./pages/Help";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import UnderConstruction from "./pages/UnderConstruction";
import Users from "./pages/Users";
import { AppLayout } from "./components/AppLayout";
import { PublicLayout } from "./components/PublicLayout";
import { CartProvider } from "./contexts/CartContext";
import { UserRoleProvider } from "./contexts/UserRoleContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <UserRoleProvider>
        <CartProvider>
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            {/* Public Help Route - Accessible without authentication */}
            <Route path="/help" element={<PublicLayout><Help /></PublicLayout>} />
            <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
            <Route path="/customers" element={<AppLayout><Customers /></AppLayout>} />
            <Route path="/partner/customers" element={<AppLayout><PartnerCustomers /></AppLayout>} />
            <Route path="/partner/transactions" element={<AppLayout><PartnerTransactions /></AppLayout>} />
            <Route path="/admin/partners" element={<AppLayout><AdminPartners /></AppLayout>} />
            <Route path="/marketplace" element={<AppLayout><Marketplace /></AppLayout>} />
            <Route path="/checkout" element={<AppLayout><Checkout /></AppLayout>} />
            <Route path="/orders" element={<AppLayout><OrderHistory /></AppLayout>} />
            <Route path="/invoices" element={<AppLayout><Invoices /></AppLayout>} />
            <Route path="/reports" element={<AppLayout><Reports /></AppLayout>} />
            <Route path="/settings" element={<AppLayout><Settings /></AppLayout>} />
            
            {/* Admin Role-Specific Routes */}
            <Route path="/admin/users" element={<AppLayout><Users /></AppLayout>} />
            <Route path="/admin/reports" element={<AppLayout><Reports /></AppLayout>} />
            <Route path="/admin/help" element={<AppLayout><Help /></AppLayout>} />
            <Route path="/admin/settings" element={<AppLayout><Settings /></AppLayout>} />
            
            {/* Partner Role-Specific Routes */}
            <Route path="/partner/reports" element={<AppLayout><Reports /></AppLayout>} />
            <Route path="/partner/help" element={<AppLayout><Help /></AppLayout>} />
            <Route path="/partner/settings" element={<AppLayout><Settings /></AppLayout>} />
            
            {/* Customer Role-Specific Routes */}
            <Route path="/customer/packkages" element={<AppLayout><UnderConstruction /></AppLayout>} />
            <Route path="/customer/packages" element={<AppLayout><UnderConstruction /></AppLayout>} />
            <Route path="/customer/usage" element={<AppLayout><UnderConstruction /></AppLayout>} />
            <Route path="/customer/billing" element={<AppLayout><UnderConstruction /></AppLayout>} />
            <Route path="/customer/help" element={<AppLayout><Help /></AppLayout>} />
            <Route path="/customer/settings" element={<AppLayout><Settings /></AppLayout>} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
          </BrowserRouter>
        </CartProvider>
      </UserRoleProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

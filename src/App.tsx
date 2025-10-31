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
import { AppLayout } from "./components/AppLayout";
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
            <Route path="/help" element={<AppLayout><Help /></AppLayout>} />
            <Route path="/settings" element={<AppLayout><Settings /></AppLayout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </BrowserRouter>
        </CartProvider>
      </UserRoleProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

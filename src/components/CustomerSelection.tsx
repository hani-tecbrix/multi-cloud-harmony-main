import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Users,
  CheckCircle,
  XCircle,
  Plus
} from "lucide-react";
import CustomerDataGrid from "./CustomerDataGrid";

// Mock customer data for autocomplete
const mockCustomers = [
  {
    id: "1",
    name: "TechCorp Inc",
    email: "billing@techcorp.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, San Francisco, CA 94105",
    status: "active",
    subscriptionCount: 12,
    totalSpent: 45000,
    lastOrder: "2024-01-15"
  },
  {
    id: "2",
    name: "StartupXYZ",
    email: "admin@startupxyz.com",
    phone: "+1 (555) 987-6543",
    address: "456 Innovation Drive, Austin, TX 78701",
    status: "active",
    subscriptionCount: 8,
    totalSpent: 28000,
    lastOrder: "2024-01-10"
  },
  {
    id: "3",
    name: "Global Enterprises",
    email: "procurement@globalent.com",
    phone: "+1 (555) 456-7890",
    address: "789 Corporate Plaza, New York, NY 10001",
    status: "inactive",
    subscriptionCount: 25,
    totalSpent: 125000,
    lastOrder: "2023-12-20"
  },
  {
    id: "4",
    name: "Digital Solutions Ltd",
    email: "finance@digitalsolutions.com",
    phone: "+1 (555) 321-0987",
    address: "321 Tech Boulevard, Seattle, WA 98101",
    status: "active",
    subscriptionCount: 15,
    totalSpent: 67000,
    lastOrder: "2024-01-12"
  },
  {
    id: "5",
    name: "Innovation Hub",
    email: "billing@innovationhub.com",
    phone: "+1 (555) 654-3210",
    address: "654 Future Street, Boston, MA 02101",
    status: "active",
    subscriptionCount: 6,
    totalSpent: 19000,
    lastOrder: "2024-01-08"
  }
];

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: "active" | "inactive";
  subscriptionCount: number;
  totalSpent: number;
  lastOrder: string;
}

interface CustomerSelectionProps {
  onCustomerSelect: (customer: Customer) => void;
  selectedCustomer?: Customer | null;
  onContinue: () => void;
}

const CustomerSelection = ({ onCustomerSelect, selectedCustomer, onContinue }: CustomerSelectionProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showDataGrid, setShowDataGrid] = useState(false);

  const filteredCustomers = mockCustomers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCustomerSelect = (customer: Customer) => {
    onCustomerSelect(customer);
    setSearchTerm(customer.name);
    setShowSuggestions(false);
    setShowDataGrid(false);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setShowSuggestions(value.length > 0);
  };

  const getStatusBadge = (status: string) => {
    return status === "active" ? 
      <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge> : 
      <Badge variant="destructive">Inactive</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Customer Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Customer Selection
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customerSearch">Search Customer</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="customerSearch"
                placeholder="Type customer name or email..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10"
                onFocus={() => setShowSuggestions(searchTerm.length > 0)}
              />
            </div>
          </div>

          {/* Autocomplete Suggestions */}
          {showSuggestions && filteredCustomers.length > 0 && (
            <div className="border rounded-lg bg-background shadow-lg max-h-60 overflow-y-auto">
              {filteredCustomers.map((customer) => (
                <div
                  key={customer.id}
                  className="p-3 hover:bg-muted/50 cursor-pointer border-b last:border-b-0"
                  onClick={() => handleCustomerSelect(customer as Customer)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Building2 className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{customer.name}</p>
                        {getStatusBadge(customer.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">{customer.email}</p>
                      <p className="text-xs text-muted-foreground">{customer.address}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Selected Customer Display */}
          {selectedCustomer && (
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{selectedCustomer.name}</h3>
                    {getStatusBadge(selectedCustomer.status)}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      <span>{selectedCustomer.email}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      <span>{selectedCustomer.phone}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{selectedCustomer.address}</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    onCustomerSelect(null as any);
                    setSearchTerm("");
                  }}
                >
                  Change
                </Button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowDataGrid(!showDataGrid)}
              className="flex-1"
            >
              <Users className="h-4 w-4 mr-2" />
              {showDataGrid ? "Hide" : "Browse"} All Customers
            </Button>
            <Button
              variant="outline"
              className="flex-1"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Customer
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Customer Data Grid */}
      {showDataGrid && (
        <CustomerDataGrid
          onCustomerSelect={handleCustomerSelect}
          selectedCustomer={selectedCustomer}
        />
      )}

     
    </div>
  );
};

export default CustomerSelection;

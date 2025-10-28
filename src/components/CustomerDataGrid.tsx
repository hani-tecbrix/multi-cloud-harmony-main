import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search, 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Users,
  CheckCircle,
  XCircle
} from "lucide-react";

// Mock customer data
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

interface CustomerDataGridProps {
  onCustomerSelect: (customer: Customer) => void;
  selectedCustomer?: Customer | null;
}

const CustomerDataGrid = ({ onCustomerSelect, selectedCustomer }: CustomerDataGridProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");

  const filteredCustomers = mockCustomers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    return status === "active" ? 
      <CheckCircle className="h-4 w-4 text-green-600" /> : 
      <XCircle className="h-4 w-4 text-red-600" />;
  };

  const getStatusBadge = (status: string) => {
    return status === "active" ? 
      <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge> : 
      <Badge variant="destructive">Inactive</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Select Customer
        </CardTitle>
        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant={statusFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("all")}
            >
              All
            </Button>
            <Button
              variant={statusFilter === "active" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("active")}
            >
              Active
            </Button>
            <Button
              variant={statusFilter === "inactive" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("inactive")}
            >
              Inactive
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filteredCustomers.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No customers found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Subscriptions</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Last Order</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow 
                  key={customer.id} 
                  className={`cursor-pointer hover:bg-muted/50 ${
                    selectedCustomer?.id === customer.id ? 'bg-primary/5' : ''
                  }`}
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedCustomer?.id === customer.id}
                      onCheckedChange={() => onCustomerSelect(customer)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Building2 className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-muted-foreground">{customer.address}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span>{customer.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span>{customer.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(customer.status)}
                      {getStatusBadge(customer.status)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{customer.subscriptionCount}</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">${customer.totalSpent.toLocaleString()}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {new Date(customer.lastOrder).toLocaleDateString()}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onCustomerSelect(customer)}
                      disabled={selectedCustomer?.id === customer.id}
                    >
                      {selectedCustomer?.id === customer.id ? "Selected" : "Select"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomerDataGrid;

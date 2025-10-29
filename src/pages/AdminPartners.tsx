import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Building2, ArrowLeft, Users, ShoppingBag, DollarSign, TrendingUp, Calendar, CheckCircle, Clock, Mail, Phone, MapPin, Eye, Filter, Download, Shield } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for partners (Admin view - business relationship data only)
const partnersData = [
  {
    id: "PTR-001",
    companyName: "Global Cloud Solutions Inc.",
    contactName: "Sarah Johnson", // Primary business contact only
    email: "partnerships@globalcloud.com", // Business email only
    phone: "+1 (555) 123-4567",
    address: "123 Tech Park, San Francisco, CA 94105",
    status: "active",
    tier: "platinum",
    joinedDate: "2023-01-15",
    customersCount: 24,
    totalRevenue: 145000,
    monthlyRevenue: 12000,
    commission: 15, // percentage
    customers: [
      { id: "CUST-001", name: "Acme Corp", status: "active", mrr: 2500, cloudProvider: "AWS" },
      { id: "CUST-002", name: "TechStart Ltd", status: "active", mrr: 1800, cloudProvider: "Azure" },
      { id: "CUST-003", name: "Innovation Hub", status: "active", mrr: 3200, cloudProvider: "GCP" },
      { id: "CUST-004", name: "Digital Dynamics", status: "active", mrr: 1500, cloudProvider: "AWS" },
      { id: "CUST-005", name: "CloudFirst Inc", status: "trial", mrr: 0, cloudProvider: "Azure" },
    ],
    recentOrders: [
      { id: "ORD-1234", customer: "Acme Corp", date: "2024-10-25", amount: 2500, status: "completed", items: 3 },
      { id: "ORD-1235", customer: "TechStart Ltd", date: "2024-10-24", amount: 1800, status: "completed", items: 2 },
      { id: "ORD-1236", customer: "Innovation Hub", date: "2024-10-23", amount: 3200, status: "processing", items: 5 },
    ]
  },
  {
    id: "PTR-002",
    companyName: "Enterprise Partners LLC",
    contactName: "Michael Chen",
    email: "contact@enterprisepartners.com",
    phone: "+1 (555) 234-5678",
    address: "456 Business Ave, New York, NY 10001",
    status: "active",
    tier: "gold",
    joinedDate: "2023-03-20",
    customersCount: 18,
    totalRevenue: 98000,
    monthlyRevenue: 8500,
    commission: 12,
    customers: [
      { id: "CUST-006", name: "Metro Systems", status: "active", mrr: 1900, cloudProvider: "AWS" },
      { id: "CUST-007", name: "DataFlow Corp", status: "active", mrr: 2800, cloudProvider: "GCP" },
      { id: "CUST-008", name: "Smart Solutions", status: "active", mrr: 1600, cloudProvider: "Azure" },
      { id: "CUST-009", name: "Cloud Ventures", status: "suspended", mrr: 0, cloudProvider: "AWS" },
    ],
    recentOrders: [
      { id: "ORD-1237", customer: "Metro Systems", date: "2024-10-26", amount: 1900, status: "completed", items: 2 },
      { id: "ORD-1238", customer: "DataFlow Corp", date: "2024-10-25", amount: 2800, status: "completed", items: 4 },
    ]
  },
  {
    id: "PTR-003",
    companyName: "Tech Enablers Group",
    contactName: "Emily Rodriguez",
    email: "partners@techenablers.com",
    phone: "+1 (555) 345-6789",
    address: "789 Innovation Dr, Austin, TX 78701",
    status: "active",
    tier: "silver",
    joinedDate: "2023-06-10",
    customersCount: 12,
    totalRevenue: 67000,
    monthlyRevenue: 5600,
    commission: 10,
    customers: [
      { id: "CUST-010", name: "NextGen Tech", status: "active", mrr: 2100, cloudProvider: "Azure" },
      { id: "CUST-011", name: "Scale Systems", status: "active", mrr: 1400, cloudProvider: "GCP" },
      { id: "CUST-012", name: "Digital Wave", status: "trial", mrr: 0, cloudProvider: "AWS" },
    ],
    recentOrders: [
      { id: "ORD-1239", customer: "NextGen Tech", date: "2024-10-27", amount: 2100, status: "completed", items: 3 },
      { id: "ORD-1240", customer: "Scale Systems", date: "2024-10-26", amount: 1400, status: "processing", items: 2 },
    ]
  },
  {
    id: "PTR-004",
    companyName: "Cloud Integration Partners",
    contactName: "David Kim",
    email: "business@cloudintegration.com",
    phone: "+1 (555) 456-7890",
    address: "321 Cloud Blvd, Seattle, WA 98101",
    status: "active",
    tier: "platinum",
    joinedDate: "2023-02-08",
    customersCount: 31,
    totalRevenue: 187000,
    monthlyRevenue: 15500,
    commission: 15,
    customers: [
      { id: "CUST-013", name: "Enterprise Plus", status: "active", mrr: 4200, cloudProvider: "AWS" },
      { id: "CUST-014", name: "Global Tech", status: "active", mrr: 3800, cloudProvider: "Azure" },
      { id: "CUST-015", name: "Innovation Labs", status: "active", mrr: 2900, cloudProvider: "GCP" },
      { id: "CUST-016", name: "Tech Solutions", status: "active", mrr: 2100, cloudProvider: "AWS" },
      { id: "CUST-017", name: "Cloud Masters", status: "active", mrr: 1500, cloudProvider: "Azure" },
    ],
    recentOrders: [
      { id: "ORD-1241", customer: "Enterprise Plus", date: "2024-10-28", amount: 4200, status: "completed", items: 6 },
      { id: "ORD-1242", customer: "Global Tech", date: "2024-10-27", amount: 3800, status: "completed", items: 5 },
      { id: "ORD-1243", customer: "Innovation Labs", date: "2024-10-26", amount: 2900, status: "completed", items: 4 },
    ]
  },
  {
    id: "PTR-005",
    companyName: "Digital Transformation Co",
    contactName: "Lisa Anderson",
    email: "partnerships@digitaltrans.com",
    phone: "+1 (555) 567-8901",
    address: "654 Transform St, Boston, MA 02101",
    status: "active",
    tier: "gold",
    joinedDate: "2023-04-15",
    customersCount: 16,
    totalRevenue: 89000,
    monthlyRevenue: 7400,
    commission: 12,
    customers: [
      { id: "CUST-018", name: "Future Systems", status: "active", mrr: 2300, cloudProvider: "GCP" },
      { id: "CUST-019", name: "Smart Cloud", status: "active", mrr: 1900, cloudProvider: "AWS" },
      { id: "CUST-020", name: "Tech Innovators", status: "active", mrr: 1600, cloudProvider: "Azure" },
    ],
    recentOrders: [
      { id: "ORD-1244", customer: "Future Systems", date: "2024-10-28", amount: 2300, status: "processing", items: 3 },
      { id: "ORD-1245", customer: "Smart Cloud", date: "2024-10-27", amount: 1900, status: "completed", items: 2 },
    ]
  },
  {
    id: "PTR-006",
    companyName: "Velocity Cloud Partners",
    contactName: "James Wilson",
    email: "partners@velocitycloud.com",
    phone: "+1 (555) 678-9012",
    address: "987 Speed Way, Denver, CO 80202",
    status: "pending",
    tier: "silver",
    joinedDate: "2024-10-01",
    customersCount: 3,
    totalRevenue: 8500,
    monthlyRevenue: 2800,
    commission: 10,
    customers: [
      { id: "CUST-021", name: "StartUp Tech", status: "trial", mrr: 0, cloudProvider: "AWS" },
      { id: "CUST-022", name: "Growth Co", status: "active", mrr: 1400, cloudProvider: "Azure" },
    ],
    recentOrders: [
      { id: "ORD-1246", customer: "Growth Co", date: "2024-10-15", amount: 1400, status: "completed", items: 2 },
    ]
  }
];

const AdminPartners = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPartner, setSelectedPartner] = useState<typeof partnersData[0] | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [tierFilter, setTierFilter] = useState("all");

  const filteredPartners = partnersData.filter(partner => {
    const matchesSearch = 
      partner.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || partner.status === statusFilter;
    const matchesTier = tierFilter === "all" || partner.tier === tierFilter;
    
    return matchesSearch && matchesStatus && matchesTier;
  });

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'platinum': return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
      case 'gold': return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
      case 'silver': return 'bg-slate-500/10 text-slate-600 border-slate-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success/10 text-success border-success/20';
      case 'pending': return 'bg-warning/10 text-warning border-warning/20';
      case 'suspended': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'trial': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getCloudProviderColor = (provider: string) => {
    switch (provider) {
      case 'AWS': return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
      case 'Azure': return 'bg-teal-500/10 text-teal-600 border-teal-500/20';
      case 'GCP': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success/10 text-success border-success/20';
      case 'processing': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'pending': return 'bg-warning/10 text-warning border-warning/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  if (selectedPartner) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setSelectedPartner(null)}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Partners
          </Button>
        </div>

        {/* Partner Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-primary to-accent">
              <Building2 className="h-8 w-8 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-semibold">{selectedPartner.companyName}</h1>
                <Badge variant="outline" className={getTierColor(selectedPartner.tier)}>
                  {selectedPartner.tier.toUpperCase()}
                </Badge>
                <Badge variant="outline" className={getStatusColor(selectedPartner.status)}>
                  {selectedPartner.status === 'active' && <CheckCircle className="h-3 w-3 mr-1" />}
                  {selectedPartner.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                  {selectedPartner.status.charAt(0).toUpperCase() + selectedPartner.status.slice(1)}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Partner ID: {selectedPartner.id}</p>
              <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Joined {new Date(selectedPartner.joinedDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </div>
                <Separator orientation="vertical" className="h-4" />
                <div>Commission: {selectedPartner.commission}%</div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{selectedPartner.customersCount}</div>
              <p className="text-xs text-success mt-1">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                {selectedPartner.customers.filter(c => c.status === 'active').length} active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(selectedPartner.monthlyRevenue / 1000).toFixed(1)}K</div>
              <p className="text-xs text-muted-foreground mt-1">
                Commission: ${(selectedPartner.monthlyRevenue * selectedPartner.commission / 100).toFixed(0)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(selectedPartner.totalRevenue / 1000).toFixed(0)}K</div>
              <p className="text-xs text-muted-foreground mt-1">Lifetime value</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{selectedPartner.recentOrders.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Last 7 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information - Business Only */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Business Contact Information</CardTitle>
            <p className="text-sm text-muted-foreground">Primary business contact details</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded bg-muted">
                  <Users className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">Primary Contact</p>
                  <p className="text-sm text-muted-foreground">{selectedPartner.contactName}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded bg-muted">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">Business Email</p>
                  <p className="text-sm text-muted-foreground">{selectedPartner.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded bg-muted">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">{selectedPartner.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded bg-muted">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">Business Address</p>
                  <p className="text-sm text-muted-foreground">{selectedPartner.address}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for Customers and Orders */}
        <Tabs defaultValue="customers" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="customers">
              <Users className="h-4 w-4 mr-2" />
              Customers ({selectedPartner.customers.length})
            </TabsTrigger>
            <TabsTrigger value="orders">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Recent Orders ({selectedPartner.recentOrders.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="customers" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Partner's Customers</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Aggregated business metrics only - individual customer data managed by partner
                </p>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer ID</TableHead>
                      <TableHead>Company Name</TableHead>
                      <TableHead>Cloud Provider</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">MRR</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedPartner.customers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell>
                          <span className="font-mono text-xs text-muted-foreground">
                            {customer.id}
                          </span>
                        </TableCell>
                        <TableCell className="font-medium">{customer.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getCloudProviderColor(customer.cloudProvider)}>
                            {customer.cloudProvider}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusColor(customer.status)}>
                            {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          ${customer.mrr.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Recent Orders</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Last 7 days - Financial and business metrics only
                </p>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-center">Items</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedPartner.recentOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>
                          <span className="font-mono text-xs text-muted-foreground">
                            {order.id}
                          </span>
                        </TableCell>
                        <TableCell className="font-medium">{order.customer}</TableCell>
                        <TableCell>
                          {new Date(order.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </TableCell>
                        <TableCell className="text-center">{order.items}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getOrderStatusColor(order.status)}>
                            {order.status === 'completed' && <CheckCircle className="h-3 w-3 mr-1" />}
                            {order.status === 'processing' && <Clock className="h-3 w-3 mr-1" />}
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          ${order.amount.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Partner Management</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage partner relationships and business performance
          </p>
        </div>
        <Button variant="gradient" size="sm">
          <Building2 className="h-4 w-4 mr-2" />
          Add Partner
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Partners</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{partnersData.length}</div>
            <p className="text-xs text-success mt-1">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              {partnersData.filter(p => p.status === 'active').length} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {partnersData.reduce((sum, p) => sum + p.customersCount, 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Across all partners</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${(partnersData.reduce((sum, p) => sum + p.monthlyRevenue, 0) / 1000).toFixed(0)}K
            </div>
            <p className="text-xs text-muted-foreground mt-1">Combined MRR</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${(partnersData.reduce((sum, p) => sum + p.totalRevenue, 0) / 1000).toFixed(0)}K
            </div>
            <p className="text-xs text-muted-foreground mt-1">Lifetime value</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search partners by name, contact, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-9"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px] h-9">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
              <Select value={tierFilter} onValueChange={setTierFilter}>
                <SelectTrigger className="w-[140px] h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tiers</SelectItem>
                  <SelectItem value="platinum">Platinum</SelectItem>
                  <SelectItem value="gold">Gold</SelectItem>
                  <SelectItem value="silver">Silver</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Partner ID</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead className="text-center">Customers</TableHead>
                <TableHead className="text-right">Monthly Revenue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPartners.map((partner) => (
                <TableRow 
                  key={partner.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => setSelectedPartner(partner)}
                >
                  <TableCell>
                    <span className="font-mono text-xs text-muted-foreground">
                      {partner.id}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded bg-muted">
                        <Building2 className="h-4 w-4" />
                      </div>
                      <span className="font-medium text-sm">{partner.companyName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{partner.contactName}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getTierColor(partner.tier)}>
                      {partner.tier.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center font-medium">{partner.customersCount}</TableCell>
                  <TableCell className="text-right font-medium">
                    ${(partner.monthlyRevenue / 1000).toFixed(1)}K
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(partner.status)}>
                      {partner.status === 'active' && <CheckCircle className="h-3 w-3 mr-1" />}
                      {partner.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                      {partner.status.charAt(0).toUpperCase() + partner.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPartner(partner);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Privacy Notice */}
      <Card className="border-muted-foreground/20">
        <CardContent className="pt-4">
          <div className="flex items-start gap-3 text-sm text-muted-foreground">
            <Shield className="h-4 w-4 mt-0.5 text-primary" />
            <div>
              <p className="font-medium text-foreground">Privacy & Compliance</p>
              <p className="mt-1">
                This view shows business relationship data only. Individual customer PII is managed by partners under their data processing agreements. 
                All data displayed complies with GDPR, CCPA, and SOC 2 requirements.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPartners;


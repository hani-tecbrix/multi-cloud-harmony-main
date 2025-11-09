import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/MetricCard";
import { SectionCard } from "@/components/SectionCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Building2, ArrowLeft, Users, ShoppingBag, DollarSign, TrendingUp, Calendar, CheckCircle, Clock, Mail, Phone, MapPin, Eye, Filter, Download, Shield, Cloud, Package, CreditCard, UserPlus, Upload, FileText, Sparkles, X, Wrench, Briefcase } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Globe, UserCheck } from "lucide-react";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

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
      { id: "CUST-001", name: "Acme Corp", status: "active", mrr: 2500, cloudProvider: "AWS", subscriptions: 5, lastOrderDate: "2024-10-25", industry: "Technology" },
      { id: "CUST-002", name: "TechStart Ltd", status: "active", mrr: 1800, cloudProvider: "Azure", subscriptions: 3, lastOrderDate: "2024-10-24", industry: "Startup" },
      { id: "CUST-003", name: "Innovation Hub", status: "active", mrr: 3200, cloudProvider: "GCP", subscriptions: 7, lastOrderDate: "2024-10-23", industry: "Technology" },
      { id: "CUST-004", name: "Digital Dynamics", status: "active", mrr: 1500, cloudProvider: "AWS", subscriptions: 2, lastOrderDate: "2024-10-20", industry: "Digital" },
      { id: "CUST-005", name: "CloudFirst Inc", status: "trial", mrr: 0, cloudProvider: "Azure", subscriptions: 1, lastOrderDate: "2024-10-18", industry: "Cloud Services" },
    ],
    recentOrders: [
      { id: "ORD-1234", customer: "Acme Corp", customerId: "CUST-001", date: "2024-10-25", amount: 2500, status: "completed", items: 3, cloudProvider: "AWS", commission: 375 },
      { id: "ORD-1235", customer: "TechStart Ltd", customerId: "CUST-002", date: "2024-10-24", amount: 1800, status: "completed", items: 2, cloudProvider: "Azure", commission: 216 },
      { id: "ORD-1236", customer: "Innovation Hub", customerId: "CUST-003", date: "2024-10-23", amount: 3200, status: "processing", items: 5, cloudProvider: "GCP", commission: 480 },
    ],
    allOrders: [
      { id: "ORD-1234", customer: "Acme Corp", customerId: "CUST-001", date: "2024-10-25", amount: 2500, status: "completed", items: 3, cloudProvider: "AWS", commission: 375 },
      { id: "ORD-1235", customer: "TechStart Ltd", customerId: "CUST-002", date: "2024-10-24", amount: 1800, status: "completed", items: 2, cloudProvider: "Azure", commission: 216 },
      { id: "ORD-1236", customer: "Innovation Hub", customerId: "CUST-003", date: "2024-10-23", amount: 3200, status: "processing", items: 5, cloudProvider: "GCP", commission: 480 },
      { id: "ORD-1220", customer: "Acme Corp", customerId: "CUST-001", date: "2024-10-15", amount: 2500, status: "completed", items: 3, cloudProvider: "AWS", commission: 375 },
      { id: "ORD-1215", customer: "Digital Dynamics", customerId: "CUST-004", date: "2024-10-10", amount: 1500, status: "completed", items: 2, cloudProvider: "AWS", commission: 225 },
      { id: "ORD-1210", customer: "TechStart Ltd", customerId: "CUST-002", date: "2024-10-05", amount: 1800, status: "completed", items: 2, cloudProvider: "Azure", commission: 216 },
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
      { id: "CUST-006", name: "Metro Systems", status: "active", mrr: 1900, cloudProvider: "AWS", subscriptions: 4, lastOrderDate: "2024-10-26", industry: "Telecommunications" },
      { id: "CUST-007", name: "DataFlow Corp", status: "active", mrr: 2800, cloudProvider: "GCP", subscriptions: 6, lastOrderDate: "2024-10-25", industry: "Data Analytics" },
      { id: "CUST-008", name: "Smart Solutions", status: "active", mrr: 1600, cloudProvider: "Azure", subscriptions: 3, lastOrderDate: "2024-10-22", industry: "Technology" },
      { id: "CUST-009", name: "Cloud Ventures", status: "suspended", mrr: 0, cloudProvider: "AWS", subscriptions: 0, lastOrderDate: "2024-09-15", industry: "Cloud Services" },
    ],
    recentOrders: [
      { id: "ORD-1237", customer: "Metro Systems", customerId: "CUST-006", date: "2024-10-26", amount: 1900, status: "completed", items: 2, cloudProvider: "AWS", commission: 228 },
      { id: "ORD-1238", customer: "DataFlow Corp", customerId: "CUST-007", date: "2024-10-25", amount: 2800, status: "completed", items: 4, cloudProvider: "GCP", commission: 336 },
    ],
    allOrders: [
      { id: "ORD-1237", customer: "Metro Systems", customerId: "CUST-006", date: "2024-10-26", amount: 1900, status: "completed", items: 2, cloudProvider: "AWS", commission: 228 },
      { id: "ORD-1238", customer: "DataFlow Corp", customerId: "CUST-007", date: "2024-10-25", amount: 2800, status: "completed", items: 4, cloudProvider: "GCP", commission: 336 },
      { id: "ORD-1225", customer: "Smart Solutions", customerId: "CUST-008", date: "2024-10-22", amount: 1600, status: "completed", items: 3, cloudProvider: "Azure", commission: 192 },
      { id: "ORD-1218", customer: "DataFlow Corp", customerId: "CUST-007", date: "2024-10-18", amount: 2800, status: "completed", items: 4, cloudProvider: "GCP", commission: 336 },
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
      { id: "CUST-010", name: "NextGen Tech", status: "active", mrr: 2100, cloudProvider: "Azure", subscriptions: 4, lastOrderDate: "2024-10-27", industry: "Technology" },
      { id: "CUST-011", name: "Scale Systems", status: "active", mrr: 1400, cloudProvider: "GCP", subscriptions: 2, lastOrderDate: "2024-10-26", industry: "Enterprise" },
      { id: "CUST-012", name: "Digital Wave", status: "trial", mrr: 0, cloudProvider: "AWS", subscriptions: 1, lastOrderDate: "2024-10-20", industry: "Digital" },
    ],
    recentOrders: [
      { id: "ORD-1239", customer: "NextGen Tech", customerId: "CUST-010", date: "2024-10-27", amount: 2100, status: "completed", items: 3, cloudProvider: "Azure", commission: 210 },
      { id: "ORD-1240", customer: "Scale Systems", customerId: "CUST-011", date: "2024-10-26", amount: 1400, status: "processing", items: 2, cloudProvider: "GCP", commission: 140 },
    ],
    allOrders: [
      { id: "ORD-1239", customer: "NextGen Tech", customerId: "CUST-010", date: "2024-10-27", amount: 2100, status: "completed", items: 3, cloudProvider: "Azure", commission: 210 },
      { id: "ORD-1240", customer: "Scale Systems", customerId: "CUST-011", date: "2024-10-26", amount: 1400, status: "processing", items: 2, cloudProvider: "GCP", commission: 140 },
      { id: "ORD-1222", customer: "NextGen Tech", customerId: "CUST-010", date: "2024-10-15", amount: 2100, status: "completed", items: 3, cloudProvider: "Azure", commission: 210 },
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
      { id: "CUST-013", name: "Enterprise Plus", status: "active", mrr: 4200, cloudProvider: "AWS", subscriptions: 8, lastOrderDate: "2024-10-28", industry: "Enterprise" },
      { id: "CUST-014", name: "Global Tech", status: "active", mrr: 3800, cloudProvider: "Azure", subscriptions: 7, lastOrderDate: "2024-10-27", industry: "Technology" },
      { id: "CUST-015", name: "Innovation Labs", status: "active", mrr: 2900, cloudProvider: "GCP", subscriptions: 5, lastOrderDate: "2024-10-26", industry: "Research" },
      { id: "CUST-016", name: "Tech Solutions", status: "active", mrr: 2100, cloudProvider: "AWS", subscriptions: 4, lastOrderDate: "2024-10-24", industry: "Technology" },
      { id: "CUST-017", name: "Cloud Masters", status: "active", mrr: 1500, cloudProvider: "Azure", subscriptions: 3, lastOrderDate: "2024-10-23", industry: "Cloud Services" },
    ],
    recentOrders: [
      { id: "ORD-1241", customer: "Enterprise Plus", customerId: "CUST-013", date: "2024-10-28", amount: 4200, status: "completed", items: 6, cloudProvider: "AWS", commission: 630 },
      { id: "ORD-1242", customer: "Global Tech", customerId: "CUST-014", date: "2024-10-27", amount: 3800, status: "completed", items: 5, cloudProvider: "Azure", commission: 570 },
      { id: "ORD-1243", customer: "Innovation Labs", customerId: "CUST-015", date: "2024-10-26", amount: 2900, status: "completed", items: 4, cloudProvider: "GCP", commission: 435 },
    ],
    allOrders: [
      { id: "ORD-1241", customer: "Enterprise Plus", customerId: "CUST-013", date: "2024-10-28", amount: 4200, status: "completed", items: 6, cloudProvider: "AWS", commission: 630 },
      { id: "ORD-1242", customer: "Global Tech", customerId: "CUST-014", date: "2024-10-27", amount: 3800, status: "completed", items: 5, cloudProvider: "Azure", commission: 570 },
      { id: "ORD-1243", customer: "Innovation Labs", customerId: "CUST-015", date: "2024-10-26", amount: 2900, status: "completed", items: 4, cloudProvider: "GCP", commission: 435 },
      { id: "ORD-1230", customer: "Tech Solutions", customerId: "CUST-016", date: "2024-10-24", amount: 2100, status: "completed", items: 4, cloudProvider: "AWS", commission: 315 },
      { id: "ORD-1228", customer: "Cloud Masters", customerId: "CUST-017", date: "2024-10-23", amount: 1500, status: "completed", items: 3, cloudProvider: "Azure", commission: 225 },
      { id: "ORD-1220", customer: "Enterprise Plus", customerId: "CUST-013", date: "2024-10-15", amount: 4200, status: "completed", items: 6, cloudProvider: "AWS", commission: 630 },
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
      { id: "CUST-018", name: "Future Systems", status: "active", mrr: 2300, cloudProvider: "GCP", subscriptions: 5, lastOrderDate: "2024-10-28", industry: "Technology" },
      { id: "CUST-019", name: "Smart Cloud", status: "active", mrr: 1900, cloudProvider: "AWS", subscriptions: 3, lastOrderDate: "2024-10-27", industry: "Cloud Services" },
      { id: "CUST-020", name: "Tech Innovators", status: "active", mrr: 1600, cloudProvider: "Azure", subscriptions: 3, lastOrderDate: "2024-10-25", industry: "Innovation" },
    ],
    recentOrders: [
      { id: "ORD-1244", customer: "Future Systems", customerId: "CUST-018", date: "2024-10-28", amount: 2300, status: "processing", items: 3, cloudProvider: "GCP", commission: 276 },
      { id: "ORD-1245", customer: "Smart Cloud", customerId: "CUST-019", date: "2024-10-27", amount: 1900, status: "completed", items: 2, cloudProvider: "AWS", commission: 228 },
    ],
    allOrders: [
      { id: "ORD-1244", customer: "Future Systems", customerId: "CUST-018", date: "2024-10-28", amount: 2300, status: "processing", items: 3, cloudProvider: "GCP", commission: 276 },
      { id: "ORD-1245", customer: "Smart Cloud", customerId: "CUST-019", date: "2024-10-27", amount: 1900, status: "completed", items: 2, cloudProvider: "AWS", commission: 228 },
      { id: "ORD-1225", customer: "Tech Innovators", customerId: "CUST-020", date: "2024-10-25", amount: 1600, status: "completed", items: 3, cloudProvider: "Azure", commission: 192 },
      { id: "ORD-1215", customer: "Future Systems", customerId: "CUST-018", date: "2024-10-15", amount: 2300, status: "completed", items: 3, cloudProvider: "GCP", commission: 276 },
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
      { id: "CUST-021", name: "StartUp Tech", status: "trial", mrr: 0, cloudProvider: "AWS", subscriptions: 1, lastOrderDate: "2024-10-10", industry: "Startup" },
      { id: "CUST-022", name: "Growth Co", status: "active", mrr: 1400, cloudProvider: "Azure", subscriptions: 2, lastOrderDate: "2024-10-15", industry: "Growth" },
    ],
    recentOrders: [
      { id: "ORD-1246", customer: "Growth Co", customerId: "CUST-022", date: "2024-10-15", amount: 1400, status: "completed", items: 2, cloudProvider: "Azure", commission: 140 },
    ],
    allOrders: [
      { id: "ORD-1246", customer: "Growth Co", customerId: "CUST-022", date: "2024-10-15", amount: 1400, status: "completed", items: 2, cloudProvider: "Azure", commission: 140 },
    ]
  }
];

const AdminPartners = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPartner, setSelectedPartner] = useState<typeof partnersData[0] | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [tierFilter, setTierFilter] = useState("all");
  const [customerSearchTerm, setCustomerSearchTerm] = useState("");
  const [orderSearchTerm, setOrderSearchTerm] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState("all");
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [isAddPartnerSheetOpen, setIsAddPartnerSheetOpen] = useState(false);
  const [customerType, setCustomerType] = useState<"new" | "existing">("new");
  const [existingDomain, setExistingDomain] = useState("");
  const [newCustomer, setNewCustomer] = useState({
    company: "",
    cloud: "",
    plan: "",
    consumer: "",
    name: "",
    primaryDomain: "",
    reference: "",
    invoiceProfile: "",
    endCustomer: "",
  });
  const [newPartner, setNewPartner] = useState({
    companyName: "",
    logo: null as File | null,
    financialReport: null as File | null,
    tradeLicense: null as File | null,
    vatCertificate: null as File | null,
    businessContact: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    financeContact: {
      name: "",
      email: "",
      phone: "",
    },
    technicalContact: {
      name: "",
      email: "",
      phone: "",
    },
  });
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Reset search terms when partner changes
  useEffect(() => {
    setCustomerSearchTerm("");
    setOrderSearchTerm("");
    setOrderStatusFilter("all");
  }, [selectedPartner]);

  const filteredCustomers = selectedPartner?.customers.filter(customer =>
    customer.name.toLowerCase().includes(customerSearchTerm.toLowerCase()) ||
    customer.id.toLowerCase().includes(customerSearchTerm.toLowerCase()) ||
    customer.cloudProvider.toLowerCase().includes(customerSearchTerm.toLowerCase()) ||
    customer.industry?.toLowerCase().includes(customerSearchTerm.toLowerCase())
  ) || [];

  const filteredOrders = selectedPartner?.allOrders?.filter(order =>
    (order.customer.toLowerCase().includes(orderSearchTerm.toLowerCase()) ||
    order.id.toLowerCase().includes(orderSearchTerm.toLowerCase()) ||
    order.customerId.toLowerCase().includes(orderSearchTerm.toLowerCase())) &&
    (orderStatusFilter === "all" || order.status === orderStatusFilter)
  ) || selectedPartner?.recentOrders.filter(order =>
    (order.customer.toLowerCase().includes(orderSearchTerm.toLowerCase()) ||
    order.id.toLowerCase().includes(orderSearchTerm.toLowerCase())) &&
    (orderStatusFilter === "all" || order.status === orderStatusFilter)
  ) || [];

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
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Outstanding Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(selectedPartner.outstandingBalance / 1000).toFixed(1)}K</div>
              <p className="text-xs text-muted-foreground mt-1">
                Past due invoices: {selectedPartner.pastDueInvoices}
              </p>
            </CardContent>
          </Card>

        </div>

        {/* Contact Information - Business and Finance */}
        <SectionCard
          title="Contact Information"
          description="Contact details for business, finance, and technical operations"
          icon={Mail}
        >
            <Tabs defaultValue="business" className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="business">Business</TabsTrigger>
                <TabsTrigger value="finance">Finance</TabsTrigger>
                <TabsTrigger value="technical">Technical</TabsTrigger>
              </TabsList>
              
              <TabsContent value="business" className="mt-4">
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
              </TabsContent>
              
              <TabsContent value="finance" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded bg-muted">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Finance Contact</p>
                      <p className="text-sm text-muted-foreground">{selectedPartner.contactName || "N/A"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded bg-muted">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Finance Email</p>
                      <p className="text-sm text-muted-foreground">{selectedPartner.email || "N/A"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded bg-muted">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Finance Phone</p>
                      <p className="text-sm text-muted-foreground">{selectedPartner.phone || "N/A"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded bg-muted">
                      <CreditCard className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Payment Terms</p>
                      <p className="text-sm text-muted-foreground">Net 30</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="technical" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded bg-muted">
                      <Wrench className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Technical Contact</p>
                      <p className="text-sm text-muted-foreground">{selectedPartner.contactName || "N/A"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded bg-muted">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Technical Email</p>
                      <p className="text-sm text-muted-foreground">{selectedPartner.email || "N/A"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded bg-muted">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Technical Phone</p>
                      <p className="text-sm text-muted-foreground">{selectedPartner.phone || "N/A"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded bg-muted">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Department</p>
                      <p className="text-sm text-muted-foreground">IT/Technical</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
        </SectionCard>

        {/* Tabs for Customers and Orders */}
        <Tabs defaultValue="customers" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="customers">
              <Users className="h-4 w-4 mr-2" />
              Customers ({selectedPartner.customers.length})
            </TabsTrigger>
            <TabsTrigger value="orders">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Orders ({selectedPartner?.allOrders?.length || selectedPartner?.recentOrders?.length || 0})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="customers" className="mt-4">
            <SectionCard
              title="Partner's Customers"
              description="Business metrics only - Customer PII managed by partner per privacy agreement"
              icon={Users}
              action={
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddSheetOpen(true)}
                  className="gap-2"
                >
                  <UserPlus className="h-4 w-4" />
                  Add New Customer
                </Button>
              }
            >
                {/* Search and Filters */}
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search customers by name, ID, or industry..."
                      value={customerSearchTerm}
                      onChange={(e) => setCustomerSearchTerm(e.target.value)}
                      className="pl-9 h-9"
                    />
                  </div>
                </div>

                {filteredCustomers.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No customers found</p>
                  </div>
                ) : (
                  <>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Customer ID</TableHead>
                          <TableHead>Company Name</TableHead>
                          <TableHead>Industry</TableHead>
                          <TableHead>Cloud Provider</TableHead>
                          <TableHead className="text-center">Subscriptions</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">MRR</TableHead>
                          <TableHead className="text-right">Last Order</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredCustomers.map((customer) => (
                          <TableRow key={customer.id}>
                            <TableCell>
                              <span className="font-mono text-xs text-muted-foreground">
                                {customer.id}
                              </span>
                            </TableCell>
                            <TableCell className="font-medium">{customer.name}</TableCell>
                            <TableCell>
                              <span className="text-sm text-muted-foreground">{customer.industry || "N/A"}</span>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className={getCloudProviderColor(customer.cloudProvider)}>
                                <Cloud className="h-3 w-3 mr-1" />
                                {customer.cloudProvider}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-center">
                              <div className="flex items-center justify-center gap-1">
                                <Package className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">{customer.subscriptions || 0}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className={getStatusColor(customer.status)}>
                                {customer.status === 'active' && <CheckCircle className="h-3 w-3 mr-1" />}
                                {customer.status === 'trial' && <Clock className="h-3 w-3 mr-1" />}
                                {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right font-medium">
                              ${customer.mrr.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-right text-sm text-muted-foreground">
                              {customer.lastOrderDate ? new Date(customer.lastOrderDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : "N/A"}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </>
                )}
            </SectionCard>
          </TabsContent>

          <TabsContent value="orders" className="mt-4">
            <SectionCard
              title="Orders"
              description="Financial and business metrics only - Customer details managed by partner"
              icon={ShoppingBag}
              badge={
                <Badge variant="outline" className="flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  Privacy Compliant
                </Badge>
              }
            >
                {/* Search and Filters */}
                <div className="mb-4 space-y-3">
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search orders by ID, customer, or customer ID..."
                        value={orderSearchTerm}
                        onChange={(e) => setOrderSearchTerm(e.target.value)}
                        className="pl-9 h-9"
                      />
                    </div>
                    <Select value={orderStatusFilter} onValueChange={setOrderStatusFilter}>
                      <SelectTrigger className="w-[150px] h-9">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {filteredOrders.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <ShoppingBag className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No orders found</p>
                  </div>
                ) : (
                  <>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead>Customer ID</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Cloud Provider</TableHead>
                          <TableHead className="text-center">Items</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                          <TableHead className="text-right">Commission</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredOrders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell>
                              <span className="font-mono text-xs text-muted-foreground">
                                {order.id}
                              </span>
                            </TableCell>
                            <TableCell className="font-medium">{order.customer}</TableCell>
                            <TableCell>
                              <span className="font-mono text-xs text-muted-foreground">
                                {order.customerId || "N/A"}
                              </span>
                            </TableCell>
                            <TableCell>
                              {new Date(order.date).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </TableCell>
                            <TableCell>
                              {order.cloudProvider && (
                                <Badge variant="outline" className={getCloudProviderColor(order.cloudProvider)}>
                                  <Cloud className="h-3 w-3 mr-1" />
                                  {order.cloudProvider}
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-center">
                              <div className="flex items-center justify-center gap-1">
                                <Package className="h-4 w-4 text-muted-foreground" />
                                <span>{order.items}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className={getOrderStatusColor(order.status)}>
                                {order.status === 'completed' && <CheckCircle className="h-3 w-3 mr-1" />}
                                {order.status === 'processing' && <Clock className="h-3 w-3 mr-1" />}
                                {order.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right font-medium">
                              ${order.amount.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-right font-medium text-primary">
                              ${(order.commission || 0).toLocaleString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </>
                )}
            </SectionCard>
          </TabsContent>
        </Tabs>

        {/* Add New Customer Sheet */}
        <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
          <SheetContent side="right" className="w-full sm:max-w-2xl p-0 flex flex-col">
            <SheetHeader className="px-6 pt-6 pb-4 border-b">
              <SheetTitle className="text-xl">Add New Customer</SheetTitle>
              <SheetDescription className="text-sm mt-1">
                Add a new customer to {selectedPartner?.companyName}
              </SheetDescription>
            </SheetHeader>
            
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="space-y-6">
                {/* Customer Type Selection */}
                <RadioGroup value={customerType} onValueChange={(value) => setCustomerType(value as "new" | "existing")}>
                  <div className="grid gap-4">
                    <label
                      htmlFor="existing"
                      className={`flex flex-col space-y-3 rounded-lg border-2 p-4 cursor-pointer transition-all ${
                        customerType === "existing"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="existing" id="existing" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <UserCheck className="h-5 w-5 text-primary" />
                            <span className="font-semibold">Existing Customer</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Add to existing customer account
                          </p>
                        </div>
                      </div>
                      {customerType === "existing" && (
                        <div className="ml-7 space-y-2">
                          <Label htmlFor="domain">Domain *</Label>
                          <div className="relative">
                            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="domain"
                              placeholder="example.com"
                              value={existingDomain}
                              onChange={(e) => setExistingDomain(e.target.value)}
                              className="pl-9"
                            />
                          </div>
                        </div>
                      )}
                    </label>

                    <label
                      htmlFor="new"
                      className={`flex flex-col space-y-3 rounded-lg border-2 p-4 cursor-pointer transition-all ${
                        customerType === "new"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="new" id="new" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <UserPlus className="h-5 w-5 text-primary" />
                            <span className="font-semibold">New Customer</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Create a new customer account
                          </p>
                        </div>
                      </div>
                    </label>
                  </div>
                </RadioGroup>

                {customerType === "new" && (
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="company">Company *</Label>
                        <Input
                          id="company"
                          placeholder="Company Name"
                          value={newCustomer.company}
                          onChange={(e) => setNewCustomer({...newCustomer, company: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="primaryDomain">Primary Domain *</Label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="primaryDomain"
                            placeholder="example.com"
                            value={newCustomer.primaryDomain}
                            onChange={(e) => setNewCustomer({...newCustomer, primaryDomain: e.target.value})}
                            className="pl-9"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          placeholder="Full Name"
                          value={newCustomer.name}
                          onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="plan">Plan</Label>
                        <Input
                          id="plan"
                          placeholder="Selected plan"
                          value={newCustomer.plan}
                          onChange={(e) => setNewCustomer({...newCustomer, plan: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="consumer">Consumer</Label>
                        <Input
                          id="consumer"
                          placeholder="Consumer name"
                          value={newCustomer.consumer}
                          onChange={(e) => setNewCustomer({...newCustomer, consumer: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="endCustomer">End Customer</Label>
                        <Input
                          id="endCustomer"
                          placeholder="End customer name"
                          value={newCustomer.endCustomer}
                          onChange={(e) => setNewCustomer({...newCustomer, endCustomer: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="reference">Reference (Optional)</Label>
                        <Input
                          id="reference"
                          placeholder="Reference code or number"
                          value={newCustomer.reference}
                          onChange={(e) => setNewCustomer({...newCustomer, reference: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="invoiceProfile">Invoice Profile</Label>
                        <Input
                          id="invoiceProfile"
                          placeholder="Invoice profile name"
                          value={newCustomer.invoiceProfile}
                          onChange={(e) => setNewCustomer({...newCustomer, invoiceProfile: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <SheetFooter className="px-6 py-4 border-t bg-muted/30">
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsAddSheetOpen(false);
                  setCustomerType("new");
                  setExistingDomain("");
                  setNewCustomer({
                    company: "",
                    cloud: "",
                    plan: "",
                    consumer: "",
                    name: "",
                    primaryDomain: "",
                    reference: "",
                    invoiceProfile: "",
                    endCustomer: "",
                  });
                }}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  if (customerType === "existing" && !existingDomain) {
                    toast.error("Please enter domain");
                    return;
                  }
                  if (customerType === "new" && (!newCustomer.company || !newCustomer.name || !newCustomer.primaryDomain)) {
                    toast.error("Please fill in all required fields");
                    return;
                  }
                  toast.success(
                    customerType === "existing"
                      ? `Customer added to ${existingDomain}`
                      : `New customer ${newCustomer.company} added successfully`
                  );
                  setIsAddSheetOpen(false);
                  setCustomerType("new");
                  setExistingDomain("");
                  setNewCustomer({
                    company: "",
                    cloud: "",
                    plan: "",
                    consumer: "",
                    name: "",
                    primaryDomain: "",
                    reference: "",
                    invoiceProfile: "",
                    endCustomer: "",
                  });
                }}
                className="flex-1"
                disabled={
                  customerType === "existing" 
                    ? !existingDomain 
                    : (!newCustomer.company || !newCustomer.name || !newCustomer.primaryDomain)
                }
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Add Customer
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
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
        <Button 
          variant="gradient" 
          size="sm"
          onClick={() => setIsAddPartnerSheetOpen(true)}
        >
          <Building2 className="h-4 w-4 mr-2" />
          Add Partner
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          title="Total Partners"
          value={partnersData.length.toString()}
          change={`${partnersData.filter(p => p.status === 'active').length} active`}
          changeType="positive"
          icon={Briefcase}
          borderColor="#10B981"
        />
        <MetricCard
          title="Total Customers"
          value={partnersData.reduce((sum, p) => sum + p.customersCount, 0).toString()}
          change="Across all partners"
          changeType="neutral"
          icon={Users}
          borderColor="#3B82F6"
        />
        <MetricCard
          title="Monthly Revenue"
          value={`$${(partnersData.reduce((sum, p) => sum + p.monthlyRevenue, 0) / 1000).toFixed(0)}K`}
          change="Combined MRR"
          changeType="neutral"
          icon={DollarSign}
          borderColor="#8B5CF6"
        />
        <MetricCard
          title="Total Revenue"
          value={`$${(partnersData.reduce((sum, p) => sum + p.totalRevenue, 0) / 1000).toFixed(0)}K`}
          change="Lifetime value"
          changeType="neutral"
          icon={TrendingUp}
          borderColor="#F59E0B"
        />
      </div>

      {/* Filters and Search */}
      <SectionCard
        title={`Partners (${filteredPartners.length})`}
        icon={Briefcase}
        badge={
          <Badge variant="secondary">{filteredPartners.length} {filteredPartners.length !== 1 ? 'partners' : 'partner'}</Badge>
        }
      >
        <div className="space-y-4">
          {/* Search and Filters */}
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

          {/* Table */}
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
        </div>
      </SectionCard>

      {/* Add Partner Sheet */}
      <Sheet open={isAddPartnerSheetOpen} onOpenChange={setIsAddPartnerSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-2xl p-0 flex flex-col">
          <SheetHeader className="px-6 pt-6 pb-4 border-b">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <SheetTitle className="text-xl">Add New Partner</SheetTitle>
                <SheetDescription className="text-sm mt-1">
                  Register a new partner company
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>
          
          <ScrollArea ref={scrollAreaRef} className="flex-1 px-6">
            <div className="space-y-6 py-6">
              {/* Company Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Company Information
                  </span>
                  <div className="h-px flex-1 bg-border" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name *</Label>
                  <Input
                    id="company-name"
                    placeholder="Enter company name"
                    value={newPartner.companyName}
                    onChange={(e) => setNewPartner({...newPartner, companyName: e.target.value})}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logo-upload">Company Logo (Optional)</Label>
                  <div className="flex items-center gap-3">
                    <label
                      htmlFor="logo-upload"
                      className="flex items-center justify-center px-4 py-2 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      <span className="text-sm">Upload Logo</span>
                      <input
                        id="logo-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) setNewPartner({...newPartner, logo: file});
                        }}
                      />
                    </label>
                    {newPartner.logo && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <FileText className="h-4 w-4" />
                        <span>{newPartner.logo.name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setNewPartner({...newPartner, logo: null})}
                          className="h-6 w-6 p-0"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Documents Upload */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Documents (Optional)
                  </span>
                  <div className="h-px flex-1 bg-border" />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="financial-report">Audited Financial Report</Label>
                    <label
                      htmlFor="financial-report"
                      className="flex items-center justify-center px-4 py-2 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      <span className="text-sm">Upload PDF</span>
                      <input
                        id="financial-report"
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) setNewPartner({...newPartner, financialReport: file});
                        }}
                      />
                    </label>
                    {newPartner.financialReport && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <FileText className="h-3 w-3" />
                        <span className="truncate">{newPartner.financialReport.name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setNewPartner({...newPartner, financialReport: null})}
                          className="h-5 w-5 p-0"
                        >
                          <X className="h-2 w-2" />
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="trade-license">Trade License</Label>
                    <label
                      htmlFor="trade-license"
                      className="flex items-center justify-center px-4 py-2 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      <span className="text-sm">Upload PDF</span>
                      <input
                        id="trade-license"
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) setNewPartner({...newPartner, tradeLicense: file});
                        }}
                      />
                    </label>
                    {newPartner.tradeLicense && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <FileText className="h-3 w-3" />
                        <span className="truncate">{newPartner.tradeLicense.name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setNewPartner({...newPartner, tradeLicense: null})}
                          className="h-5 w-5 p-0"
                        >
                          <X className="h-2 w-2" />
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vat-certificate">VAT Certificate</Label>
                    <label
                      htmlFor="vat-certificate"
                      className="flex items-center justify-center px-4 py-2 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      <span className="text-sm">Upload PDF</span>
                      <input
                        id="vat-certificate"
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) setNewPartner({...newPartner, vatCertificate: file});
                        }}
                      />
                    </label>
                    {newPartner.vatCertificate && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <FileText className="h-3 w-3" />
                        <span className="truncate">{newPartner.vatCertificate.name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setNewPartner({...newPartner, vatCertificate: null})}
                          className="h-5 w-5 p-0"
                        >
                          <X className="h-2 w-2" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Business Contact */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Business Contact *
                  </span>
                  <div className="h-px flex-1 bg-border" />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="business-name">Contact Name *</Label>
                    <Input
                      id="business-name"
                      placeholder="Full name"
                      value={newPartner.businessContact.name}
                      onChange={(e) => setNewPartner({
                        ...newPartner,
                        businessContact: {...newPartner.businessContact, name: e.target.value}
                      })}
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business-email">Email *</Label>
                    <Input
                      id="business-email"
                      type="email"
                      placeholder="email@example.com"
                      value={newPartner.businessContact.email}
                      onChange={(e) => setNewPartner({
                        ...newPartner,
                        businessContact: {...newPartner.businessContact, email: e.target.value}
                      })}
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business-phone">Phone *</Label>
                    <Input
                      id="business-phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={newPartner.businessContact.phone}
                      onChange={(e) => setNewPartner({
                        ...newPartner,
                        businessContact: {...newPartner.businessContact, phone: e.target.value}
                      })}
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business-address">Business Address *</Label>
                    <Input
                      id="business-address"
                      placeholder="123 Street, City, State ZIP"
                      value={newPartner.businessContact.address}
                      onChange={(e) => setNewPartner({
                        ...newPartner,
                        businessContact: {...newPartner.businessContact, address: e.target.value}
                      })}
                      className="h-11"
                    />
                  </div>
                </div>
              </div>

              {/* Finance Contact */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Finance Contact *
                  </span>
                  <div className="h-px flex-1 bg-border" />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="finance-name">Contact Name *</Label>
                    <Input
                      id="finance-name"
                      placeholder="Full name"
                      value={newPartner.financeContact.name}
                      onChange={(e) => setNewPartner({
                        ...newPartner,
                        financeContact: {...newPartner.financeContact, name: e.target.value}
                      })}
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="finance-email">Email *</Label>
                    <Input
                      id="finance-email"
                      type="email"
                      placeholder="email@example.com"
                      value={newPartner.financeContact.email}
                      onChange={(e) => setNewPartner({
                        ...newPartner,
                        financeContact: {...newPartner.financeContact, email: e.target.value}
                      })}
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="finance-phone">Phone *</Label>
                    <Input
                      id="finance-phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={newPartner.financeContact.phone}
                      onChange={(e) => setNewPartner({
                        ...newPartner,
                        financeContact: {...newPartner.financeContact, phone: e.target.value}
                      })}
                      className="h-11"
                    />
                  </div>
                </div>
              </div>

              {/* Technical Contact */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Technical Contact (Optional)
                  </span>
                  <div className="h-px flex-1 bg-border" />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="technical-name">Contact Name</Label>
                    <Input
                      id="technical-name"
                      placeholder="Full name"
                      value={newPartner.technicalContact.name}
                      onChange={(e) => setNewPartner({
                        ...newPartner,
                        technicalContact: {...newPartner.technicalContact, name: e.target.value}
                      })}
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="technical-email">Email</Label>
                    <Input
                      id="technical-email"
                      type="email"
                      placeholder="email@example.com"
                      value={newPartner.technicalContact.email}
                      onChange={(e) => setNewPartner({
                        ...newPartner,
                        technicalContact: {...newPartner.technicalContact, email: e.target.value}
                      })}
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="technical-phone">Phone</Label>
                    <Input
                      id="technical-phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={newPartner.technicalContact.phone}
                      onChange={(e) => setNewPartner({
                        ...newPartner,
                        technicalContact: {...newPartner.technicalContact, phone: e.target.value}
                      })}
                      className="h-11"
                    />
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>

          <SheetFooter className="px-6 py-4 border-t bg-muted/30">
            <Button 
              variant="outline" 
              onClick={() => {
                setIsAddPartnerSheetOpen(false);
                setNewPartner({
                  companyName: "",
                  logo: null,
                  financialReport: null,
                  tradeLicense: null,
                  vatCertificate: null,
                  businessContact: { name: "", email: "", phone: "", address: "" },
                  financeContact: { name: "", email: "", phone: "" },
                  technicalContact: { name: "", email: "", phone: "" },
                });
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={() => {
                if (!newPartner.companyName || !newPartner.businessContact.name || !newPartner.businessContact.email || !newPartner.businessContact.phone || !newPartner.businessContact.address || !newPartner.financeContact.name || !newPartner.financeContact.email || !newPartner.financeContact.phone) {
                  toast.error("Please fill in all required fields");
                  return;
                }
                toast.success(`Partner ${newPartner.companyName} added successfully!`);
                setIsAddPartnerSheetOpen(false);
                setNewPartner({
                  companyName: "",
                  logo: null,
                  financialReport: null,
                  tradeLicense: null,
                  vatCertificate: null,
                  businessContact: { name: "", email: "", phone: "", address: "" },
                  financeContact: { name: "", email: "", phone: "" },
                  technicalContact: { name: "", email: "", phone: "" },
                });
              }}
              className="flex-1"
              disabled={
                !newPartner.companyName || 
                !newPartner.businessContact.name || 
                !newPartner.businessContact.email || 
                !newPartner.businessContact.phone || 
                !newPartner.businessContact.address || 
                !newPartner.financeContact.name || 
                !newPartner.financeContact.email || 
                !newPartner.financeContact.phone
              }
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add Partner
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminPartners;


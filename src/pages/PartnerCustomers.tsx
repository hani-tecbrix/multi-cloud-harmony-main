import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Building2, ArrowLeft, DollarSign, Clock, CheckCircle, AlertCircle, Mail, User, Hash, Cloud, Loader2, X, Sparkles, ChevronLeft, ChevronRight, Globe, UserPlus, UserCheck } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { MultiCloudTenantDetector } from "@/components/MultiCloudTenantDetector";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const customersData = [
  { 
    id: 1, 
    name: "Acme Corporation", 
    email: "admin@acme.com",
    type: "company",
    industry: "Technology", 
    subscriptions: 12, 
    monthlySpend: 45280, 
    status: "active",
    tenantId: "TNT-AWS-001234",
    cloudProvider: "AWS",
    onboardedDate: "2024-01-15",
    billingInfo: {
      currentBalance: 45280,
      lastPayment: 45280,
      lastPaymentDate: "2025-01-15",
      paymentStatus: "paid",
      outstandingBalance: 0,
      overdue: false,
    },
    subscriptionDetails: [
      { provider: "AWS", service: "EC2", type: "Consumption", cost: 15000 },
      { provider: "Azure", service: "SQL Database", type: "License", cost: 8500 },
      { provider: "GCP", service: "Cloud Storage", type: "Consumption", cost: 6200 },
      { provider: "Salesforce", service: "Enterprise", type: "License", cost: 15580 },
    ]
  },
  { 
    id: 2, 
    name: "John Smith", 
    email: "john.smith@personal.com",
    type: "personal",
    industry: "Individual", 
    subscriptions: 3, 
    monthlySpend: 850, 
    status: "active",
    tenantId: "TNT-AZURE-005678",
    cloudProvider: "Azure",
    onboardedDate: "2024-11-20",
    billingInfo: {
      currentBalance: 850,
      lastPayment: 850,
      lastPaymentDate: "2025-01-20",
      paymentStatus: "paid",
      outstandingBalance: 0,
      overdue: false,
    },
    subscriptionDetails: [
      { provider: "Azure", service: "Virtual Machines", type: "Consumption", cost: 450 },
      { provider: "Azure", service: "App Service", type: "License", cost: 400 },
    ]
  },
  { 
    id: 3, 
    name: "TechStart Inc", 
    email: "contact@techstart.io",
    type: "company",
    industry: "Startup", 
    subscriptions: 8, 
    monthlySpend: 28500, 
    status: "active",
    tenantId: "TNT-AWS-002845",
    cloudProvider: "AWS",
    onboardedDate: "2024-12-10",
    billingInfo: {
      currentBalance: 57000,
      lastPayment: 28500,
      lastPaymentDate: "2024-12-20",
      paymentStatus: "pending",
      outstandingBalance: 28500,
      overdue: true,
    },
    subscriptionDetails: [
      { provider: "AWS", service: "Lambda", type: "Consumption", cost: 8500 },
      { provider: "Slack", service: "Business+", type: "License", cost: 12000 },
    ]
  },
  { 
    id: 4, 
    name: "Global Solutions Ltd", 
    email: "info@globalsolutions.com",
    type: "company",
    industry: "Consulting", 
    subscriptions: 15, 
    monthlySpend: 52100, 
    status: "active",
    tenantId: "TNT-GCP-003456",
    cloudProvider: "GCP",
    onboardedDate: "2023-08-22",
    billingInfo: {
      currentBalance: 52100,
      lastPayment: 52100,
      lastPaymentDate: "2025-01-18",
      paymentStatus: "paid",
      outstandingBalance: 0,
      overdue: false,
    },
    subscriptionDetails: [
      { provider: "GCP", service: "Compute Engine", type: "Consumption", cost: 18000 },
      { provider: "GCP", service: "BigQuery", type: "Consumption", cost: 12100 },
      { provider: "Microsoft 365", service: "E3", type: "License", cost: 22000 },
    ]
  },
  { 
    id: 5, 
    name: "InnovateTech", 
    email: "admin@innovatetech.io",
    type: "company",
    industry: "Software Development", 
    subscriptions: 9, 
    monthlySpend: 33600, 
    status: "active",
    tenantId: "TNT-AZURE-007892",
    cloudProvider: "Azure",
    onboardedDate: "2024-03-10",
    billingInfo: {
      currentBalance: 33600,
      lastPayment: 33600,
      lastPaymentDate: "2025-01-22",
      paymentStatus: "paid",
      outstandingBalance: 0,
      overdue: false,
    },
    subscriptionDetails: [
      { provider: "Azure", service: "App Service", type: "Consumption", cost: 15600 },
      { provider: "Azure", service: "Cosmos DB", type: "Consumption", cost: 18000 },
    ]
  },
  { 
    id: 6, 
    name: "Sarah Johnson", 
    email: "sarah.j@email.com",
    type: "personal",
    industry: "Freelance Developer", 
    subscriptions: 4, 
    monthlySpend: 1250, 
    status: "active",
    tenantId: "TNT-AWS-008923",
    cloudProvider: "AWS",
    onboardedDate: "2024-09-15",
    billingInfo: {
      currentBalance: 1250,
      lastPayment: 1250,
      lastPaymentDate: "2025-01-25",
      paymentStatus: "paid",
      outstandingBalance: 0,
      overdue: false,
    },
    subscriptionDetails: [
      { provider: "AWS", service: "S3", type: "Consumption", cost: 450 },
      { provider: "AWS", service: "Lambda", type: "Consumption", cost: 800 },
    ]
  },
  { 
    id: 7, 
    name: "MedHealth Systems", 
    email: "it@medhealth.com",
    type: "company",
    industry: "Healthcare", 
    subscriptions: 18, 
    monthlySpend: 68900, 
    status: "active",
    tenantId: "TNT-AZURE-009134",
    cloudProvider: "Azure",
    onboardedDate: "2023-05-20",
    billingInfo: {
      currentBalance: 137800,
      lastPayment: 68900,
      lastPaymentDate: "2024-12-28",
      paymentStatus: "pending",
      outstandingBalance: 68900,
      overdue: true,
    },
    subscriptionDetails: [
      { provider: "Azure", service: "SQL Database", type: "License", cost: 28900 },
      { provider: "Azure", service: "Virtual Machines", type: "Consumption", cost: 35000 },
      { provider: "Salesforce", service: "Health Cloud", type: "License", cost: 5000 },
    ]
  },
  { 
    id: 8, 
    name: "FinanceFlow Inc", 
    email: "ops@financeflow.com",
    type: "company",
    industry: "Financial Services", 
    subscriptions: 14, 
    monthlySpend: 58200, 
    status: "active",
    tenantId: "TNT-GCP-010245",
    cloudProvider: "GCP",
    onboardedDate: "2023-11-12",
    billingInfo: {
      currentBalance: 58200,
      lastPayment: 58200,
      lastPaymentDate: "2025-01-12",
      paymentStatus: "paid",
      outstandingBalance: 0,
      overdue: false,
    },
    subscriptionDetails: [
      { provider: "GCP", service: "Cloud SQL", type: "Consumption", cost: 25200 },
      { provider: "GCP", service: "Cloud Run", type: "Consumption", cost: 18000 },
      { provider: "Salesforce", service: "Financial Services Cloud", type: "License", cost: 15000 },
    ]
  },
  { 
    id: 9, 
    name: "EcoGreen Solutions", 
    email: "contact@ecogreen.io",
    type: "company",
    industry: "Environmental", 
    subscriptions: 6, 
    monthlySpend: 18500, 
    status: "active",
    tenantId: "TNT-AWS-011356",
    cloudProvider: "AWS",
    onboardedDate: "2024-06-08",
    billingInfo: {
      currentBalance: 18500,
      lastPayment: 18500,
      lastPaymentDate: "2025-01-19",
      paymentStatus: "paid",
      outstandingBalance: 0,
      overdue: false,
    },
    subscriptionDetails: [
      { provider: "AWS", service: "EC2", type: "Consumption", cost: 9500 },
      { provider: "AWS", service: "RDS", type: "Consumption", cost: 9000 },
    ]
  },
  { 
    id: 10, 
    name: "Michael Chen", 
    email: "mchen@personal.net",
    type: "personal",
    industry: "Data Analyst", 
    subscriptions: 5, 
    monthlySpend: 1850, 
    status: "active",
    tenantId: "TNT-GCP-012467",
    cloudProvider: "GCP",
    onboardedDate: "2024-07-22",
    billingInfo: {
      currentBalance: 1850,
      lastPayment: 1850,
      lastPaymentDate: "2025-01-23",
      paymentStatus: "paid",
      outstandingBalance: 0,
      overdue: false,
    },
    subscriptionDetails: [
      { provider: "GCP", service: "BigQuery", type: "Consumption", cost: 1200 },
      { provider: "GCP", service: "Cloud Storage", type: "Consumption", cost: 650 },
    ]
  },
  { 
    id: 11, 
    name: "RetailMax Corporation", 
    email: "admin@retailmax.com",
    type: "company",
    industry: "Retail", 
    subscriptions: 11, 
    monthlySpend: 39800, 
    status: "active",
    tenantId: "TNT-AZURE-013578",
    cloudProvider: "Azure",
    onboardedDate: "2024-02-14",
    billingInfo: {
      currentBalance: 39800,
      lastPayment: 39800,
      lastPaymentDate: "2025-01-16",
      paymentStatus: "paid",
      outstandingBalance: 0,
      overdue: false,
    },
    subscriptionDetails: [
      { provider: "Azure", service: "Blob Storage", type: "Consumption", cost: 12800 },
      { provider: "Azure", service: "Functions", type: "Consumption", cost: 15000 },
      { provider: "Shopify", service: "Plus", type: "License", cost: 12000 },
    ]
  },
  { 
    id: 12, 
    name: "AutoDrive Systems", 
    email: "info@autodrive.tech",
    type: "company",
    industry: "Automotive", 
    subscriptions: 16, 
    monthlySpend: 72300, 
    status: "active",
    tenantId: "TNT-AWS-014689",
    cloudProvider: "AWS",
    onboardedDate: "2023-09-18",
    billingInfo: {
      currentBalance: 144600,
      lastPayment: 72300,
      lastPaymentDate: "2024-12-22",
      paymentStatus: "pending",
      outstandingBalance: 72300,
      overdue: true,
    },
    subscriptionDetails: [
      { provider: "AWS", service: "EC2", type: "Consumption", cost: 35000 },
      { provider: "AWS", service: "S3", type: "Consumption", cost: 18300 },
      { provider: "AWS", service: "RDS", type: "Consumption", cost: 19000 },
    ]
  },
  { 
    id: 13, 
    name: "DataVault Analytics", 
    email: "support@datavault.io",
    type: "company",
    industry: "Data & Analytics", 
    subscriptions: 13, 
    monthlySpend: 61500, 
    status: "active",
    tenantId: "TNT-GCP-015790",
    cloudProvider: "GCP",
    onboardedDate: "2024-04-05",
    billingInfo: {
      currentBalance: 61500,
      lastPayment: 61500,
      lastPaymentDate: "2025-01-21",
      paymentStatus: "paid",
      outstandingBalance: 0,
      overdue: false,
    },
    subscriptionDetails: [
      { provider: "GCP", service: "BigQuery", type: "Consumption", cost: 38500 },
      { provider: "GCP", service: "Cloud Storage", type: "Consumption", cost: 15000 },
      { provider: "Snowflake", service: "Enterprise", type: "Consumption", cost: 8000 },
    ]
  },
  { 
    id: 14, 
    name: "Emma Williams", 
    email: "emma.w@mail.com",
    type: "personal",
    industry: "Graphic Designer", 
    subscriptions: 3, 
    monthlySpend: 950, 
    status: "active",
    tenantId: "TNT-AZURE-016801",
    cloudProvider: "Azure",
    onboardedDate: "2024-10-12",
    billingInfo: {
      currentBalance: 950,
      lastPayment: 950,
      lastPaymentDate: "2025-01-27",
      paymentStatus: "paid",
      outstandingBalance: 0,
      overdue: false,
    },
    subscriptionDetails: [
      { provider: "Azure", service: "Blob Storage", type: "Consumption", cost: 450 },
      { provider: "Adobe", service: "Creative Cloud", type: "License", cost: 500 },
    ]
  },
  { 
    id: 15, 
    name: "SmartCity Solutions", 
    email: "admin@smartcity.gov",
    type: "company",
    industry: "Government", 
    subscriptions: 20, 
    monthlySpend: 95200, 
    status: "active",
    tenantId: "TNT-AWS-017912",
    cloudProvider: "AWS",
    onboardedDate: "2023-03-28",
    billingInfo: {
      currentBalance: 95200,
      lastPayment: 95200,
      lastPaymentDate: "2025-01-14",
      paymentStatus: "paid",
      outstandingBalance: 0,
      overdue: false,
    },
    subscriptionDetails: [
      { provider: "AWS", service: "EC2", type: "Consumption", cost: 45000 },
      { provider: "AWS", service: "RDS", type: "Consumption", cost: 28200 },
      { provider: "AWS", service: "Lambda", type: "Consumption", cost: 15000 },
      { provider: "Salesforce", service: "Government Cloud", type: "License", cost: 7000 },
    ]
  },
];

const PartnerCustomers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<typeof customersData[0] | null>(null);
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [isCheckingTenant, setIsCheckingTenant] = useState(false);
  const [detectedTenants, setDetectedTenants] = useState<any[]>([]);
  const [selectedServices, setSelectedServices] = useState<any[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [customerType, setCustomerType] = useState<"new" | "existing">("new");
  const [existingDomain, setExistingDomain] = useState("");
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  
  // Add customer form state
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
    type: "company",
  });

  // Auto-scroll to newly added sections
  useEffect(() => {
    if (detectedTenants.length > 0 && scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        setTimeout(() => {
          scrollElement.scrollTo({
            top: scrollElement.scrollHeight,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  }, [detectedTenants]);

  const filteredCustomers = customersData.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCustomers = filteredCustomers.slice(startIndex, endIndex);

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleTenantsDetected = (tenants: any[], services: any[]) => {
    setDetectedTenants(tenants);
    setSelectedServices(services);
  };

  const handleAddCustomer = () => {
    if (!newCustomer.company || !newCustomer.name || !newCustomer.primaryDomain) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Generate customer ID based on cloud provider
    const cloudProvider = newCustomer.cloud || "AWS";
    const customerId = `TNT-${cloudProvider.toUpperCase()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

    const tenantSummary = detectedTenants.length > 0 
      ? `Linked ${detectedTenants.length} existing tenant(s) and added ${selectedServices.length} service(s)`
      : "Created new account";

    toast.success("Customer added successfully!", {
      description: `${newCustomer.company} (${customerId}) has been added. ${tenantSummary}`
    });
    
    setIsAddSheetOpen(false);
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
      type: "company",
    });
    setDetectedTenants([]);
    setSelectedServices([]);
  };

  const handleCloseSheet = () => {
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
      type: "company",
    });
    setDetectedTenants([]);
    setSelectedServices([]);
  };

  if (selectedCustomer) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedCustomer(null)}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">{selectedCustomer.name}</h1>
            <div className="flex items-center gap-3 mt-2">
              <Badge variant={selectedCustomer.type === 'company' ? 'default' : 'secondary'}>
                {selectedCustomer.type === 'company' ? <Building2 className="h-3 w-3 mr-1" /> : <User className="h-3 w-3 mr-1" />}
                {selectedCustomer.type}
              </Badge>
              <p className="text-sm text-muted-foreground">{selectedCustomer.email}</p>
              {selectedCustomer.tenantId && (
                <Badge variant="outline" className="font-mono text-xs">
                  <Hash className="h-3 w-3 mr-1" />
                  {selectedCustomer.tenantId}
                </Badge>
              )}
            </div>
          </div>
          <Button size="sm" variant="gradient" onClick={() => {
            toast.success("Navigate to service assignment");
          }}>
            <Plus className="h-4 w-4 mr-1" />
            Assign Services
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{selectedCustomer.subscriptions}</div>
              <p className="text-xs text-muted-foreground">
                Across {selectedCustomer.subscriptionDetails.length} providers
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Spend</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(selectedCustomer.monthlySpend / 1000).toFixed(1)}K</div>
              <p className="text-xs text-muted-foreground">
                Current billing cycle
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Payment Status</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                {selectedCustomer.billingInfo.paymentStatus === 'paid' ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm font-semibold text-success">Paid</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-4 w-4 text-warning" />
                    <span className="text-sm font-semibold text-warning">Pending</span>
                  </>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Last payment: {selectedCustomer.billingInfo.lastPaymentDate}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${selectedCustomer.billingInfo.outstandingBalance > 0 ? 'text-destructive' : 'text-success'}`}>
                ${selectedCustomer.billingInfo.outstandingBalance.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                {selectedCustomer.billingInfo.overdue ? 'Overdue' : 'Up to date'}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Subscription Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Provider</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Monthly Cost</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedCustomer.subscriptionDetails.map((sub, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{sub.provider}</TableCell>
                    <TableCell>{sub.service}</TableCell>
                    <TableCell>
                      <Badge variant={sub.type === 'License' ? 'default' : 'secondary'}>
                        {sub.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      ${sub.cost.toLocaleString()}/mo
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">My Customers</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage and onboard your customers</p>
        </div>
        
        <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
          <SheetTrigger asChild>
            <Button size="sm" variant="gradient">
              <Plus className="h-4 w-4 mr-1" />
              Add Customer
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-2xl p-0 flex flex-col">
            <SheetHeader className="px-6 pt-6 pb-4 border-b">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <SheetTitle className="text-xl">Add New Customer</SheetTitle>
                  <SheetDescription className="text-sm mt-1">
                    Smart onboarding with multi-cloud tenant detection
                  </SheetDescription>
                </div>
              </div>
            </SheetHeader>
            
            <ScrollArea ref={scrollAreaRef} className="flex-1 px-6">
              <div className="space-y-6 py-6">
                {/* Customer Type Selection */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="h-px flex-1 bg-border" />
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Customer Type
                    </span>
                    <div className="h-px flex-1 bg-border" />
                  </div>

                  <RadioGroup value={customerType} onValueChange={(value) => setCustomerType(value as "new" | "existing")}>
                    <div className="grid gap-3 md:grid-cols-2">
                      <label
                        htmlFor="customer-new"
                        className={`flex items-center space-x-3 rounded-lg border-2 p-4 cursor-pointer transition-all ${
                          customerType === "new"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <RadioGroupItem value="new" id="customer-new" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <UserPlus className="h-4 w-4 text-primary" />
                            <span className="font-semibold text-sm">New Customer</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">Create a new customer account</p>
                        </div>
                      </label>
                      <label
                        htmlFor="customer-existing"
                        className={`flex items-center space-x-3 rounded-lg border-2 p-4 cursor-pointer transition-all ${
                          customerType === "existing"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <RadioGroupItem value="existing" id="customer-existing" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <UserCheck className="h-4 w-4 text-primary" />
                            <span className="font-semibold text-sm">Existing Customer</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">Add to existing account</p>
                        </div>
                      </label>
                    </div>
                  </RadioGroup>

                  {customerType === "existing" && (
                    <div className="space-y-2 animate-in slide-in-from-top-2">
                      <Label htmlFor="existing-domain">Domain</Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="existing-domain"
                          placeholder="example.com"
                          value={existingDomain}
                          onChange={(e) => setExistingDomain(e.target.value)}
                          className="pl-10 font-mono"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {customerType === "new" && (
                  <>
                    {/* Cloud Provider Selection - Card Based */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="h-px flex-1 bg-border" />
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Cloud Provider
                        </span>
                        <div className="h-px flex-1 bg-border" />
                      </div>

                      <div className="grid gap-3 md:grid-cols-3">
                        {[
                          { value: "AWS", label: "Amazon Web Services", icon: Cloud, color: "text-orange-600", bgColor: "bg-orange-50" },
                          { value: "Azure", label: "Microsoft Azure", icon: Cloud, color: "text-blue-600", bgColor: "bg-blue-50" },
                          { value: "GCP", label: "Google Cloud Platform", icon: Cloud, color: "text-green-600", bgColor: "bg-green-50" },
                        ].map((provider) => {
                          const IconComponent = provider.icon;
                          return (
                            <button
                              key={provider.value}
                              type="button"
                              onClick={() => setNewCustomer({...newCustomer, cloud: provider.value})}
                              className={`p-4 rounded-lg border-2 transition-all text-left ${
                                newCustomer.cloud === provider.value
                                  ? "border-primary bg-primary/5 shadow-md"
                                  : "border-border hover:border-primary/50"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${provider.bgColor}`}>
                                  <IconComponent className={`h-5 w-5 ${provider.color}`} />
                                </div>
                                <div className="flex-1">
                                  <p className="font-semibold text-sm">{provider.value}</p>
                                  <p className="text-xs text-muted-foreground">{provider.label}</p>
                                </div>
                                {newCustomer.cloud === provider.value && (
                                  <CheckCircle className="h-5 w-5 text-primary" />
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Customer Information Section */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="h-px flex-1 bg-border" />
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Customer Information
                        </span>
                        <div className="h-px flex-1 bg-border" />
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="company" className="text-sm font-medium">
                            Company
                            <span className="text-destructive ml-1">*</span>
                          </Label>
                          <Input
                            id="company"
                            placeholder="Company Name"
                            value={newCustomer.company}
                            onChange={(e) => setNewCustomer({...newCustomer, company: e.target.value})}
                            className="h-11"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="primaryDomain" className="text-sm font-medium">
                            Primary Domain
                            <span className="text-destructive ml-1">*</span>
                          </Label>
                          <div className="relative">
                            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="primaryDomain"
                              placeholder="example.com"
                              value={newCustomer.primaryDomain}
                              onChange={(e) => setNewCustomer({...newCustomer, primaryDomain: e.target.value})}
                              className="h-11 pl-10 font-mono"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium">
                          Name
                          <span className="text-destructive ml-1">*</span>
                        </Label>
                        <Input
                          id="name"
                          placeholder="Full Name"
                          value={newCustomer.name}
                          onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                          className="h-11"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="plan" className="text-sm font-medium">
                          Plan
                        </Label>
                        <Input
                          id="plan"
                          placeholder="Selected plan"
                          value={newCustomer.plan}
                          onChange={(e) => setNewCustomer({...newCustomer, plan: e.target.value})}
                          className="h-11"
                        />
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="consumer" className="text-sm font-medium">
                            Consumer
                          </Label>
                          <Input
                            id="consumer"
                            placeholder="Consumer name"
                            value={newCustomer.consumer}
                            onChange={(e) => setNewCustomer({...newCustomer, consumer: e.target.value})}
                            className="h-11"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="endCustomer" className="text-sm font-medium">
                            End Customer
                          </Label>
                          <Input
                            id="endCustomer"
                            placeholder="End customer name"
                            value={newCustomer.endCustomer}
                            onChange={(e) => setNewCustomer({...newCustomer, endCustomer: e.target.value})}
                            className="h-11"
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="reference" className="text-sm font-medium">
                            Reference (Optional)
                          </Label>
                          <Input
                            id="reference"
                            placeholder="Reference code or number"
                            value={newCustomer.reference}
                            onChange={(e) => setNewCustomer({...newCustomer, reference: e.target.value})}
                            className="h-11"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="invoiceProfile" className="text-sm font-medium">
                            Invoice Profile
                          </Label>
                          <Input
                            id="invoiceProfile"
                            placeholder="Invoice profile name"
                            value={newCustomer.invoiceProfile}
                            onChange={(e) => setNewCustomer({...newCustomer, invoiceProfile: e.target.value})}
                            className="h-11"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Cloud Tenant Detection Section */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="h-px flex-1 bg-border" />
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Cloud Tenant Detection
                        </span>
                        <div className="h-px flex-1 bg-border" />
                      </div>

                      <MultiCloudTenantDetector
                        email={newCustomer.primaryDomain}
                        onTenantsDetected={handleTenantsDetected}
                        isChecking={isCheckingTenant}
                        setIsChecking={setIsCheckingTenant}
                      />
                    </div>
                  </>
                )}
              </div>
            </ScrollArea>

            <SheetFooter className="px-6 py-4 border-t bg-muted/30">
              <div className="flex items-center gap-3 w-full">
                <Button 
                  variant="outline" 
                  onClick={handleCloseSheet}
                  className="flex-1"
                  disabled={isCheckingTenant}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button 
                  variant="gradient" 
                  onClick={handleAddCustomer}
                  className="flex-1"
                  disabled={isCheckingTenant || (customerType === "existing" ? !existingDomain : (!newCustomer.company || !newCustomer.name || !newCustomer.primaryDomain))}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Customer
                </Button>
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search customers by name or industry..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Cloud</TableHead>
                <TableHead className="text-center">Subscriptions</TableHead>
                <TableHead className="text-right">Monthly Spend</TableHead>
                <TableHead className="text-center">Payment Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedCustomers.map((customer) => (
                <TableRow
                  key={customer.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => setSelectedCustomer(customer)}
                >
                  <TableCell>
                    <span className="font-mono text-xs text-muted-foreground">
                      {customer.tenantId || '-'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded bg-muted">
                        {customer.type === 'company' ? <Building2 className="h-4 w-4" /> : <User className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{customer.name}</p>
                        <p className="text-xs text-muted-foreground">{customer.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {customer.cloudProvider ? (
                      <Badge 
                        variant="outline" 
                        className={
                          customer.cloudProvider === 'AWS' 
                            ? 'bg-amber-500/10 text-amber-600 border-amber-500/20'
                            : customer.cloudProvider === 'Azure'
                            ? 'bg-teal-500/10 text-teal-600 border-teal-500/20'
                            : 'bg-blue-500/10 text-blue-600 border-blue-500/20'
                        }
                      >
                        <Cloud className="h-3 w-3 mr-1" />
                        {customer.cloudProvider}
                      </Badge>
                    ) : (
                      <span className="text-xs text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-center text-sm font-medium">{customer.subscriptions}</TableCell>
                  <TableCell className="text-right text-sm font-medium">
                    ${(customer.monthlySpend / 1000).toFixed(1)}K
                  </TableCell>
                  <TableCell className="text-center">
                    {customer.billingInfo.paymentStatus === 'paid' ? (
                      <Badge variant="secondary" className="bg-success/10 text-success">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Paid
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="bg-destructive/10 text-destructive">
                        <Clock className="h-3 w-3 mr-1" />
                        Pending
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        
        {/* Pagination Controls */}
        <CardContent className="pt-0">
          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Show</span>
              <Select
                value={itemsPerPage.toString()}
                onValueChange={(value) => {
                  setItemsPerPage(Number(value));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-muted-foreground">
                of {filteredCustomers.length} customer{filteredCustomers.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages || 1}
              </span>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="h-8 w-8 p-0"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <ChevronLeft className="h-4 w-4 -ml-3" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="h-8 w-8 p-0"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8 p-0"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8 p-0"
                >
                  <ChevronRight className="h-4 w-4" />
                  <ChevronRight className="h-4 w-4 -ml-3" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PartnerCustomers;


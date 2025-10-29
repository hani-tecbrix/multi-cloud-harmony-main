import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Building2, ArrowLeft, DollarSign, Clock, CheckCircle, AlertCircle, Cloud, Mail, X, Sparkles, Hash } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

const customersData = [
  { 
    id: 1,
    customerId: "CUST-AWS-001234",
    name: "Acme Corporation",
    email: "admin@acme.com",
    cloudProvider: "AWS",
    industry: "Technology", 
    subscriptions: 12, 
    monthlySpend: 45280, 
    status: "active",
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
    customerId: "CUST-AWS-002845",
    name: "TechStart Inc",
    email: "contact@techstart.io",
    cloudProvider: "AWS",
    industry: "Startup", 
    subscriptions: 8, 
    monthlySpend: 28500, 
    status: "active",
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
      { provider: "GitHub", service: "Enterprise", type: "License", cost: 8000 },
    ]
  },
  { 
    id: 3,
    customerId: "CUST-AZURE-003921",
    name: "DataFlow Ltd",
    email: "admin@dataflow.com",
    cloudProvider: "Azure",
    industry: "Finance", 
    subscriptions: 15, 
    monthlySpend: 62100, 
    status: "active",
    billingInfo: {
      currentBalance: 62100,
      lastPayment: 62100,
      lastPaymentDate: "2025-01-10",
      paymentStatus: "paid",
      outstandingBalance: 0,
      overdue: false,
    },
    subscriptionDetails: [
      { provider: "AWS", service: "RDS", type: "Consumption", cost: 22000 },
      { provider: "Azure", service: "Active Directory", type: "License", cost: 18500 },
      { provider: "Snowflake", service: "Enterprise", type: "Consumption", cost: 21600 },
    ]
  },
  { 
    id: 4,
    customerId: "CUST-GCP-004567",
    name: "CloudNet Solutions",
    email: "admin@cloudnet.com",
    cloudProvider: "GCP",
    industry: "Healthcare", 
    subscriptions: 10, 
    monthlySpend: 38900, 
    status: "active",
    billingInfo: {
      currentBalance: 77800,
      lastPayment: 38900,
      lastPaymentDate: "2024-12-15",
      paymentStatus: "pending",
      outstandingBalance: 38900,
      overdue: true,
    },
    subscriptionDetails: [
      { provider: "GCP", service: "Compute Engine", type: "Consumption", cost: 16400 },
      { provider: "Microsoft 365", service: "E5", type: "License", cost: 14500 },
      { provider: "Zoom", service: "Enterprise", type: "License", cost: 8000 },
    ]
  },
  { 
    id: 5,
    customerId: "CUST-AZURE-005892",
    name: "Digital Dynamics",
    email: "admin@digitaldynamics.com",
    cloudProvider: "Azure",
    industry: "Retail", 
    subscriptions: 6, 
    monthlySpend: 19800, 
    status: "active",
    billingInfo: {
      currentBalance: 19800,
      lastPayment: 19800,
      lastPaymentDate: "2025-01-12",
      paymentStatus: "paid",
      outstandingBalance: 0,
      overdue: false,
    },
    subscriptionDetails: [
      { provider: "AWS", service: "S3", type: "Consumption", cost: 7800 },
      { provider: "Shopify", service: "Plus", type: "License", cost: 12000 },
    ]
  },
];

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<typeof customersData[0] | null>(null);
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // Add customer form state
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    cloudProvider: "AWS",
    industry: "",
  });

  const filteredCustomers = customersData.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCustomer = () => {
    if (!newCustomer.name || !newCustomer.email || !newCustomer.cloudProvider) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Generate customer ID based on cloud provider
    const customerId = `CUST-${newCustomer.cloudProvider.toUpperCase()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

    toast.success("Customer added successfully!", {
      description: `${newCustomer.name} (${customerId}) has been added to ${newCustomer.cloudProvider}.`
    });
    
    setIsAddSheetOpen(false);
    setNewCustomer({
      name: "",
      email: "",
      cloudProvider: "AWS",
      industry: "",
    });
  };

  const handleCloseSheet = () => {
    setIsAddSheetOpen(false);
    setNewCustomer({
      name: "",
      email: "",
      cloudProvider: "AWS",
      industry: "",
    });
  };

  const getCloudProviderColor = (provider: string) => {
    switch (provider) {
      case 'AWS': return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
      case 'Azure': return 'bg-teal-500/10 text-teal-600 border-teal-500/20';
      case 'GCP': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
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
              <Badge variant="outline" className="font-mono text-xs">
                <Hash className="h-3 w-3 mr-1" />
                {selectedCustomer.customerId}
              </Badge>
              <Badge variant="outline" className={getCloudProviderColor(selectedCustomer.cloudProvider)}>
                <Cloud className="h-3 w-3 mr-1" />
                {selectedCustomer.cloudProvider}
              </Badge>
              <p className="text-sm text-muted-foreground">{selectedCustomer.industry}</p>
            </div>
          </div>
          <Button size="sm" variant="gradient" onClick={() => {
            toast.success(`Add new subscription for ${selectedCustomer.name}`);
          }}>
            <Plus className="h-4 w-4 mr-1" />
            Add Subscription
          </Button>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">Total Subscriptions</p>
              <p className="text-2xl font-semibold">{selectedCustomer.subscriptions}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">Monthly Spend</p>
              <p className="text-2xl font-semibold">${selectedCustomer.monthlySpend.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">Status</p>
              <Badge variant="secondary" className="bg-success/10 text-success hover:bg-success/20">
                {selectedCustomer.status}
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Billing Information Section */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium">Billing Information & Balance Sheet</CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  toast.success(`Sending payment reminder to ${selectedCustomer.name}`);
                }}
              >
                Send Payment Reminder
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Current Balance</span>
                  </div>
                  <span className="text-sm font-medium">
                    ${selectedCustomer.billingInfo.currentBalance.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {selectedCustomer.billingInfo.paymentStatus === 'paid' ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <Clock className="h-4 w-4 text-orange-600" />
                    )}
                    <span className="text-sm text-muted-foreground">Payment Status</span>
                  </div>
                  <Badge 
                    variant={selectedCustomer.billingInfo.paymentStatus === 'paid' ? 'secondary' : 'destructive'}
                    className={selectedCustomer.billingInfo.paymentStatus === 'paid' 
                      ? 'bg-success/10 text-success' 
                      : 'bg-destructive/10 text-destructive'
                    }
                  >
                    {selectedCustomer.billingInfo.paymentStatus.toUpperCase()}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {selectedCustomer.billingInfo.overdue ? (
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    ) : (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    )}
                    <span className="text-sm text-muted-foreground">Overdue</span>
                  </div>
                  <span className={`text-sm font-medium ${selectedCustomer.billingInfo.overdue ? 'text-destructive' : 'text-success'}`}>
                    {selectedCustomer.billingInfo.overdue ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Outstanding Balance</span>
                  <span className={`text-sm font-medium ${selectedCustomer.billingInfo.outstandingBalance > 0 ? 'text-destructive' : ''}`}>
                    ${selectedCustomer.billingInfo.outstandingBalance.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Last Payment</span>
                  <span className="text-sm font-medium">
                    ${selectedCustomer.billingInfo.lastPayment.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Last Payment Date</span>
                  <span className="text-sm font-medium">
                    {new Date(selectedCustomer.billingInfo.lastPaymentDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium">Subscription Overview</CardTitle>
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
                    <TableCell className="font-medium text-sm">{sub.provider}</TableCell>
                    <TableCell className="text-sm">{sub.service}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-xs">
                        {sub.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-sm font-medium">
                      ${sub.cost.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Balance Sheet Summary */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium">Balance Sheet Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold mb-3">Assets</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Total Monthly Revenue</span>
                    <span className="font-medium">${selectedCustomer.monthlySpend.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Received Payments</span>
                    <span className="font-medium text-green-600">
                      ${selectedCustomer.billingInfo.lastPayment.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-semibold mb-3">Liabilities</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Outstanding Balance</span>
                    <span className={`font-medium ${selectedCustomer.billingInfo.outstandingBalance > 0 ? 'text-destructive' : ''}`}>
                      ${selectedCustomer.billingInfo.outstandingBalance.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Net Balance</span>
                    <span className={`font-bold ${
                      selectedCustomer.billingInfo.outstandingBalance > 0 
                        ? 'text-destructive' 
                        : 'text-green-600'
                    }`}>
                      ${(selectedCustomer.billingInfo.currentBalance - selectedCustomer.billingInfo.outstandingBalance).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">Payment Status</span>
                <div className="flex items-center gap-2">
                  {selectedCustomer.billingInfo.paymentStatus === 'paid' ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <Badge variant="secondary" className="bg-success/10 text-success">
                        All Payments Received
                      </Badge>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-4 w-4 text-destructive" />
                      <Badge variant="destructive" className="bg-destructive/10 text-destructive">
                        {selectedCustomer.billingInfo.overdue ? 'Payment Overdue' : 'Payment Pending'}
                      </Badge>
                    </>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Customer Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your customers and their subscriptions</p>
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
                    Add a company customer with cloud provider details
                  </SheetDescription>
                </div>
              </div>
            </SheetHeader>
            
            <ScrollArea ref={scrollAreaRef} className="flex-1 px-6">
              <div className="space-y-6 py-6">
                {/* Basic Information Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="h-px flex-1 bg-border" />
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Customer Information
                    </span>
                    <div className="h-px flex-1 bg-border" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customer-name" className="text-sm font-medium">
                      Company Name
                      <span className="text-destructive ml-1">*</span>
                    </Label>
                    <Input
                      id="customer-name"
                      placeholder="e.g., Acme Corporation"
                      value={newCustomer.name}
                      onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customer-email" className="text-sm font-medium">
                      Company Email
                      <span className="text-destructive ml-1">*</span>
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="customer-email"
                        type="email"
                        placeholder="admin@company.com"
                        value={newCustomer.email}
                        onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                        className="h-11 pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customer-industry" className="text-sm font-medium">
                      Industry
                    </Label>
                    <Input
                      id="customer-industry"
                      placeholder="e.g., Technology, Healthcare, Finance"
                      value={newCustomer.industry}
                      onChange={(e) => setNewCustomer({...newCustomer, industry: e.target.value})}
                      className="h-11"
                    />
                  </div>
                </div>

                {/* Cloud Provider Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="h-px flex-1 bg-border" />
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Cloud Provider
                    </span>
                    <div className="h-px flex-1 bg-border" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cloud-provider" className="text-sm font-medium">
                      Primary Cloud Provider
                      <span className="text-destructive ml-1">*</span>
                    </Label>
                    <Select
                      value={newCustomer.cloudProvider}
                      onValueChange={(value) => setNewCustomer({...newCustomer, cloudProvider: value})}
                    >
                      <SelectTrigger id="cloud-provider" className="h-11">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AWS">
                          <div className="flex items-center gap-2">
                            <Cloud className="h-4 w-4 text-orange-600" />
                            <span>Amazon Web Services (AWS)</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="Azure">
                          <div className="flex items-center gap-2">
                            <Cloud className="h-4 w-4 text-blue-600" />
                            <span>Microsoft Azure</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="GCP">
                          <div className="flex items-center gap-2">
                            <Cloud className="h-4 w-4 text-green-600" />
                            <span>Google Cloud Platform (GCP)</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Select the primary cloud provider for this customer
                    </p>
                  </div>
                </div>
              </div>
            </ScrollArea>

            <SheetFooter className="px-6 py-4 border-t bg-muted/30">
              <div className="flex items-center gap-3 w-full">
                <Button 
                  variant="outline" 
                  onClick={handleCloseSheet}
                  className="flex-1"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button 
                  variant="gradient" 
                  onClick={handleAddCustomer}
                  className="flex-1"
                  disabled={!newCustomer.name || !newCustomer.email || !newCustomer.cloudProvider}
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
              {filteredCustomers.map((customer) => (
                <TableRow 
                  key={customer.id} 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => setSelectedCustomer(customer)}
                >
                  <TableCell>
                    <span className="font-mono text-xs text-muted-foreground">
                      {customer.customerId}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded bg-muted">
                        <Building2 className="h-4 w-4" />
                      </div>
                      <span className="font-medium text-sm">{customer.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getCloudProviderColor(customer.cloudProvider)}>
                      <Cloud className="h-3 w-3 mr-1" />
                      {customer.cloudProvider}
                    </Badge>
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
      </Card>
    </div>
  );
};

export default Customers;

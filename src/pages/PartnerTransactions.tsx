import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionCard } from "@/components/SectionCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  ChevronDown, 
  Download, 
  Eye, 
  FileText,
  ShoppingBag,
  Calendar,
  ArrowLeft,
  Filter,
  Receipt
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Combined transactions data (orders + invoices)
const transactionsData = [
  // Orders
  {
    id: "ORD-2024-001",
    type: "order",
    year: "2024",
    billingPeriod: "2024-10",
    publisher: "AWS",
    provisionType: "Subscription",
    invoiceProfile: "Default Profile",
    orderNumber: "ORD-2024-001",
    total: 2500.00,
    status: "completed",
    date: "2024-10-25",
    customer: "Acme Corp"
  },
  {
    id: "ORD-2024-002",
    type: "order",
    year: "2024",
    billingPeriod: "2024-10",
    publisher: "Azure",
    provisionType: "Subscription",
    invoiceProfile: "Enterprise Profile",
    orderNumber: "ORD-2024-002",
    total: 1800.00,
    status: "completed",
    date: "2024-10-24",
    customer: "TechStart Ltd"
  },
  {
    id: "ORD-2024-003",
    type: "order",
    year: "2024",
    billingPeriod: "2024-10",
    publisher: "GCP",
    provisionType: "Usage-Based",
    invoiceProfile: "Default Profile",
    orderNumber: "ORD-2024-003",
    total: 3200.00,
    status: "processing",
    date: "2024-10-23",
    customer: "Innovation Hub"
  },
  // Invoices
  {
    id: "INV-2024-001",
    type: "invoice",
    year: "2024",
    billingPeriod: "2024-10",
    publisher: "AWS",
    provisionType: "Subscription",
    invoiceProfile: "Default Profile",
    orderNumber: "ORD-2024-001",
    total: 2500.00,
    status: "paid",
    date: "2024-10-26",
    customer: "Acme Corp",
    invoiceNumber: "INV-2024-001",
    dueDate: "2024-11-25"
  },
  {
    id: "INV-2024-002",
    type: "invoice",
    year: "2024",
    billingPeriod: "2024-10",
    publisher: "Azure",
    provisionType: "Subscription",
    invoiceProfile: "Enterprise Profile",
    orderNumber: "ORD-2024-002",
    total: 1800.00,
    status: "pending",
    date: "2024-10-25",
    customer: "TechStart Ltd",
    invoiceNumber: "INV-2024-002",
    dueDate: "2024-11-24"
  },
  {
    id: "INV-2024-003",
    type: "invoice",
    year: "2024",
    billingPeriod: "2024-09",
    publisher: "GCP",
    provisionType: "Usage-Based",
    invoiceProfile: "Default Profile",
    orderNumber: "ORD-2024-020",
    total: 2900.00,
    status: "paid",
    date: "2024-09-28",
    customer: "Innovation Hub",
    invoiceNumber: "INV-2024-003",
    dueDate: "2024-10-28"
  },
  {
    id: "ORD-2024-004",
    type: "order",
    year: "2024",
    billingPeriod: "2024-09",
    publisher: "AWS",
    provisionType: "Subscription",
    invoiceProfile: "Default Profile",
    orderNumber: "ORD-2024-004",
    total: 1500.00,
    status: "completed",
    date: "2024-09-20",
    customer: "Digital Dynamics"
  },
  {
    id: "INV-2024-004",
    type: "invoice",
    year: "2024",
    billingPeriod: "2024-09",
    publisher: "AWS",
    provisionType: "Subscription",
    invoiceProfile: "Default Profile",
    orderNumber: "ORD-2024-004",
    total: 1500.00,
    status: "paid",
    date: "2024-09-22",
    customer: "Digital Dynamics",
    invoiceNumber: "INV-2024-004",
    dueDate: "2024-10-22"
  },
  {
    id: "ORD-2024-005",
    type: "order",
    year: "2024",
    billingPeriod: "2024-08",
    publisher: "Azure",
    provisionType: "Subscription",
    invoiceProfile: "Enterprise Profile",
    orderNumber: "ORD-2024-005",
    total: 2100.00,
    status: "completed",
    date: "2024-08-15",
    customer: "NextGen Tech"
  },
  {
    id: "INV-2024-005",
    type: "invoice",
    year: "2024",
    billingPeriod: "2024-08",
    publisher: "Azure",
    provisionType: "Subscription",
    invoiceProfile: "Enterprise Profile",
    orderNumber: "ORD-2024-005",
    total: 2100.00,
    status: "overdue",
    date: "2024-08-17",
    customer: "NextGen Tech",
    invoiceNumber: "INV-2024-005",
    dueDate: "2024-09-17"
  }
];

const PartnerTransactions = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [yearFilter, setYearFilter] = useState("all");
  const [billingPeriodFilter, setBillingPeriodFilter] = useState("all");
  const [publisherFilter, setPublisherFilter] = useState("all");
  const [provisionTypeFilter, setProvisionTypeFilter] = useState("all");
  const [invoiceProfileFilter, setInvoiceProfileFilter] = useState("all");
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  // Get unique filter values
  const uniqueYears = useMemo(() => {
    const years = [...new Set(transactionsData.map(t => t.year))];
    return years.sort().reverse();
  }, []);

  const uniqueBillingPeriods = useMemo(() => {
    const periods = [...new Set(transactionsData.map(t => t.billingPeriod))];
    return periods.sort().reverse();
  }, []);

  const uniquePublishers = useMemo(() => {
    return [...new Set(transactionsData.map(t => t.publisher))].sort();
  }, []);

  const uniqueProvisionTypes = useMemo(() => {
    return [...new Set(transactionsData.map(t => t.provisionType))].sort();
  }, []);

  const uniqueInvoiceProfiles = useMemo(() => {
    return [...new Set(transactionsData.map(t => t.invoiceProfile))].sort();
  }, []);

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    return transactionsData.filter(transaction => {
      const matchesSearch = 
        transaction.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (transaction.type === "invoice" && transaction.invoiceNumber?.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesYear = yearFilter === "all" || transaction.year === yearFilter;
      const matchesBillingPeriod = billingPeriodFilter === "all" || transaction.billingPeriod === billingPeriodFilter;
      const matchesPublisher = publisherFilter === "all" || transaction.publisher === publisherFilter;
      const matchesProvisionType = provisionTypeFilter === "all" || transaction.provisionType === provisionTypeFilter;
      const matchesInvoiceProfile = invoiceProfileFilter === "all" || transaction.invoiceProfile === invoiceProfileFilter;

      return matchesSearch && matchesYear && matchesBillingPeriod && matchesPublisher && matchesProvisionType && matchesInvoiceProfile;
    });
  }, [searchTerm, yearFilter, billingPeriodFilter, publisherFilter, provisionTypeFilter, invoiceProfileFilter]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
      case "paid":
        return <Badge variant="outline" className="bg-success/10 text-success border-success/20">Paid</Badge>;
      case "processing":
      case "pending":
        return <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">Pending</Badge>;
      case "overdue":
        return <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (selectedTransaction) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setSelectedTransaction(null)}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Transactions
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  {selectedTransaction.type === "invoice" ? (
                    <FileText className="h-5 w-5 text-primary" />
                  ) : (
                    <ShoppingBag className="h-5 w-5 text-primary" />
                  )}
                  {selectedTransaction.type === "invoice" ? "Invoice" : "Order"} {selectedTransaction.id}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedTransaction.customer} • {new Date(selectedTransaction.date).toLocaleDateString()}
                </p>
              </div>
              {getStatusBadge(selectedTransaction.status)}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Year</p>
                <p className="font-medium">{selectedTransaction.year}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Billing Period</p>
                <p className="font-medium">{selectedTransaction.billingPeriod}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Publisher</p>
                <p className="font-medium">{selectedTransaction.publisher}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="font-medium text-lg">${selectedTransaction.total.toLocaleString()}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Provision Type</p>
                <p className="font-medium">{selectedTransaction.provisionType}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Invoice Profile</p>
                <p className="font-medium">{selectedTransaction.invoiceProfile}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Order Number</p>
                <p className="font-medium">{selectedTransaction.orderNumber}</p>
              </div>
              {selectedTransaction.type === "invoice" && (
                <>
                  <div>
                    <p className="text-sm text-muted-foreground">Invoice Number</p>
                    <p className="font-medium">{selectedTransaction.invoiceNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Due Date</p>
                    <p className="font-medium">{selectedTransaction.dueDate ? new Date(selectedTransaction.dueDate).toLocaleDateString() : "N/A"}</p>
                  </div>
                </>
              )}
            </div>

            <div className="flex gap-3 pt-4 border-t">
              {selectedTransaction.type === "invoice" && (
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Invoice
                </Button>
              )}
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold">Billing Statements</h1>
          <p className="text-sm text-muted-foreground mt-1">
            View all orders and invoices in one place
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search Billing Statements"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <Select value={yearFilter} onValueChange={setYearFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Year" />
                <ChevronDown className="h-4 w-4 ml-auto text-muted-foreground" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {uniqueYears.map(year => (
                  <SelectItem key={year} value={year}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={billingPeriodFilter} onValueChange={setBillingPeriodFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Billing Period" />
                <ChevronDown className="h-4 w-4 ml-auto text-muted-foreground" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Periods</SelectItem>
                {uniqueBillingPeriods.map(period => (
                  <SelectItem key={period} value={period}>{period}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={publisherFilter} onValueChange={setPublisherFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Publisher" />
                <ChevronDown className="h-4 w-4 ml-auto text-muted-foreground" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Publishers</SelectItem>
                {uniquePublishers.map(publisher => (
                  <SelectItem key={publisher} value={publisher}>{publisher}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={provisionTypeFilter} onValueChange={setProvisionTypeFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Provision Type" />
                <ChevronDown className="h-4 w-4 ml-auto text-muted-foreground" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {uniqueProvisionTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={invoiceProfileFilter} onValueChange={setInvoiceProfileFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Invoice Profile" />
                <ChevronDown className="h-4 w-4 ml-auto text-muted-foreground" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Profiles</SelectItem>
                {uniqueInvoiceProfiles.map(profile => (
                  <SelectItem key={profile} value={profile}>{profile}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <SectionCard
        title={`Transactions (${filteredTransactions.length})`}
        icon={Receipt}
        badge={
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Receipt className="h-4 w-4" />
            <span>Total: ${filteredTransactions.reduce((sum, t) => sum + t.total, 0).toLocaleString()}</span>
          </div>
        }
      >
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Receipt className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="font-medium">No transactions found</p>
              <p className="text-sm mt-1">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Year</TableHead>
                    <TableHead>Billing Period</TableHead>
                    <TableHead>Publisher</TableHead>
                    <TableHead>Provision Type</TableHead>
                    <TableHead>Invoice Profile</TableHead>
                    <TableHead>Order Number</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow 
                      key={transaction.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => setSelectedTransaction(transaction)}
                    >
                      <TableCell>{transaction.year}</TableCell>
                      <TableCell>{transaction.billingPeriod}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {transaction.publisher}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{transaction.provisionType}</TableCell>
                      <TableCell className="text-sm">{transaction.invoiceProfile}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs">{transaction.orderNumber}</span>
                          {transaction.type === "invoice" && (
                            <Badge variant="secondary" className="text-xs">
                              <FileText className="h-3 w-3 mr-1" />
                              Invoice
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        ${transaction.total.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          {getStatusBadge(transaction.status)}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedTransaction(transaction);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
      </SectionCard>
    </div>
  );
};

export default PartnerTransactions;


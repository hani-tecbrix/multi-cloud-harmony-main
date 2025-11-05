import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { 
  Download, 
  FileText, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Calendar,
  BarChart3,
  PieChart,
  LineChart,
  Plus,
  Save,
  Clock,
  Eye,
  FileSpreadsheet,
  FileType,
  Sparkles,
  Briefcase,
  ShoppingBag,
  CreditCard,
  Activity,
  PlayCircle,
  Bookmark,
  Search,
  X,
  Filter
} from "lucide-react";
import { useUserRole } from "@/contexts/UserRoleContext";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart as RechartsLineChart, Line, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { downloadReportPDF, downloadReportCSV, downloadReportExcel, downloadConsumptionReport } from "@/lib/downloadUtils";

// Report Templates Configuration
const reportTemplates = {
  admin: [
    {
      id: "partner-performance",
      title: "Partner Performance Report",
      description: "Comprehensive analysis of partner performance metrics",
      icon: Briefcase,
      category: "Performance",
      metrics: ["Revenue", "Customers", "Orders", "Commission"],
      defaultPeriod: "last30days"
    },
    {
      id: "revenue-analysis",
      title: "Revenue Analysis",
      description: "Detailed revenue breakdown by partners and services",
      icon: DollarSign,
      category: "Financial",
      metrics: ["Total Revenue", "Commission", "Growth Rate"],
      defaultPeriod: "last30days"
    },
    {
      id: "customer-acquisition",
      title: "Customer Acquisition",
      description: "Track new customer acquisition trends",
      icon: Users,
      category: "Growth",
      metrics: ["New Customers", "Acquisition Rate", "Churn Rate"],
      defaultPeriod: "last30days"
    },
    {
      id: "top-partners",
      title: "Top Partners Report",
      description: "Identify top performing partners",
      icon: TrendingUp,
      category: "Performance",
      metrics: ["Revenue Ranking", "Customer Count", "Tier Analysis"],
      defaultPeriod: "last30days"
    },
    {
      id: "commission-report",
      title: "Commission Report",
      description: "Detailed commission breakdown and analysis",
      icon: CreditCard,
      category: "Financial",
      metrics: ["Total Commission", "By Partner", "By Period"],
      defaultPeriod: "last30days"
    },
    {
      id: "partner-tier-analysis",
      title: "Partner Tier Analysis",
      description: "Analysis of partner distribution by tier",
      icon: BarChart3,
      category: "Analysis",
      metrics: ["Tier Distribution", "Upgrade Path", "Retention"],
      defaultPeriod: "last30days"
    },
    {
      id: "consumption-report",
      title: "Consumption Report",
      description: "Platform-wide cloud resource consumption and billing analysis",
      icon: Activity,
      category: "Usage",
      metrics: ["Total Consumption", "By Partner", "By Service", "Cost Breakdown"],
      defaultPeriod: "last30days"
    }
  ],
  partner: [
    {
      id: "customer-report",
      title: "Customer Report",
      description: "Comprehensive customer metrics and insights",
      icon: Users,
      category: "Customers",
      metrics: ["Total Customers", "Active Customers", "MRR"],
      defaultPeriod: "last30days"
    },
    {
      id: "revenue-report",
      title: "Revenue Report",
      description: "Revenue breakdown by customer and service",
      icon: DollarSign,
      category: "Financial",
      metrics: ["Total Revenue", "By Customer", "By Service"],
      defaultPeriod: "last30days"
    },
    {
      id: "order-history",
      title: "Order History Report",
      description: "Detailed order history and trends",
      icon: ShoppingBag,
      category: "Orders",
      metrics: ["Total Orders", "Order Value", "Status Breakdown"],
      defaultPeriod: "last30days"
    },
    {
      id: "commission-earned",
      title: "Commission Earned",
      description: "Track commission earnings and trends",
      icon: CreditCard,
      category: "Financial",
      metrics: ["Total Commission", "By Period", "By Customer"],
      defaultPeriod: "last30days"
    },
    {
      id: "customer-acquisition",
      title: "Customer Acquisition",
      description: "New customer acquisition trends",
      icon: TrendingUp,
      category: "Growth",
      metrics: ["New Customers", "Acquisition Rate"],
      defaultPeriod: "last30days"
    },
    {
      id: "service-performance",
      title: "Service Performance",
      description: "Performance analysis by service/product",
      icon: Activity,
      category: "Performance",
      metrics: ["Top Services", "Revenue by Service", "Usage Trends"],
      defaultPeriod: "last30days"
    },
    {
      id: "consumption-report",
      title: "Consumption Report",
      description: "Detailed customer cloud resource consumption and billing",
      icon: Activity,
      category: "Usage",
      metrics: ["Total Consumption", "By Customer", "By Service", "Cost Analysis"],
      defaultPeriod: "last30days"
    }
  ],
  customer: [
    {
      id: "usage-report",
      title: "Usage Report",
      description: "Detailed usage metrics and consumption",
      icon: Activity,
      category: "Usage",
      metrics: ["Total Usage", "By Service", "Trends"],
      defaultPeriod: "last30days"
    },
    {
      id: "billing-report",
      title: "Billing Report",
      description: "Comprehensive billing and invoice history",
      icon: CreditCard,
      category: "Billing",
      metrics: ["Total Billed", "By Service", "Payment Status"],
      defaultPeriod: "last30days"
    },
    {
      id: "subscription-report",
      title: "Subscription Report",
      description: "Active subscriptions and service breakdown",
      icon: FileText,
      category: "Subscriptions",
      metrics: ["Active Subscriptions", "By Provider", "Cost Breakdown"],
      defaultPeriod: "last30days"
    },
    {
      id: "cost-analysis",
      title: "Cost Analysis",
      description: "Detailed cost breakdown and optimization insights",
      icon: DollarSign,
      category: "Financial",
      metrics: ["Total Cost", "By Service", "Trends"],
      defaultPeriod: "last30days"
    },
    {
      id: "usage-trends",
      title: "Usage Trends",
      description: "Usage patterns and trends over time",
      icon: TrendingUp,
      category: "Usage",
      metrics: ["Usage Trends", "Peak Usage", "Forecast"],
      defaultPeriod: "last30days"
    },
    {
      id: "consumption-report",
      title: "Consumption Report",
      description: "Detailed cloud resource consumption and billing analysis",
      icon: Activity,
      category: "Usage",
      metrics: ["Total Consumption", "By Service", "By Provider", "Cost Breakdown"],
      defaultPeriod: "last30days"
    }
  ]
};

// Mock data for reports
const generateMockData = (reportType: string, period: string) => {
  // Generate consumption report data
  if (reportType === "consumption-report") {
    return {
      summary: {
        total: 125000,
        change: 8.3,
        period: period,
        totalConsumption: "2,450,000 GB",
        totalCost: 125000
      },
      chartData: [
        { name: "AWS", value: 45000, consumption: "850,000 GB" },
        { name: "Azure", value: 38000, consumption: "720,000 GB" },
        { name: "GCP", value: 25000, consumption: "580,000 GB" },
        { name: "Other", value: 17000, consumption: "300,000 GB" },
      ],
      tableData: [
        { 
          provider: "AWS", 
          service: "EC2", 
          consumption: "450,000 GB", 
          cost: 22500, 
          unitCost: "$0.05/GB",
          status: "active" 
        },
        { 
          provider: "AWS", 
          service: "S3", 
          consumption: "280,000 GB", 
          cost: 14000, 
          unitCost: "$0.05/GB",
          status: "active" 
        },
        { 
          provider: "AWS", 
          service: "Lambda", 
          consumption: "120,000 GB", 
          cost: 8500, 
          unitCost: "$0.071/GB",
          status: "active" 
        },
        { 
          provider: "Azure", 
          service: "Virtual Machines", 
          consumption: "320,000 GB", 
          cost: 19200, 
          unitCost: "$0.06/GB",
          status: "active" 
        },
        { 
          provider: "Azure", 
          service: "Blob Storage", 
          consumption: "250,000 GB", 
          cost: 12500, 
          unitCost: "$0.05/GB",
          status: "active" 
        },
        { 
          provider: "Azure", 
          service: "App Service", 
          consumption: "150,000 GB", 
          cost: 6300, 
          unitCost: "$0.042/GB",
          status: "active" 
        },
        { 
          provider: "GCP", 
          service: "Compute Engine", 
          consumption: "280,000 GB", 
          cost: 14000, 
          unitCost: "$0.05/GB",
          status: "active" 
        },
        { 
          provider: "GCP", 
          service: "Cloud Storage", 
          consumption: "200,000 GB", 
          cost: 8000, 
          unitCost: "$0.04/GB",
          status: "active" 
        },
        { 
          provider: "GCP", 
          service: "Cloud Functions", 
          consumption: "100,000 GB", 
          cost: 3000, 
          unitCost: "$0.03/GB",
          status: "active" 
        },
      ]
    };
  }
  
  // Sample data generation logic for other reports
  return {
    summary: {
      total: 145000,
      change: 12.5,
      period: period
    },
    chartData: [
      { name: "Week 1", value: 12000 },
      { name: "Week 2", value: 15000 },
      { name: "Week 3", value: 18000 },
      { name: "Week 4", value: 14500 },
    ],
    tableData: [
      { id: "1", name: "Item 1", value: 5000, status: "active" },
      { id: "2", name: "Item 2", value: 3500, status: "active" },
      { id: "3", name: "Item 3", value: 2800, status: "pending" },
    ]
  };
};

const Reports = () => {
  const { user, isAdmin, isPartner, isCustomer } = useUserRole();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [reportBuilderOpen, setReportBuilderOpen] = useState(false);
  const [savedReportsOpen, setSavedReportsOpen] = useState(false);
  const [scheduleReportOpen, setScheduleReportOpen] = useState(false);
  const [previewReportOpen, setPreviewReportOpen] = useState(false);
  const [reportData, setReportData] = useState<any>(null);
  
  // Report Builder State
  const [reportName, setReportName] = useState("");
  const [reportDescription, setReportDescription] = useState("");
  const [dateRange, setDateRange] = useState("last30days");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [visualizationType, setVisualizationType] = useState<"table" | "chart" | "both">("both");
  const [chartType, setChartType] = useState<"line" | "bar" | "pie">("bar");
  const [filters, setFilters] = useState<any>({});
  const [exportFormat, setExportFormat] = useState<"pdf" | "excel" | "csv">("pdf");
  
  // Saved Reports
  const [savedReports, setSavedReports] = useState<any[]>([]);
  
  // Search and filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  // Get role-specific templates
  const templates = user 
    ? (isAdmin ? reportTemplates.admin : isPartner ? reportTemplates.partner : reportTemplates.customer)
    : [];

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setReportName(template.title);
      setReportDescription(template.description);
      setSelectedMetrics(template.metrics);
      setDateRange(template.defaultPeriod);
      setReportBuilderOpen(true);
    }
  };

  const handleGenerateReport = () => {
    // Generate mock report data
    const data = generateMockData(selectedTemplate || "", dateRange);
    setReportData(data);
    setReportBuilderOpen(false);
    setPreviewReportOpen(true);
    toast.success("Report generated successfully!");
  };

  const handleSaveReport = () => {
    const reportConfig = {
      id: Date.now().toString(),
      name: reportName,
      description: reportDescription,
      template: selectedTemplate,
      dateRange,
      metrics: selectedMetrics,
      visualizationType,
      chartType,
      filters,
      createdAt: new Date().toISOString()
    };
    setSavedReports([...savedReports, reportConfig]);
    toast.success("Report saved successfully!");
    setReportBuilderOpen(false);
  };

  const handleExportReport = (format: "pdf" | "excel" | "csv") => {
    if (!reportData) return;
    
    toast.success(`Exporting report as ${format.toUpperCase()}...`);
    
    try {
      if (selectedTemplate === "consumption-report") {
        // Export consumption report
        const filename = `${reportName || "Consumption-Report"}-${new Date().toISOString().split('T')[0]}`;
        downloadConsumptionReport(reportData.tableData, filename, format);
      } else {
        // Export regular report
        const filename = `${reportName || "Report"}-${new Date().toISOString().split('T')[0]}`;
        if (format === "pdf") {
          downloadReportPDF(reportData, reportName || "Report");
        } else if (format === "csv") {
          downloadReportCSV(reportData.tableData, filename);
        } else if (format === "excel") {
          downloadReportExcel(reportData.tableData, filename);
        }
      }
      toast.success(`Report exported as ${format.toUpperCase()} successfully!`);
    } catch (error) {
      toast.error("Failed to export report. Please try again.");
      console.error("Export error:", error);
    }
  };

  const handleScheduleReport = () => {
    toast.success("Report scheduled successfully!");
    setScheduleReportOpen(false);
  };

  const categories = Array.from(new Set(templates.map(t => t.category)));
  
  // Filter templates based on search and category
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = searchTerm === "" || 
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.metrics.some(m => m.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Reports & Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {isAdmin && "Generate comprehensive reports for partners, revenue, and performance"}
            {isPartner && "Create detailed reports for customers, orders, and commissions"}
            {isCustomer && "View usage, billing, and subscription reports"}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button 
            variant="outline" 
            onClick={() => setSavedReportsOpen(true)}
            className="gap-2"
          >
            <Bookmark className="h-4 w-4" />
            Saved Reports ({savedReports.length})
          </Button>
          <Button 
            onClick={() => {
              setSelectedTemplate(null);
              setReportName("");
              setReportDescription("");
              setSelectedMetrics([]);
              setReportBuilderOpen(true);
            }}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Create Custom Report
          </Button>
        </div>
      </div>

      {/* Report Templates */}
      <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedCategory}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <TabsList className="flex-wrap">
            <TabsTrigger value="all">All Templates</TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative flex-1 md:flex-initial">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search templates..."
                className="pl-9 w-full md:w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>

        <TabsContent value="all" className="mt-4">
          {filteredTemplates.length === 0 ? (
            <div className="text-center py-12">
              <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No templates found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {filteredTemplates.map((template) => {
              const IconComponent = template.icon;
              return (
                <Card 
                  key={template.id}
                  className="border border-border/50 hover:border-border hover:shadow-sm transition-all duration-200 cursor-pointer group bg-card"
                  onClick={() => handleTemplateSelect(template.id)}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <IconComponent className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0 group-hover:text-foreground transition-colors" />
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-sm font-medium mb-1 leading-tight">
                          {template.title}
                        </CardTitle>
                        <CardDescription className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                          {template.description}
                        </CardDescription>
                        <div className="mt-3 pt-3 border-t border-border/50">
                          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                            {template.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            </div>
          )}
        </TabsContent>

        {categories.map((category) => (
          <TabsContent key={category} value={category} className="mt-4">
            {filteredTemplates.filter(t => t.category === category).length === 0 ? (
              <div className="text-center py-12">
                <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No templates found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {filteredTemplates
                  .filter(t => t.category === category)
                  .map((template) => {
                  const IconComponent = template.icon;
                  return (
                    <Card 
                      key={template.id}
                      className="border border-border/50 hover:border-border hover:shadow-sm transition-all duration-200 cursor-pointer group bg-card"
                      onClick={() => handleTemplateSelect(template.id)}
                    >
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <IconComponent className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0 group-hover:text-foreground transition-colors" />
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-sm font-medium mb-1 leading-tight">
                              {template.title}
                            </CardTitle>
                            <CardDescription className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                              {template.description}
                            </CardDescription>
                            <div className="mt-3 pt-3 border-t border-border/50">
                              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                                {template.category}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Report Builder Dialog */}
      <Dialog open={reportBuilderOpen} onOpenChange={setReportBuilderOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Sparkles className="h-5 w-5 text-primary" />
              {selectedTemplate ? "Customize Report" : "Create Custom Report"}
            </DialogTitle>
            <DialogDescription>
              Configure your report parameters and visualization options
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Basic Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Basic Information
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="report-name">Report Name *</Label>
                  <Input
                    id="report-name"
                    placeholder="Enter report name"
                    value={reportName}
                    onChange={(e) => setReportName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date-range">Date Range *</Label>
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last7days">Last 7 Days</SelectItem>
                      <SelectItem value="last30days">Last 30 Days</SelectItem>
                      <SelectItem value="last90days">Last 90 Days</SelectItem>
                      <SelectItem value="last6months">Last 6 Months</SelectItem>
                      <SelectItem value="last12months">Last 12 Months</SelectItem>
                      <SelectItem value="thisyear">This Year</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {dateRange === "custom" && (
                <div className="grid gap-4 md:grid-cols-2 animate-in slide-in-from-top-2">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input
                      id="start-date"
                      type="date"
                      value={customStartDate}
                      onChange={(e) => setCustomStartDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-date">End Date</Label>
                    <Input
                      id="end-date"
                      type="date"
                      value={customEndDate}
                      onChange={(e) => setCustomEndDate(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Add a description for this report"
                  value={reportDescription}
                  onChange={(e) => setReportDescription(e.target.value)}
                  rows={3}
                />
              </div>
            </div>

            {/* Metrics Selection */}
            {selectedTemplate && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Select Metrics
                  </span>
                  <div className="h-px flex-1 bg-border" />
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  {templates.find(t => t.id === selectedTemplate)?.metrics.map((metric) => (
                    <div key={metric} className="flex items-center space-x-2">
                      <Checkbox
                        id={`metric-${metric}`}
                        checked={selectedMetrics.includes(metric)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedMetrics([...selectedMetrics, metric]);
                          } else {
                            setSelectedMetrics(selectedMetrics.filter(m => m !== metric));
                          }
                        }}
                      />
                      <Label
                        htmlFor={`metric-${metric}`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {metric}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Visualization Options */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Visualization Options
                </span>
                <div className="h-px flex-1 bg-border" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Display Format</Label>
                  <Select value={visualizationType} onValueChange={(value: any) => setVisualizationType(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="table">Table Only</SelectItem>
                      <SelectItem value="chart">Chart Only</SelectItem>
                      <SelectItem value="both">Table + Chart</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {(visualizationType === "chart" || visualizationType === "both") && (
                  <div className="space-y-2">
                    <Label>Chart Type</Label>
                    <Select value={chartType} onValueChange={(value: any) => setChartType(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bar">
                          <div className="flex items-center gap-2">
                            <BarChart className="h-4 w-4" />
                            Bar Chart
                          </div>
                        </SelectItem>
                        <SelectItem value="line">
                          <div className="flex items-center gap-2">
                            <LineChart className="h-4 w-4" />
                            Line Chart
                          </div>
                        </SelectItem>
                        <SelectItem value="pie">
                          <div className="flex items-center gap-2">
                            <PieChart className="h-4 w-4" />
                            Pie Chart
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </div>

            {/* Export Format */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Export Format
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                <label
                  className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    exportFormat === "pdf"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <FileType className="h-6 w-6 mb-2" />
                  <span className="text-sm font-medium">PDF</span>
                  <span className="text-xs text-muted-foreground">Portable Document</span>
                  <input
                    type="radio"
                    name="export-format"
                    value="pdf"
                    checked={exportFormat === "pdf"}
                    onChange={(e) => setExportFormat(e.target.value as any)}
                    className="sr-only"
                  />
                </label>
                <label
                  className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    exportFormat === "excel"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <FileSpreadsheet className="h-6 w-6 mb-2" />
                  <span className="text-sm font-medium">Excel</span>
                  <span className="text-xs text-muted-foreground">Spreadsheet</span>
                  <input
                    type="radio"
                    name="export-format"
                    value="excel"
                    checked={exportFormat === "excel"}
                    onChange={(e) => setExportFormat(e.target.value as any)}
                    className="sr-only"
                  />
                </label>
                <label
                  className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    exportFormat === "csv"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <FileText className="h-6 w-6 mb-2" />
                  <span className="text-sm font-medium">CSV</span>
                  <span className="text-xs text-muted-foreground">Comma Separated</span>
                  <input
                    type="radio"
                    name="export-format"
                    value="csv"
                    checked={exportFormat === "csv"}
                    onChange={(e) => setExportFormat(e.target.value as any)}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setReportBuilderOpen(false)}>
              Cancel
            </Button>
            <Button variant="outline" onClick={handleSaveReport} className="gap-2" disabled={!reportName}>
              <Save className="h-4 w-4" />
              Save Template
            </Button>
            <Button onClick={handleGenerateReport} disabled={!reportName || selectedMetrics.length === 0} className="gap-2">
              <Eye className="h-4 w-4" />
              Preview Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Report Dialog */}
      <Dialog open={previewReportOpen} onOpenChange={setPreviewReportOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                {reportName || "Report Preview"}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setScheduleReportOpen(true)}
                  className="gap-2"
                >
                  <Clock className="h-4 w-4" />
                  Schedule
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExportReport(exportFormat)}
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  Export {exportFormat.toUpperCase()}
                </Button>
              </div>
            </DialogTitle>
            <DialogDescription>
              Review your report before exporting or scheduling
            </DialogDescription>
          </DialogHeader>

          {reportData && (
            <div className="space-y-6 py-4">
              {/* Summary Cards */}
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {selectedTemplate === "consumption-report" ? "Total Cost" : "Total"}
                        </p>
                        <p className="text-2xl font-bold">
                          {selectedTemplate === "consumption-report" && reportData.summary.totalCost
                            ? `$${reportData.summary.totalCost.toLocaleString()}`
                            : `$${reportData.summary.total?.toLocaleString() || '0'}`
                          }
                        </p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-green-500" />
                    </div>
                    {selectedTemplate === "consumption-report" && reportData.summary.totalConsumption && (
                      <p className="text-xs text-muted-foreground mt-2">
                        {reportData.summary.totalConsumption} total consumption
                      </p>
                    )}
                    {reportData.summary.change !== undefined && (
                      <p className="text-xs text-muted-foreground mt-2">
                        {reportData.summary.change > 0 ? "+" : ""}{reportData.summary.change}% from previous period
                      </p>
                    )}
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {selectedTemplate === "consumption-report" ? "Total Consumption" : "Period"}
                        </p>
                        <p className="text-lg font-semibold">
                          {selectedTemplate === "consumption-report" && reportData.summary.totalConsumption
                            ? reportData.summary.totalConsumption
                            : reportData.summary.period ? reportData.summary.period.replace(/([A-Z])/g, " $1").trim() : "N/A"
                          }
                        </p>
                      </div>
                      <Calendar className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {selectedTemplate === "consumption-report" ? "Services" : "Data Points"}
                        </p>
                        <p className="text-2xl font-bold">{reportData.tableData?.length || 0}</p>
                      </div>
                      <BarChart3 className="h-8 w-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Chart Preview */}
              {(visualizationType === "chart" || visualizationType === "both") && (
                <Card>
                  <CardHeader>
                    <CardTitle>Visualization</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      {chartType === "bar" ? (
                        <BarChart data={reportData.chartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                      ) : chartType === "line" ? (
                        <RechartsLineChart data={reportData.chartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="value" stroke="#8884d8" />
                        </RechartsLineChart>
                      ) : (
                        <RechartsPieChart>
                          <Pie
                            data={reportData.chartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                          >
                            {reportData.chartData.map((entry: any, index: number) => (
                              <Cell key={`cell-${index}`} fill={["#8884d8", "#82ca9d", "#ffc658", "#ff7300"][index % 4]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </RechartsPieChart>
                      )}
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              )}

              {/* Table Preview */}
              {(visualizationType === "table" || visualizationType === "both") && (
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {selectedTemplate === "consumption-report" ? "Consumption Details" : "Data Table"}
                    </CardTitle>
            </CardHeader>
            <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            {selectedTemplate === "consumption-report" ? (
                              <>
                                <TableHead>Provider</TableHead>
                                <TableHead>Service</TableHead>
                                <TableHead className="text-right">Consumption</TableHead>
                                <TableHead className="text-right">Cost</TableHead>
                                <TableHead className="text-right">Unit Cost</TableHead>
                                <TableHead>Status</TableHead>
                              </>
                            ) : (
                              <>
                                <TableHead>ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead className="text-right">Value</TableHead>
                                <TableHead>Status</TableHead>
                              </>
                            )}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {reportData.tableData?.map((row: any, index: number) => (
                            <TableRow key={row.id || index}>
                              {selectedTemplate === "consumption-report" ? (
                                <>
                                  <TableCell className="font-medium">{row.provider}</TableCell>
                                  <TableCell>{row.service}</TableCell>
                                  <TableCell className="text-right">{row.consumption}</TableCell>
                                  <TableCell className="text-right font-medium">
                                    ${typeof row.cost === 'number' ? row.cost.toLocaleString() : row.cost}
                                  </TableCell>
                                  <TableCell className="text-right text-sm text-muted-foreground">
                                    {row.unitCost}
                                  </TableCell>
                                  <TableCell>
                                    <Badge variant="outline">{row.status || "active"}</Badge>
                                  </TableCell>
                                </>
                              ) : (
                                <>
                                  <TableCell className="font-mono text-xs">{row.id || index + 1}</TableCell>
                                  <TableCell>{row.name || "N/A"}</TableCell>
                                  <TableCell className="text-right font-medium">
                                    ${row.value ? row.value.toLocaleString() : "0"}
                                  </TableCell>
                                  <TableCell>
                                    <Badge variant="outline">{row.status || "active"}</Badge>
                                  </TableCell>
                                </>
                              )}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setPreviewReportOpen(false)}>
              Close
            </Button>
            <Button onClick={() => handleExportReport(exportFormat)} className="gap-2">
              <Download className="h-4 w-4" />
              Export {exportFormat.toUpperCase()}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Schedule Report Dialog */}
      <Dialog open={scheduleReportOpen} onOpenChange={setScheduleReportOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Schedule Report
            </DialogTitle>
            <DialogDescription>
              Set up automatic report generation and delivery
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Frequency</Label>
              <Select defaultValue="weekly">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Delivery Method</Label>
              <Select defaultValue="email">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="download">Download Link</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Recipients</Label>
              <Input placeholder="email@example.com" />
              <p className="text-xs text-muted-foreground">Add multiple emails separated by commas</p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setScheduleReportOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleScheduleReport}>
              <Clock className="h-4 w-4 mr-2" />
              Schedule Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Saved Reports Dialog */}
      <Dialog open={savedReportsOpen} onOpenChange={setSavedReportsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bookmark className="h-5 w-5 text-primary" />
              Saved Reports
            </DialogTitle>
            <DialogDescription>
              Access and manage your saved report templates
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            {savedReports.length === 0 ? (
              <div className="text-center py-12">
                <Bookmark className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No saved reports</h3>
                <p className="text-muted-foreground">Save report templates to access them here</p>
              </div>
            ) : (
              <div className="space-y-2">
                {savedReports.map((report) => (
                  <Card key={report.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold">{report.name}</h4>
                          <p className="text-sm text-muted-foreground">{report.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {report.dateRange}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {report.visualizationType}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" onClick={() => {
                            setReportName(report.name);
                            setReportDescription(report.description);
                            setDateRange(report.dateRange);
                            setSelectedMetrics(report.metrics);
                            setVisualizationType(report.visualizationType);
                            setChartType(report.chartType);
                            setReportBuilderOpen(true);
                            setSavedReportsOpen(false);
                          }}>
                            <PlayCircle className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => {
                            setSavedReports(savedReports.filter(r => r.id !== report.id));
                            toast.success("Report deleted");
                          }}>
                            <X className="h-4 w-4" />
              </Button>
                        </div>
                      </div>
            </CardContent>
          </Card>
        ))}
      </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setSavedReportsOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Reports;

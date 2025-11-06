import { useState } from "react";
import { SectionCard } from "@/components/SectionCard";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  HelpCircle, 
  Search, 
  BookOpen, 
  MessageSquare, 
  Lightbulb, 
  ChevronRight,
  Mail,
  Phone,
  MessageCircle,
  CheckCircle2,
  FileText,
  BarChart3,
  Users,
  Store,
  Settings,
  ShoppingBag,
  CreditCard,
  PlayCircle,
  Image as ImageIcon,
  Video,
  ArrowRight,
  Plus,
  LucideIcon,
  Bold,
  Italic,
  Underline,
  List,
  Heading1,
  Heading2,
  Heading3
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useUserRole } from "@/contexts/UserRoleContext";

// Category icons mapping
const categoryIcons: Record<string, LucideIcon> = {
  "Getting Started": BookOpen,
  "Dashboard": BarChart3,
  "Marketplace": Store,
  "User Management": Users,
  "Reports": FileText,
  "Billing & Invoices": CreditCard,
  "Settings": Settings,
  "Orders": ShoppingBag
};

// Icon color mapping for topics based on category
const getIconColor = (category: string): string => {
  const colorMap: Record<string, string> = {
    "Getting Started": "#06b6d4", // Cyan
    "Dashboard": "#3B82F6", // Blue
    "Marketplace": "#F59E0B", // Amber
    "User Management": "#8B5CF6", // Purple
    "Reports": "#6B7280", // Gray
    "Billing & Invoices": "#10B981", // Green
    "Settings": "#6366F1", // Indigo
    "Orders": "#EC4899" // Pink
  };
  
  return colorMap[category] || "#6B7280";
};

// Enhanced help topics data with screenshots and video examples
const helpTopics = [
  {
    id: 1,
    category: "Getting Started",
    title: "Welcome to Multi-Cloud Harmony",
    description: "Learn the basics of navigating and using the platform",
    icon: BookOpen,
    content: `<p>Multi-Cloud Harmony is a comprehensive platform for managing your cloud infrastructure and SaaS subscriptions across multiple providers.</p>

<h2>Key Features:</h2>
<ul>
  <li><strong>Unified Dashboard</strong>: View all your cloud spending and metrics in one place</li>
  <li><strong>Multi-Cloud Management</strong>: Manage AWS, Azure, GCP, and Oracle Cloud from a single interface</li>
  <li><strong>SaaS Marketplace</strong>: Browse and subscribe to software services</li>
  <li><strong>Automated Billing</strong>: Track invoices and payments across all providers</li>
  <li><strong>Advanced Reporting</strong>: Generate detailed reports and analytics</li>
</ul>

<h2>Getting Started:</h2>
<ol>
  <li>Navigate to the Dashboard to see your overview</li>
  <li>Explore the Marketplace to find cloud providers and SaaS applications</li>
  <li>Use the Reports section to analyze your spending</li>
  <li>Configure your settings to customize your experience</li>
</ol>`,
    screenshots: [
      { type: "image", url: "/placeholder.svg", alt: "Dashboard Overview", description: "Main dashboard showing key metrics" },
      { type: "image", url: "/placeholder.svg", alt: "Navigation Menu", description: "Navigation sidebar with all sections" }
    ],
    videos: [
      { type: "video", url: "https://example.com/video1", title: "Platform Overview", description: "5-minute introduction to the platform" }
    ]
  },
  {
    id: 2,
    category: "Dashboard",
    title: "Understanding Your Dashboard",
    description: "Learn how to read and use dashboard metrics",
    icon: BarChart3,
    content: `<p>The Dashboard provides a comprehensive overview of your cloud infrastructure and spending.</p>

<h2>Key Metrics:</h2>
<ul>
  <li><strong>Total Revenue</strong>: Combined revenue from all partners</li>
  <li><strong>Active Clients</strong>: Number of active customer accounts</li>
  <li><strong>Outstanding Balance</strong>: Total unpaid invoices</li>
  <li><strong>Monthly Spend</strong>: Current month's cloud spending</li>
</ul>

<h2>Charts and Visualizations:</h2>
<ul>
  <li><strong>Spend Over Time</strong>: Line chart showing spending trends across providers</li>
  <li><strong>Spend by Provider</strong>: Pie chart breaking down spending by cloud provider</li>
  <li><strong>Unpaid Invoices</strong>: Table of all pending and overdue invoices</li>
</ul>

<h2>Tips:</h2>
<ul>
  <li>Use date range filters to analyze specific time periods</li>
  <li>Click on chart elements to drill down into details</li>
  <li>Export reports for external analysis</li>
</ul>`,
    screenshots: [
      { type: "image", url: "/placeholder.svg", alt: "Dashboard Metrics", description: "Metric cards showing key statistics" },
      { type: "image", url: "/placeholder.svg", alt: "Spending Charts", description: "Visual charts for spending analysis" }
    ],
    videos: [
      { type: "video", url: "https://example.com/video2", title: "Dashboard Walkthrough", description: "How to navigate and use dashboard features" }
    ]
  },
  {
    id: 3,
    category: "Marketplace",
    title: "Using the Marketplace",
    description: "How to browse and subscribe to cloud providers and SaaS applications",
    icon: Store,
    content: `<p>The Marketplace is your one-stop shop for cloud infrastructure and SaaS subscriptions.</p>

<h2>Browsing Providers:</h2>
<ol>
  <li>Use the search bar to find specific providers</li>
  <li>Filter by category (Cloud Infrastructure, Productivity, Security, etc.)</li>
  <li>Filter by type (Consumption, License)</li>
  <li>Click on a provider card to view details</li>
</ol>

<h2>Provider Details:</h2>
<ul>
  <li>View available products and services</li>
  <li>See pricing plans and specifications</li>
  <li>Add products to your cart</li>
  <li>Review features and capabilities</li>
</ul>

<h2>Subscribing:</h2>
<ol>
  <li>Select a product and plan</li>
  <li>Add to cart</li>
  <li>Proceed to checkout</li>
  <li>Complete customer information</li>
  <li>Place your order</li>
</ol>

<h2>Tips:</h2>
<ul>
  <li>Compare plans before subscribing</li>
  <li>Check pricing details carefully</li>
  <li>Review features and limitations</li>
</ul>`,
    screenshots: [
      { type: "image", url: "/placeholder.svg", alt: "Marketplace View", description: "Grid view of available providers" },
      { type: "image", url: "/placeholder.svg", alt: "Provider Details", description: "Detailed view of a provider's offerings" },
      { type: "image", url: "/placeholder.svg", alt: "Checkout Process", description: "Step-by-step checkout flow" }
    ],
    videos: [
      { type: "video", url: "https://example.com/video3", title: "Marketplace Tutorial", description: "Complete guide to using the marketplace" }
    ]
  },
  {
    id: 4,
    category: "User Management",
    title: "Managing Users and Access",
    description: "How to add users and manage permissions",
    icon: Users,
    content: `<p>User Management allows you to control who has access to your account and what they can do.</p>

<h2>Adding Users:</h2>
<ol>
  <li>Navigate to Users page</li>
  <li>Click "Add New User"</li>
  <li>Fill in user information:
    <ul>
      <li>First Name and Last Name</li>
      <li>Title</li>
      <li>Email address</li>
      <li>Role (Tenant Admin, User, Viewer, Editor)</li>
    </ul>
  </li>
  <li>Select access permissions</li>
  <li>Save the user</li>
</ol>

<h2>Roles Explained:</h2>
<ul>
  <li><strong>Tenant Admin</strong>: Full access to all features</li>
  <li><strong>User</strong>: Standard access with limited permissions</li>
  <li><strong>Viewer</strong>: Read-only access</li>
  <li><strong>Editor</strong>: Can edit but not delete</li>
</ul>

<h2>Access Permissions:</h2>
<ul>
  <li>Dashboard: View metrics and charts</li>
  <li>Users: Manage user accounts</li>
  <li>Marketplace: Browse and subscribe</li>
  <li>Reports: Generate and view reports</li>
  <li>Orders: View order history</li>
  <li>Settings: Configure account settings</li>
  <li>Help & Support: Access help resources</li>
</ul>

<h2>Best Practices:</h2>
<ul>
  <li>Assign roles based on job responsibilities</li>
  <li>Regularly review user access</li>
  <li>Remove access for inactive users</li>
</ul>`,
    screenshots: [
      { type: "image", url: "/placeholder.svg", alt: "Users Page", description: "Users management interface" },
      { type: "image", url: "/placeholder.svg", alt: "Add User Form", description: "Form to add new users" },
      { type: "image", url: "/placeholder.svg", alt: "Access Permissions", description: "Setting user permissions" }
    ],
    videos: [
      { type: "video", url: "https://example.com/video4", title: "User Management Guide", description: "How to manage users and permissions" }
    ]
  },
  {
    id: 5,
    category: "Reports",
    title: "Generating and Understanding Reports",
    description: "Create custom reports and analyze your data",
    icon: FileText,
    content: `<p>Reports help you analyze spending, usage, and performance across your cloud infrastructure.</p>

<h2>Report Types:</h2>
<ul>
  <li><strong>Consumption Report</strong>: Track usage-based spending</li>
  <li><strong>License Report</strong>: Monitor subscription costs</li>
  <li><strong>Revenue Report</strong>: Analyze partner revenue</li>
  <li><strong>Custom Report</strong>: Build your own report</li>
</ul>

<h2>Creating Reports:</h2>
<ol>
  <li>Navigate to Reports page</li>
  <li>Select a template or create custom</li>
  <li>Choose date range</li>
  <li>Select data sources</li>
  <li>Configure visualization (Chart, Table, or Both)</li>
  <li>Generate report</li>
</ol>

<h2>Report Features:</h2>
<ul>
  <li>Export to PDF or Excel</li>
  <li>Schedule automatic generation</li>
  <li>Share with team members</li>
  <li>Save as templates</li>
</ul>

<h2>Tips:</h2>
<ul>
  <li>Use date filters to compare periods</li>
  <li>Combine multiple data sources for comprehensive analysis</li>
  <li>Schedule regular reports for monitoring</li>
</ul>`,
    screenshots: [
      { type: "image", url: "/placeholder.svg", alt: "Reports Page", description: "Reports dashboard" },
      { type: "image", url: "/placeholder.svg", alt: "Report Builder", description: "Custom report builder interface" },
      { type: "image", url: "/placeholder.svg", alt: "Report Visualization", description: "Sample report with charts" }
    ],
    videos: [
      { type: "video", url: "https://example.com/video5", title: "Report Creation", description: "Step-by-step report generation" }
    ]
  },
  {
    id: 6,
    category: "Billing & Invoices",
    title: "Understanding Billing and Invoices",
    description: "How billing works and managing invoices",
    icon: CreditCard,
    content: `<p>Billing and invoicing are automated processes that track your cloud spending.</p>

<h2>Invoice Types:</h2>
<ul>
  <li><strong>Consumption-Based</strong>: Billed based on actual usage</li>
  <li><strong>License-Based</strong>: Fixed monthly/annual subscriptions</li>
  <li><strong>Combined</strong>: Mix of consumption and licenses</li>
</ul>

<h2>Invoice Management:</h2>
<ul>
  <li>View all invoices in the Invoices page</li>
  <li>Filter by status (Paid, Pending, Overdue)</li>
  <li>Download invoices as PDF</li>
  <li>Track payment status</li>
  <li>Send payment reminders</li>
</ul>

<h2>Payment Methods:</h2>
<ul>
  <li>Credit Card</li>
  <li>Bank Transfer</li>
  <li>Automated Payments</li>
</ul>

<h2>Tips:</h2>
<ul>
  <li>Set up automated payments to avoid late fees</li>
  <li>Review invoices regularly for accuracy</li>
  <li>Contact support for billing questions</li>
</ul>`,
    screenshots: [
      { type: "image", url: "/placeholder.svg", alt: "Invoices List", description: "List of all invoices" },
      { type: "image", url: "/placeholder.svg", alt: "Invoice Details", description: "Detailed invoice view" },
      { type: "image", url: "/placeholder.svg", alt: "Payment Methods", description: "Payment configuration" }
    ],
    videos: [
      { type: "video", url: "https://example.com/video6", title: "Billing Overview", description: "Understanding billing and invoices" }
    ]
  },
  {
    id: 7,
    category: "Settings",
    title: "Configuring Your Settings",
    description: "Customize your account and preferences",
    icon: Settings,
    content: `<p>Settings allow you to customize your account and control how the platform works for you.</p>

<h2>Account Information:</h2>
<ul>
  <li>Update your name and email</li>
  <li>Change company information</li>
  <li>Manage profile details</li>
</ul>

<h2>Notifications:</h2>
<ul>
  <li>Email Notifications: Receive updates via email</li>
  <li>Invoice Alerts: Get notified when invoices are generated</li>
  <li>Spending Alerts: Alert when spending exceeds thresholds</li>
</ul>

<h2>Security:</h2>
<ul>
  <li>Change password</li>
  <li>Enable two-factor authentication</li>
  <li>Manage security settings</li>
</ul>

<h2>Tips:</h2>
<ul>
  <li>Keep your contact information up to date</li>
  <li>Configure alerts to stay informed</li>
  <li>Regularly update your password</li>
</ul>`,
    screenshots: [
      { type: "image", url: "/placeholder.svg", alt: "Settings Page", description: "Settings overview" },
      { type: "image", url: "/placeholder.svg", alt: "Notification Settings", description: "Configuring notifications" },
      { type: "image", url: "/placeholder.svg", alt: "Security Settings", description: "Security configuration" }
    ],
    videos: [
      { type: "video", url: "https://example.com/video7", title: "Settings Guide", description: "How to configure your settings" }
    ]
  },
  {
    id: 8,
    category: "Orders",
    title: "Managing Orders",
    description: "Track and manage your subscriptions and orders",
    icon: ShoppingBag,
    content: `<p>The Orders page shows all your subscription orders and their status.</p>

<h2>Order Status:</h2>
<ul>
  <li><strong>Completed</strong>: Order successfully processed</li>
  <li><strong>Processing</strong>: Order is being set up</li>
  <li><strong>Pending</strong>: Awaiting approval</li>
  <li><strong>Failed</strong>: Order could not be completed</li>
</ul>

<h2>Order Details:</h2>
<ul>
  <li>Order number and date</li>
  <li>Provider and service information</li>
  <li>Pricing and billing period</li>
  <li>Customer information</li>
  <li>Status and history</li>
</ul>

<h2>Managing Orders:</h2>
<ul>
  <li>View order details</li>
  <li>Track order status</li>
  <li>Download order confirmations</li>
  <li>Contact support for issues</li>
</ul>

<h2>Tips:</h2>
<ul>
  <li>Save order confirmations for records</li>
  <li>Monitor processing orders</li>
  <li>Contact support for failed orders</li>
</ul>`,
    screenshots: [
      { type: "image", url: "/placeholder.svg", alt: "Orders List", description: "List of all orders" },
      { type: "image", url: "/placeholder.svg", alt: "Order Details", description: "Detailed order view" }
    ],
    videos: [
      { type: "video", url: "https://example.com/video8", title: "Order Management", description: "How to track and manage orders" }
    ]
  },
  {
    id: 9,
    category: "Getting Started",
    title: "First Steps After Sign Up",
    description: "Essential setup tasks for new users",
    icon: BookOpen,
    content: `<p>Welcome! Here's what you should do first to get the most out of Multi-Cloud Harmony.</p>

<h2>Step 1: Complete Your Profile</h2>
<ul>
  <li>Add your company information</li>
  <li>Set up billing details</li>
  <li>Configure notification preferences</li>
</ul>

<h2>Step 2: Explore the Dashboard</h2>
<ul>
  <li>Familiarize yourself with key metrics</li>
  <li>Review spending trends</li>
  <li>Set up spending alerts</li>
</ul>

<h2>Step 3: Connect Your Cloud Accounts</h2>
<ul>
  <li>Link AWS, Azure, or GCP accounts</li>
  <li>Configure API access</li>
  <li>Verify connection status</li>
</ul>

<h2>Step 4: Browse the Marketplace</h2>
<ul>
  <li>Explore available providers</li>
  <li>Review pricing and features</li>
  <li>Add services to your cart</li>
</ul>

<h2>Step 5: Set Up Users</h2>
<ul>
  <li>Invite team members</li>
  <li>Assign appropriate roles</li>
  <li>Configure access permissions</li>
</ul>`,
    screenshots: [
      { type: "image", url: "/placeholder.svg", alt: "Profile Setup", description: "Completing your profile" },
      { type: "image", url: "/placeholder.svg", alt: "Cloud Connection", description: "Connecting cloud accounts" }
    ],
    videos: [
      { type: "video", url: "https://example.com/video9", title: "Getting Started", description: "Quick start guide for new users" }
    ]
  },
  {
    id: 10,
    category: "Dashboard",
    title: "Customizing Dashboard Views",
    description: "Personalize your dashboard layout and widgets",
    icon: BarChart3,
    content: `<p>Customize your dashboard to show the information most relevant to you.</p>

<h2>Widget Management:</h2>
<ul>
  <li>Add or remove metric cards</li>
  <li>Rearrange dashboard sections</li>
  <li>Choose chart types</li>
  <li>Set date ranges</li>
</ul>

<h2>View Options:</h2>
<ul>
  <li>Switch between different time periods</li>
  <li>Filter by cloud provider</li>
  <li>Group by customer or partner</li>
  <li>Export dashboard data</li>
</ul>

<h2>Alerts and Notifications:</h2>
<ul>
  <li>Set spending thresholds</li>
  <li>Configure alert channels</li>
  <li>Schedule regular reports</li>
  <li>Enable real-time notifications</li>
</ul>

<h2>Tips:</h2>
<ul>
  <li>Create multiple dashboard views for different purposes</li>
  <li>Use filters to focus on specific data</li>
  <li>Save your preferred layout</li>
</ul>`,
    screenshots: [
      { type: "image", url: "/placeholder.svg", alt: "Dashboard Customization", description: "Customizing dashboard layout" },
      { type: "image", url: "/placeholder.svg", alt: "Widget Settings", description: "Configuring dashboard widgets" }
    ],
    videos: [
      { type: "video", url: "https://example.com/video10", title: "Dashboard Customization", description: "How to personalize your dashboard" }
    ]
  }
];

type HelpTopic = {
  id: number;
  category: string;
  title: string;
  description: string;
  icon: LucideIcon;
  content: string;
  screenshots?: Array<{ type: string; url: string; alt: string; description: string }>;
  videos?: Array<{ type: string; url: string; title: string; description: string }>;
};

const Help = () => {
  const { isAdmin } = useUserRole();
  // Initialize topics with properly formatted HTML content
  const [topics, setTopics] = useState<HelpTopic[]>(() => {
    return helpTopics.map(topic => ({
      ...topic,
      content: topic.content.trim() // Ensure content is properly trimmed
    }));
  });
  const [categoryIconsState, setCategoryIconsState] = useState<Record<string, LucideIcon>>(categoryIcons);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<HelpTopic | null>(helpTopics[0]);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isAddTopicOpen, setIsAddTopicOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState<"feature" | "feedback">("feature");
  const [feedback, setFeedback] = useState({
    subject: "",
    description: "",
    category: ""
  });
  const [newTopic, setNewTopic] = useState({
    category: "",
    title: "",
    description: "",
    content: "",
    icon: "BookOpen" as string
  });
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryIcon, setNewCategoryIcon] = useState("BookOpen");
  const [contentEditorRef, setContentEditorRef] = useState<HTMLDivElement | null>(null);

  // Icon options for new topics
  const iconOptions = [
    { value: "BookOpen", label: "Book", icon: BookOpen },
    { value: "BarChart3", label: "Chart", icon: BarChart3 },
    { value: "Store", label: "Store", icon: Store },
    { value: "Users", label: "Users", icon: Users },
    { value: "FileText", label: "File", icon: FileText },
    { value: "CreditCard", label: "Credit Card", icon: CreditCard },
    { value: "Settings", label: "Settings", icon: Settings },
    { value: "ShoppingBag", label: "Shopping", icon: ShoppingBag },
    { value: "HelpCircle", label: "Help", icon: HelpCircle }
  ];

  // Filter topics based on search
  const filteredTopics = topics.filter(topic =>
    topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get unique categories
  const categories = Array.from(new Set(topics.map(t => t.category)));

  // Group topics by category
  const topicsByCategory = categories.reduce((acc, category) => {
    acc[category] = filteredTopics.filter(t => t.category === category);
    return acc;
  }, {} as Record<string, HelpTopic[]>);

  // Get category icon with fallback
  const getCategoryIcon = (category: string): LucideIcon => {
    return categoryIconsState[category] || categoryIcons[category] || HelpCircle;
  };

  const handleSubmitFeedback = () => {
    if (!feedback.subject || !feedback.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success(
      feedbackType === "feature"
        ? "Feature request submitted successfully! We'll review your suggestion."
        : "Feedback submitted successfully! Thank you for helping us improve."
    );
    setIsFeedbackOpen(false);
    setFeedback({
      subject: "",
      description: "",
      category: ""
    });
  };

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) {
      toast.error("Please enter a category name");
      return;
    }

    const selectedIcon = iconOptions.find(opt => opt.value === newCategoryIcon);
    if (selectedIcon) {
      setCategoryIconsState(prev => ({
        ...prev,
        [newCategoryName]: selectedIcon.icon
      }));
    }

    setNewTopic({ ...newTopic, category: newCategoryName });
    setIsAddCategoryOpen(false);
    setNewCategoryName("");
    setNewCategoryIcon("BookOpen");
    toast.success("Category added successfully!");
  };

  const handleAddTopic = () => {
    if (!newTopic.category || !newTopic.title || !newTopic.content) {
      toast.error("Please fill in all required fields");
      return;
    }

    const selectedIcon = iconOptions.find(opt => opt.value === newTopic.icon);
    const iconComponent = selectedIcon?.icon || BookOpen;

    const topic: HelpTopic = {
      id: topics.length > 0 ? Math.max(...topics.map(t => t.id)) + 1 : 1,
      category: newTopic.category,
      title: newTopic.title,
      description: newTopic.description,
      icon: iconComponent,
      content: newTopic.content,
      screenshots: [],
      videos: []
    };

    setTopics([...topics, topic]);
    setSelectedTopic(topic);
    setIsAddTopicOpen(false);
    setNewTopic({
      category: "",
      title: "",
      description: "",
      content: "",
      icon: "BookOpen"
    });
    toast.success("Help topic added successfully!");
  };

  // Rich text editor functions
  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (contentEditorRef) {
      contentEditorRef.focus();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Help & Support</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Find answers, guides, and get support
          </p>
        </div>
        <Button 
          variant="gradient" 
          size="sm"
          onClick={() => setIsFeedbackOpen(true)}
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          Submit Feedback
        </Button>
      </div>

      {/* Main Content Area - Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-0">
        {/* Left Sidebar - Topics List */}
        <Card className="h-fit lg:sticky lg:top-20 rounded-r-none border-r-0">
          <CardContent className="p-0">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 h-9"
                />
              </div>
            </div>
            
            {/* Add New Topic Button - Admin Only */}
            {isAdmin && (
              <div className="p-4 border-b">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => setIsAddTopicOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Topic
                </Button>
              </div>
            )}
            
            <ScrollArea className="h-[calc(100vh-280px)]">
              <div className="p-4 space-y-6">
                {categories.map((category) => {
                  const categoryTopics = topicsByCategory[category];
                  if (categoryTopics.length === 0) return null;
                  
                  const CategoryIcon = getCategoryIcon(category);
                  
                  return (
                    <div key={category} className="space-y-2">
                      <div className="flex items-center gap-2 px-2 mb-2">
                        <CategoryIcon className="h-4 w-4 text-primary" />
                        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          {category}
                        </h3>
                      </div>
                      <div className="space-y-0.5">
                        {categoryTopics.map((topic) => {
                          const isSelected = selectedTopic?.id === topic.id;
                          
                          return (
                            <button
                              key={topic.id}
                              onClick={() => setSelectedTopic(topic)}
                              className={cn(
                                "w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200",
                                "hover:bg-muted/60",
                                isSelected && "bg-amber-50 text-black font-medium"
                              )}
                            >
                              {topic.title}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Right Content - Topic Details */}
        <div className="space-y-6 border-l">
          {selectedTopic ? (
            <Card className="rounded-l-none">
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Topic Header */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div 
                        className="p-3 rounded-lg"
                        style={{ 
                          backgroundColor: `${getIconColor(selectedTopic.category)}15`,
                          color: getIconColor(selectedTopic.category)
                        }}
                      >
                        <selectedTopic.icon className="h-6 w-6" style={{ color: getIconColor(selectedTopic.category) }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{selectedTopic.category}</Badge>
                        </div>
                        <h2 className="text-2xl font-bold mb-2">{selectedTopic.title}</h2>
                        <p className="text-muted-foreground">{selectedTopic.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="prose prose-sm max-w-none prose-headings:font-semibold prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-strong:font-semibold prose-ul:text-foreground prose-ol:text-foreground prose-li:text-foreground">
                    <div 
                      key={selectedTopic.id}
                      className="text-foreground leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: selectedTopic.content }}
                    />
                  </div>

                  {/* Screenshots Section */}
                  {selectedTopic.screenshots && selectedTopic.screenshots.length > 0 && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <ImageIcon className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-semibold">Screenshots</h3>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        {selectedTopic.screenshots.map((screenshot, index) => (
                          <div key={index} className="space-y-2">
                            <div className="relative aspect-video bg-muted rounded-lg overflow-hidden border">
                              <img
                                src={screenshot.url}
                                alt={screenshot.alt}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  const placeholder = target.nextElementSibling as HTMLElement;
                                  if (placeholder) placeholder.style.display = 'flex';
                                }}
                              />
                              <div className="hidden absolute inset-0 items-center justify-center bg-muted">
                                <div className="text-center space-y-2">
                                  <ImageIcon className="h-8 w-8 text-muted-foreground mx-auto" />
                                  <p className="text-xs text-muted-foreground">{screenshot.alt}</p>
                                </div>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{screenshot.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Videos Section */}
                  {selectedTopic.videos && selectedTopic.videos.length > 0 && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Video className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-semibold">Video Guides</h3>
                      </div>
                      <div className="space-y-3">
                        {selectedTopic.videos.map((video, index) => (
                          <Card key={index} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex items-start gap-4">
                                <div className="relative flex-shrink-0">
                                  <div className="w-24 h-16 bg-muted rounded-lg flex items-center justify-center">
                                    <PlayCircle className="h-8 w-8 text-primary" />
                                  </div>
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-0 h-0 border-l-[12px] border-l-primary border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1" />
                                  </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-semibold mb-1">{video.title}</h4>
                                  <p className="text-sm text-muted-foreground mb-2">{video.description}</p>
                                  <Button variant="outline" size="sm" asChild>
                                    <a href={video.url} target="_blank" rel="noopener noreferrer">
                                      Watch Video
                                      <ArrowRight className="h-3 w-3 ml-2" />
                                    </a>
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Related Actions */}
                  <div className="flex items-center gap-3 pt-4 border-t">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsFeedbackOpen(true);
                        setFeedbackType("feedback");
                        setFeedback({
                          subject: `Question about: ${selectedTopic.title}`,
                          description: "",
                          category: selectedTopic.category
                        });
                      }}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Ask a Question
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsFeedbackOpen(true);
                        setFeedbackType("feature");
                        setFeedback({
                          subject: `Feature suggestion related to: ${selectedTopic.title}`,
                          description: "",
                          category: selectedTopic.category
                        });
                      }}
                    >
                      <Lightbulb className="h-4 w-4 mr-2" />
                      Suggest Improvement
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <HelpCircle className="h-16 w-16 mx-auto text-muted-foreground mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">Select a Topic</h3>
                <p className="text-muted-foreground">
                  Choose a topic from the sidebar to view detailed guides and instructions
                </p>
              </CardContent>
            </Card>
          )}

          {/* Support Contact Cards - Secondary Section */}
          <SectionCard
            title="Need More Help?"
            description="Contact our support team"
            icon={MessageCircle}
          >
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="p-4 rounded-full bg-primary/10 inline-block">
                    <Mail className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold">Email Support</h3>
                  <p className="text-sm text-muted-foreground">support@cloudwatch.com</p>
                  <Button variant="outline" size="sm" className="w-full">
                    Send Email
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="p-4 rounded-full bg-secondary/10 inline-block">
                    <Phone className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="font-semibold">Phone Support</h3>
                  <p className="text-sm text-muted-foreground">+971 4 123 4567</p>
                  <Button variant="outline" size="sm" className="w-full">
                    Call Now
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="p-4 rounded-full bg-accent/10 inline-block">
                    <MessageCircle className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-semibold">Live Chat</h3>
                  <p className="text-sm text-muted-foreground">Available 24/7</p>
                  <Button variant="outline" size="sm" className="w-full">
                    Start Chat
                  </Button>
                </CardContent>
              </Card>
            </div>
          </SectionCard>
        </div>
      </div>

      {/* Feedback/Feature Request Dialog */}
      <Dialog open={isFeedbackOpen} onOpenChange={setIsFeedbackOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              {feedbackType === "feature" ? (
                <>
                  <Lightbulb className="h-5 w-5 text-primary" />
                  Suggest a Feature
                </>
              ) : (
                <>
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Submit Feedback
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              {feedbackType === "feature"
                ? "Have an idea for a new feature? We'd love to hear it!"
                : "Share your thoughts and help us improve the platform"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex gap-2">
              <Button
                variant={feedbackType === "feature" ? "default" : "outline"}
                size="sm"
                onClick={() => setFeedbackType("feature")}
                className="flex-1"
              >
                <Lightbulb className="h-4 w-4 mr-2" />
                Feature Request
              </Button>
              <Button
                variant={feedbackType === "feedback" ? "default" : "outline"}
                size="sm"
                onClick={() => setFeedbackType("feedback")}
                className="flex-1"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                General Feedback
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">
                Subject <span className="text-destructive">*</span>
              </Label>
              <Input
                id="subject"
                placeholder={feedbackType === "feature" ? "e.g., Add dark mode support" : "Brief description of your feedback"}
                value={feedback.subject}
                onChange={(e) => setFeedback({...feedback, subject: e.target.value})}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={feedback.category} onValueChange={(value) => setFeedback({...feedback, category: value})}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select a category (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dashboard">Dashboard</SelectItem>
                  <SelectItem value="Marketplace">Marketplace</SelectItem>
                  <SelectItem value="User Management">User Management</SelectItem>
                  <SelectItem value="Reports">Reports</SelectItem>
                  <SelectItem value="Billing">Billing & Invoices</SelectItem>
                  <SelectItem value="Settings">Settings</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                Description <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder={feedbackType === "feature" 
                  ? "Describe the feature you'd like to see. Include details about how it would work and why it would be useful..."
                  : "Tell us about your experience, what you liked, or what could be improved..."}
                value={feedback.description}
                onChange={(e) => setFeedback({...feedback, description: e.target.value})}
                className="min-h-[120px] resize-none"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsFeedbackOpen(false);
              setFeedback({
                subject: "",
                description: "",
                category: ""
              });
            }}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmitFeedback}
              disabled={!feedback.subject || !feedback.description}
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add New Topic Sheet - Admin Only */}
      {isAdmin && (
        <Sheet open={isAddTopicOpen} onOpenChange={setIsAddTopicOpen}>
          <SheetContent side="right" className="w-full sm:max-w-2xl p-0 flex flex-col">
            <SheetHeader className="px-6 pt-6 pb-4 border-b">
              <SheetTitle className="text-xl">Add New Help Topic</SheetTitle>
              <SheetDescription className="text-sm mt-1">
                Create a new help topic with guide content
              </SheetDescription>
            </SheetHeader>
            
            <ScrollArea className="flex-1">
              <div className="px-6 py-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="topic-category">
                      Category <span className="text-destructive">*</span>
                    </Label>
                    <Select 
                      value={newTopic.category} 
                      onValueChange={(value) => {
                        if (value === "__add_new__") {
                          setIsAddCategoryOpen(true);
                        } else {
                          setNewTopic({...newTopic, category: value});
                        }
                      }}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                        <SelectItem value="__add_new__" className="text-primary font-medium">
                          <Plus className="h-4 w-4 inline mr-2" />
                          Add New Category
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="topic-title">
                      Title <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="topic-title"
                      placeholder="e.g., How to Export Reports"
                      value={newTopic.title}
                      onChange={(e) => setNewTopic({...newTopic, title: e.target.value})}
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="topic-description">Description</Label>
                    <Input
                      id="topic-description"
                      placeholder="Brief description of the topic"
                      value={newTopic.description}
                      onChange={(e) => setNewTopic({...newTopic, description: e.target.value})}
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="topic-icon">Icon</Label>
                    <Select 
                      value={newTopic.icon} 
                      onValueChange={(value) => setNewTopic({...newTopic, icon: value})}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select an icon" />
                      </SelectTrigger>
                      <SelectContent>
                        {iconOptions.map((option) => {
                          const Icon = option.icon;
                          return (
                            <SelectItem key={option.value} value={option.value}>
                              <div className="flex items-center gap-2">
                                <Icon className="h-4 w-4" />
                                <span>{option.label}</span>
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="topic-content">
                      Content <span className="text-destructive">*</span>
                    </Label>
                    <div className="border rounded-lg overflow-hidden">
                      {/* Toolbar */}
                      <div className="flex items-center gap-1 p-2 border-b bg-muted/30">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => execCommand("bold")}
                          title="Bold"
                        >
                          <Bold className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => execCommand("italic")}
                          title="Italic"
                        >
                          <Italic className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => execCommand("underline")}
                          title="Underline"
                        >
                          <Underline className="h-4 w-4" />
                        </Button>
                        <div className="h-6 w-px bg-border mx-1" />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => execCommand("formatBlock", "h1")}
                          title="Heading 1"
                        >
                          <Heading1 className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => execCommand("formatBlock", "h2")}
                          title="Heading 2"
                        >
                          <Heading2 className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => execCommand("formatBlock", "h3")}
                          title="Heading 3"
                        >
                          <Heading3 className="h-4 w-4" />
                        </Button>
                        <div className="h-6 w-px bg-border mx-1" />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => execCommand("insertUnorderedList")}
                          title="Bullet List"
                        >
                          <List className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => execCommand("insertOrderedList")}
                          title="Numbered List"
                        >
                          <List className="h-4 w-4 rotate-90" />
                        </Button>
                      </div>
                      {/* Editor */}
                      <div
                        ref={(el) => {
                          if (el && el.innerHTML !== newTopic.content) {
                            el.innerHTML = newTopic.content;
                          }
                          setContentEditorRef(el);
                        }}
                        contentEditable
                        suppressContentEditableWarning
                        className="min-h-[300px] p-4 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0 prose prose-sm max-w-none"
                        style={{ whiteSpace: "pre-wrap" }}
                        onInput={(e) => {
                          const content = e.currentTarget.innerHTML;
                          setNewTopic({...newTopic, content});
                        }}
                        onBlur={(e) => {
                          const content = e.currentTarget.innerHTML;
                          setNewTopic({...newTopic, content});
                        }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Use the toolbar to format your content. HTML formatting is supported.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollArea>

            <SheetFooter className="px-6 py-4 border-t bg-muted/30">
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsAddTopicOpen(false);
                  setNewTopic({
                    category: "",
                    title: "",
                    description: "",
                    content: "",
                    icon: "BookOpen"
                  });
                }}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleAddTopic}
                className="flex-1"
                disabled={!newTopic.category || !newTopic.title || !newTopic.content}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Topic
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}

      {/* Add New Category Dialog */}
      <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>
              Create a new help category with an icon
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="category-name">
                Category Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="category-name"
                placeholder="e.g., Troubleshooting"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="h-11"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddCategory();
                  }
                }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category-icon">Icon</Label>
              <Select 
                value={newCategoryIcon} 
                onValueChange={(value) => setNewCategoryIcon(value)}
              >
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select an icon" />
                </SelectTrigger>
                <SelectContent>
                  {iconOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          <span>{option.label}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsAddCategoryOpen(false);
              setNewCategoryName("");
              setNewCategoryIcon("BookOpen");
            }}>
              Cancel
            </Button>
            <Button 
              onClick={handleAddCategory}
              disabled={!newCategoryName.trim()}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Help;

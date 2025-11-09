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
    id: 11,
    category: "User Management",
    title: "Managing Partner Customers",
    description: "Complete guide to managing and onboarding customers",
    icon: Users,
    content: `<div class="help-intro">
<p class="text-lg leading-relaxed mb-6">The Partner Customers page is your central hub for managing all your customer accounts. Here you can view customer information, add new customers, detect existing cloud tenants, and manage customer subscriptions and billing.</p>

<div class="feature-highlight bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
<h2 class="text-xl font-semibold mb-3 flex items-center gap-2">
<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
Overview
</h2>
<p class="mb-3">As a partner, you can manage multiple customer accounts from a single interface. The Partner Customers page provides:</p>
<ul class="space-y-2">
  <li class="flex items-start gap-2"><span class="text-primary mt-1">•</span> <strong>Customer List View</strong>: See all your customers in one organized table</li>
  <li class="flex items-start gap-2"><span class="text-primary mt-1">•</span> <strong>Quick Search</strong>: Find customers by name or industry</li>
  <li class="flex items-start gap-2"><span class="text-primary mt-1">•</span> <strong>Customer Onboarding</strong>: Add new customers or link existing ones</li>
  <li class="flex items-start gap-2"><span class="text-primary mt-1">•</span> <strong>Cloud Tenant Detection</strong>: Automatically detect existing cloud accounts</li>
  <li class="flex items-start gap-2"><span class="text-primary mt-1">•</span> <strong>Customer Details</strong>: View comprehensive customer information and billing</li>
</ul>
</div>
</div>

<div class="navigation-section">
<h2 class="text-2xl font-bold mb-4 pb-2 border-b">Accessing the Partner Customers Page</h2>

<div class="quick-access bg-muted/50 rounded-lg p-4 mb-6">
<h3 class="font-semibold mb-2">Quick Access</h3>
<p class="mb-2"><strong>Direct URL:</strong></p>
<code class="block bg-background px-3 py-2 rounded border text-sm">http://localhost:5173/partner/customers</code>
</div>

<div class="step-by-step-navigation">
<h3 class="text-xl font-semibold mb-4">Step-by-Step Navigation</h3>

<div class="step-card mb-4 p-4 border rounded-lg bg-card">
<h4 class="font-semibold mb-2 flex items-center gap-2">
<span class="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
Start the Application
</h4>
<ul class="ml-8 space-y-1 text-sm">
  <li>Open your terminal</li>
  <li>Navigate to: <code class="bg-muted px-1 py-0.5 rounded text-xs">cd /Users/apple/Downloads/multi-cloud-harmony-main</code></li>
  <li>Start server: <code class="bg-muted px-1 py-0.5 rounded text-xs">npm run dev</code></li>
  <li>Wait for server to start on <code class="bg-muted px-1 py-0.5 rounded text-xs">http://localhost:5173</code></li>
</ul>
</div>

<div class="step-card mb-4 p-4 border rounded-lg bg-card">
<h4 class="font-semibold mb-2 flex items-center gap-2">
<span class="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
Log In
</h4>
<ul class="ml-8 space-y-1 text-sm">
  <li>Open browser: <code class="bg-muted px-1 py-0.5 rounded text-xs">http://localhost:5173</code></li>
  <li>Enter credentials: <code class="bg-muted px-1 py-0.5 rounded text-xs">user@mindverse.com</code> / <code class="bg-muted px-1 py-0.5 rounded text-xs">user123</code></li>
  <li>Click <strong>"Sign In"</strong></li>
</ul>
</div>

<div class="step-card mb-4 p-4 border rounded-lg bg-card">
<h4 class="font-semibold mb-2 flex items-center gap-2">
<span class="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
Switch to Partner Role
</h4>
<div class="ml-8 space-y-2">
<p class="text-sm mb-2">After logging in, switch to Partner role:</p>
<img src="/help-screenshots/partner-customers/navigation-sidebar.png" alt="Navigation Sidebar" class="w-full max-w-lg rounded-lg border mb-2" />
<ul class="space-y-1 text-sm">
  <li>Click profile/avatar in top right corner</li>
  <li>Select <strong>"Switch Role"</strong> → Choose <strong>"Partner"</strong></li>
  <li>You'll be redirected with partner permissions</li>
</ul>
</div>
</div>

<div class="step-card mb-6 p-4 border rounded-lg bg-card">
<h4 class="font-semibold mb-2 flex items-center gap-2">
<span class="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold">4</span>
Navigate to Customers Page
</h4>
<div class="ml-8 space-y-2">
<p class="text-sm mb-2">From the navigation sidebar:</p>
<ul class="space-y-1 text-sm">
  <li>Click <strong>"Customers"</strong> (Users icon) in left sidebar</li>
  <li>OR directly navigate to: <code class="bg-muted px-1 py-0.5 rounded text-xs">http://localhost:5173/partner/customers</code></li>
</ul>
<img src="/help-screenshots/partner-customers/main-page.png" alt="Partner Customers Main Page" class="w-full rounded-lg border mt-3" />
</div>
</div>
</div>
</div>

<div class="viewing-customers-section">
<h2 class="text-2xl font-bold mb-4 pb-2 border-b">Viewing Your Customers</h2>

<p class="mb-4">The main customers table displays all your customers with comprehensive information. Here's what you'll see:</p>

<img src="/help-screenshots/partner-customers/customers-table.png" alt="Customers Table" class="w-full rounded-lg border mb-6 shadow-sm" />

<div class="table-columns-explained grid md:grid-cols-2 gap-4 mb-6">
<div class="column-info p-4 border rounded-lg">
<h3 class="font-semibold mb-3 text-lg">Table Columns</h3>
<ul class="space-y-2 text-sm">
  <li><strong>Customer ID</strong><br/><span class="text-muted-foreground">Unique tenant identifier (e.g., <code>TNT-AWS-001234</code>)</span></li>
  <li><strong>Customer</strong><br/><span class="text-muted-foreground">Company/individual name with email</span></li>
  <li><strong>Cloud</strong><br/><span class="text-muted-foreground">Primary provider with color-coded badges</span></li>
  <li><strong>Subscriptions</strong><br/><span class="text-muted-foreground">Number of active subscriptions</span></li>
  <li><strong>Monthly Spend</strong><br/><span class="text-muted-foreground">Current monthly spending amount</span></li>
  <li><strong>Payment Status</strong><br/><span class="text-muted-foreground">Paid or Pending badge</span></li>
</ul>
</div>

<div class="customer-types-info p-4 border rounded-lg">
<h3 class="font-semibold mb-3 text-lg">Customer Types & Status</h3>
<div class="space-y-3">
<div>
<p class="font-medium mb-1">Customer Types:</p>
<ul class="text-sm space-y-1">
  <li class="flex items-center gap-2"><span class="text-lg">🏢</span> <strong>Company</strong> - Business customers</li>
  <li class="flex items-center gap-2"><span class="text-lg">👤</span> <strong>Personal</strong> - Individual customers</li>
</ul>
</div>
<div>
<p class="font-medium mb-1">Payment Status:</p>
<ul class="text-sm space-y-1">
  <li class="flex items-center gap-2"><span class="text-green-600">✓</span> <strong>Paid</strong> - Green badge, up to date</li>
  <li class="flex items-center gap-2"><span class="text-red-600">⏰</span> <strong>Pending</strong> - Red badge, payment pending</li>
</ul>
</div>
</div>
</div>
</div>
</div>

<div class="search-filter-section">
<h2 class="text-2xl font-bold mb-4 pb-2 border-b">Searching and Filtering Customers</h2>

<div class="search-section mb-6">
<h3 class="text-xl font-semibold mb-3">Using the Search Bar</h3>
<div class="flex flex-col md:flex-row gap-4">
<div class="flex-1">
<img src="/help-screenshots/partner-customers/search-functionality.png" alt="Search Functionality" class="w-full rounded-lg border shadow-sm mb-3" />
<ol class="space-y-2 text-sm ml-4">
  <li>Locate the search bar at the top of the customers table</li>
  <li>Type any part of the customer name or industry</li>
  <li>The table automatically filters to show matching results</li>
  <li>Clear the search to see all customers again</li>
</ol>
</div>
</div>
</div>

<div class="pagination-section">
<h3 class="text-xl font-semibold mb-3">Pagination Controls</h3>
<div class="flex flex-col md:flex-row gap-4">
<div class="flex-1">
<img src="/help-screenshots/partner-customers/pagination-controls.png" alt="Pagination Controls" class="w-full max-w-lg rounded-lg border shadow-sm mb-3" />
<p class="mb-2 text-sm">When you have many customers, use pagination to navigate:</p>
<ul class="space-y-2 text-sm ml-4">
  <li><strong>Items Per Page</strong>: Select 15, 30, 50, or 100 customers per page</li>
  <li><strong>Page Navigation</strong>: Use arrow buttons (← →) to move between pages</li>
  <li><strong>Page Numbers</strong>: See current page and total pages displayed</li>
</ul>
</div>
</div>
</div>
</div>

<div class="adding-customer-section">
<h2 class="text-2xl font-bold mb-6 pb-2 border-b">Adding a New Customer</h2>

<p class="mb-6 text-lg">Follow this comprehensive workflow to onboard a new customer with cloud tenant detection and service provisioning.</p>

<div class="workflow-steps space-y-6">
<div class="step-item p-5 border-2 border-primary/20 rounded-lg bg-card">
<h3 class="text-xl font-semibold mb-3 flex items-center gap-2">
<span class="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">1</span>
Open the Add Customer Panel
</h3>
<div class="ml-10 space-y-3">
<img src="/help-screenshots/partner-customers/add-customer-button.png" alt="Add Customer Button" class="w-full max-w-md rounded-lg border shadow-sm mb-2" />
<ol class="space-y-2 text-sm">
  <li>Click the <strong class="text-primary">"Add Customer"</strong> button in the top right corner</li>
  <li>A side panel will slide in from the right with the onboarding form</li>
</ol>
</div>
</div>

<div class="step-item p-5 border-2 border-primary/20 rounded-lg bg-card">
<h3 class="text-xl font-semibold mb-3 flex items-center gap-2">
<span class="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">2</span>
Select Customer Type
</h3>
<div class="ml-10 space-y-3">
<img src="/help-screenshots/partner-customers/customer-type-selection.png" alt="Customer Type Selection" class="w-full rounded-lg border shadow-sm mb-2" />
<p class="text-sm mb-2">Choose between two options:</p>
<div class="grid md:grid-cols-2 gap-3">
<div class="p-3 border rounded bg-muted/50">
<p class="font-semibold mb-1">✨ New Customer</p>
<p class="text-xs text-muted-foreground">Create a completely new customer account</p>
</div>
<div class="p-3 border rounded bg-muted/50">
<p class="font-semibold mb-1">🔗 Existing Customer</p>
<p class="text-xs text-muted-foreground">Link to an existing customer account by domain</p>
</div>
</div>
</div>
</div>

<div class="step-item p-5 border-2 border-primary/20 rounded-lg bg-card">
<h3 class="text-xl font-semibold mb-3 flex items-center gap-2">
<span class="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">3</span>
Choose Cloud Provider
</h3>
<div class="ml-10 space-y-3">
<img src="/help-screenshots/partner-customers/cloud-provider-selection.png" alt="Cloud Provider Selection" class="w-full rounded-lg border shadow-sm mb-2" />
<p class="text-sm mb-2">Select the primary cloud provider for this customer:</p>
<div class="grid grid-cols-3 gap-2 text-sm">
<div class="p-2 border rounded text-center bg-orange-50 border-orange-200">
<p class="font-semibold">AWS</p>
<p class="text-xs text-muted-foreground">Orange badge</p>
</div>
<div class="p-2 border rounded text-center bg-blue-50 border-blue-200">
<p class="font-semibold">Azure</p>
<p class="text-xs text-muted-foreground">Blue badge</p>
</div>
<div class="p-2 border rounded text-center bg-green-50 border-green-200">
<p class="font-semibold">GCP</p>
<p class="text-xs text-muted-foreground">Green badge</p>
</div>
</div>
<p class="text-xs text-muted-foreground mt-2">Click on a provider card to select it. The selected provider will show a checkmark.</p>
</div>
</div>

<div class="step-item p-5 border-2 border-primary/20 rounded-lg bg-card">
<h3 class="text-xl font-semibold mb-3 flex items-center gap-2">
<span class="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">4</span>
Fill in Customer Information
</h3>
<div class="ml-10 space-y-3">
<img src="/help-screenshots/partner-customers/customer-information-form.png" alt="Customer Information Form" class="w-full rounded-lg border shadow-sm mb-2" />
<p class="text-sm mb-2">Complete all required fields:</p>
<div class="grid md:grid-cols-2 gap-2 text-sm">
<div><strong>Company</strong> <span class="text-red-500">*</span> - Organization name</div>
<div><strong>Contact Name</strong> <span class="text-red-500">*</span> - Primary contact</div>
<div><strong>Primary Domain</strong> <span class="text-red-500">*</span> - Email domain</div>
<div><strong>Plan</strong> - Subscription plan</div>
<div><strong>Consumer</strong> - Consumer type</div>
<div><strong>Reference</strong> - Internal reference</div>
<div><strong>Invoice Profile</strong> - Billing profile</div>
<div><strong>End Customer</strong> - End customer info</div>
</div>
</div>
</div>

<div class="step-item p-5 border-2 border-primary/20 rounded-lg bg-card">
<h3 class="text-xl font-semibold mb-3 flex items-center gap-2">
<span class="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">5</span>
Cloud Tenant Detection
</h3>
<div class="ml-10 space-y-4">
<p class="text-sm mb-3">This powerful feature automatically detects existing cloud accounts associated with the customer's domain.</p>

<div class="detection-before mb-4">
<img src="/help-screenshots/partner-customers/tenant-detection-before.png" alt="Tenant Detection Before" class="w-full rounded-lg border shadow-sm mb-2" />
<p class="text-xs text-muted-foreground mb-2">Before running detection</p>
</div>

<ol class="space-y-3 text-sm">
  <li class="flex items-start gap-2">
    <span class="font-bold text-primary">1.</span>
    <div><strong>Enter Email/Domain</strong>: The primary domain you entered will be used for detection</div>
  </li>
  <li class="flex items-start gap-2">
    <span class="font-bold text-primary">2.</span>
    <div><strong>Click "Check for Existing Tenants"</strong>: The system will scan for existing cloud accounts</div>
  </li>
  <li class="flex items-start gap-2">
    <span class="font-bold text-primary">3.</span>
    <div>
      <strong>Detection in Progress</strong>: You'll see a loading indicator
      <img src="/help-screenshots/partner-customers/tenant-detection-loading.png" alt="Tenant Detection Loading" class="w-full max-w-md rounded border mt-2" />
    </div>
  </li>
  <li class="flex items-start gap-2">
    <span class="font-bold text-primary">4.</span>
    <div>
      <strong>Review Detected Tenants</strong>: If tenants are found, you'll see:
      <img src="/help-screenshots/partner-customers/tenant-detection-results.png" alt="Tenant Detection Results" class="w-full rounded-lg border shadow-sm mt-2 mb-2" />
      <ul class="ml-4 mt-2 space-y-1 text-xs">
        <li>• Tenant ID for each detected account</li>
        <li>• Cloud provider (AWS, Azure, or GCP)</li>
        <li>• Account name and creation date</li>
        <li>• Region information</li>
        <li>• Existing services and monthly costs</li>
        <li>• Total monthly spend</li>
      </ul>
    </div>
  </li>
  <li class="flex items-start gap-2">
    <span class="font-bold text-primary">5.</span>
    <div>
      <strong>Select Additional Services</strong> (Optional): Choose additional cloud services
      <img src="/help-screenshots/partner-customers/service-selection.png" alt="Service Selection" class="w-full rounded-lg border shadow-sm mt-2 mb-2" />
      <ul class="ml-4 mt-2 space-y-1 text-xs">
        <li>• Recommended services are pre-selected</li>
        <li>• Add or remove services as needed</li>
        <li>• Each service shows its category (Compute, Storage, Database)</li>
      </ul>
    </div>
  </li>
  <li class="flex items-start gap-2">
    <span class="font-bold text-primary">6.</span>
    <div><strong>Continue</strong>: Click "Continue" to proceed with selected services</div>
  </li>
</ol>
</div>
</div>

<div class="step-item p-5 border-2 border-primary/20 rounded-lg bg-card">
<h3 class="text-xl font-semibold mb-3 flex items-center gap-2">
<span class="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">6</span>
Review and Submit
</h3>
<div class="ml-10 space-y-2 text-sm">
<ol class="space-y-2">
  <li>Review all entered information</li>
  <li>Verify detected tenants and selected services</li>
  <li>Click <strong class="text-primary">"Add Customer"</strong> button at the bottom of the panel</li>
  <li>Wait for confirmation</li>
</ol>
</div>
</div>

<div class="step-item p-5 border-2 border-green-500/20 rounded-lg bg-green-50/50">
<h3 class="text-xl font-semibold mb-3 flex items-center gap-2">
<span class="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white font-bold">✓</span>
Confirmation & Success
</h3>
<div class="ml-10 space-y-3">
<img src="/help-screenshots/partner-customers/add-customer-success.png" alt="Add Customer Success" class="w-full max-w-md rounded-lg border shadow-sm mb-2" />
<p class="text-sm mb-2">After successfully adding a customer:</p>
<ul class="space-y-1 text-sm">
  <li>✓ Success toast notification appears</li>
  <li>✓ Shows customer name and generated Customer ID</li>
  <li>✓ Displays number of tenants linked (if detected)</li>
  <li>✓ Panel closes automatically</li>
  <li>✓ New customer appears in your customers table</li>
</ul>
</div>
</div>
</div>
</div>

<div class="existing-customer-section">
<h2 class="text-2xl font-bold mb-4 pb-2 border-b">Adding an Existing Customer</h2>

<p class="mb-4">To link a new domain to an existing customer account, follow these simple steps:</p>

<div class="existing-customer-steps p-4 border rounded-lg bg-card">
<ol class="space-y-3 text-sm">
  <li class="flex items-start gap-2">
    <span class="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">1</span>
    <div>Select <strong>"Existing Customer"</strong> option in the customer type selection</div>
  </li>
  <li class="flex items-start gap-2">
    <span class="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">2</span>
    <div>Enter the domain name (e.g., <code class="bg-muted px-1 py-0.5 rounded text-xs">example.com</code>)</div>
  </li>
  <li class="flex items-start gap-2">
    <span class="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">3</span>
    <div>Click <strong>"Add Customer"</strong> button</div>
  </li>
  <li class="flex items-start gap-2">
    <span class="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold">✓</span>
    <div>The domain will be automatically linked to the existing customer account</div>
  </li>
</ol>
</div>
</div>

<div class="customer-details-section">
<h2 class="text-2xl font-bold mb-6 pb-2 border-b">Viewing Customer Details</h2>

<p class="mb-4">Click on any customer row to view comprehensive information including billing, subscriptions, and metrics.</p>

<img src="/help-screenshots/partner-customers/customer-detail-view.png" alt="Customer Detail View" class="w-full rounded-lg border shadow-sm mb-6" />

<div class="details-grid grid md:grid-cols-2 gap-4 mb-6">
<div class="overview-card p-4 border rounded-lg">
<h3 class="font-semibold mb-3 text-lg">Customer Overview</h3>
<ul class="space-y-2 text-sm">
  <li><strong>Customer Header</strong>: Name, email, tenant ID, and type</li>
  <li><strong>Quick Actions</strong>: "Assign Services" button</li>
  <li><strong>Key Metrics Cards</strong>:
    <ul class="ml-4 mt-1 space-y-1 text-xs">
      <li>• Active Subscriptions count</li>
      <li>• Monthly Spend amount</li>
      <li>• Payment Status</li>
      <li>• Outstanding Balance</li>
    </ul>
  </li>
</ul>
</div>

<div class="billing-card p-4 border rounded-lg">
<h3 class="font-semibold mb-3 text-lg">Billing Information</h3>
<img src="/help-screenshots/partner-customers/billing-information.png" alt="Billing Information" class="w-full rounded border mb-2" />
<ul class="space-y-1 text-sm">
  <li><strong>Current Balance</strong> - Total amount owed</li>
  <li><strong>Last Payment</strong> - Most recent payment amount</li>
  <li><strong>Last Payment Date</strong> - Payment timestamp</li>
  <li><strong>Payment Status</strong> - Current status</li>
  <li><strong>Outstanding Balance</strong> - Overdue amounts</li>
</ul>
</div>
</div>

<div class="subscriptions-section mb-6">
<h3 class="text-xl font-semibold mb-3">Subscription Details</h3>
<img src="/help-screenshots/partner-customers/subscription-details.png" alt="Subscription Details" class="w-full rounded-lg border shadow-sm mb-3" />
<p class="text-sm mb-2">The Subscription Details table shows all active subscriptions:</p>
<div class="grid md:grid-cols-2 gap-2 text-sm">
<div><strong>Provider</strong> - Cloud or SaaS provider name</div>
<div><strong>Service</strong> - Specific service (e.g., EC2, SQL Database)</div>
<div><strong>Type</strong> - <span class="badge bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">Consumption</span> or <span class="badge bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs">License</span></div>
<div><strong>Monthly Cost</strong> - Cost per month</div>
</div>
</div>

<div class="navigation-back p-3 bg-muted/50 rounded-lg">
<h3 class="font-semibold mb-2">Navigating Back</h3>
<ol class="text-sm space-y-1">
  <li>Click the <strong>← back arrow</strong> button in the top left</li>
  <li>You'll return to the customers table view</li>
</ol>
</div>
</div>

<div class="tips-practices-section">
<h2 class="text-2xl font-bold mb-6 pb-2 border-b">Tips and Best Practices</h2>

<div class="tips-grid grid md:grid-cols-3 gap-4 mb-6">
<div class="tip-card p-4 border rounded-lg bg-blue-50/50 border-blue-200">
<h3 class="font-semibold mb-2 text-blue-900">Customer Onboarding</h3>
<ul class="space-y-1 text-sm">
  <li>✓ Always run tenant detection</li>
  <li>✓ Verify domain before detection</li>
  <li>✓ Review recommended services</li>
  <li>✓ Complete all required fields</li>
</ul>
</div>

<div class="tip-card p-4 border rounded-lg bg-green-50/50 border-green-200">
<h3 class="font-semibold mb-2 text-green-900">Managing Customers</h3>
<ul class="space-y-1 text-sm">
  <li>✓ Regular payment reviews</li>
  <li>✓ Use search efficiently</li>
  <li>✓ Monitor spending trends</li>
  <li>✓ Check details regularly</li>
</ul>
</div>

<div class="tip-card p-4 border rounded-lg bg-purple-50/50 border-purple-200">
<h3 class="font-semibold mb-2 text-purple-900">Tenant Detection</h3>
<ul class="space-y-1 text-sm">
  <li>✓ Multi-cloud support (AWS/Azure/GCP)</li>
  <li>✓ Automatic tenant linking</li>
  <li>✓ Smart service recommendations</li>
  <li>✓ Cost visibility upfront</li>
</ul>
</div>
</div>
</div>

<div class="troubleshooting-section">
<h2 class="text-2xl font-bold mb-4 pb-2 border-b">Troubleshooting</h2>

<div class="issue-cards space-y-3">
<div class="issue-card p-4 border border-yellow-200 rounded-lg bg-yellow-50/50">
<h3 class="font-semibold mb-2 text-yellow-900">⚠️ Tenant Detection Not Working</h3>
<ul class="text-sm space-y-1 ml-4">
  <li>• Verify the domain/email is correct</li>
  <li>• Ensure the domain has active cloud accounts</li>
  <li>• Try again after a few moments</li>
</ul>
</div>

<div class="issue-card p-4 border border-orange-200 rounded-lg bg-orange-50/50">
<h3 class="font-semibold mb-2 text-orange-900">⚠️ Customer Not Appearing</h3>
<ul class="text-sm space-y-1 ml-4">
  <li>• Check if search filters are active</li>
  <li>• Verify the customer was successfully added</li>
  <li>• Refresh the page</li>
</ul>
</div>

<div class="issue-card p-4 border border-red-200 rounded-lg bg-red-50/50">
<h3 class="font-semibold mb-2 text-red-900">⚠️ Cannot Add Customer</h3>
<ul class="text-sm space-y-1 ml-4">
  <li>• Ensure all required fields are filled</li>
  <li>• Check that tenant detection has completed</li>
  <li>• Verify you have proper permissions</li>
</ul>
</div>
</div>
</div>

<div class="shortcuts-section mt-6 p-4 bg-muted/50 rounded-lg">
<h2 class="text-xl font-semibold mb-3">Keyboard Shortcuts</h2>
<div class="grid md:grid-cols-2 gap-2 text-sm">
<div><kbd class="px-2 py-1 bg-background border rounded text-xs">Ctrl/Cmd + F</kbd> Focus search bar</div>
<div><kbd class="px-2 py-1 bg-background border rounded text-xs">Esc</kbd> Close Add Customer panel</div>
</div>
</div>
</div>`,
    screenshots: [
      { type: "image", url: "/help-screenshots/partner-customers/main-page.png", alt: "Partner Customers Main Page", description: "Full view of the Partner Customers page showing the customers table" },
      { type: "image", url: "/help-screenshots/partner-customers/navigation-sidebar.png", alt: "Navigation Sidebar", description: "Left navigation sidebar showing Customers menu item" },
      { type: "image", url: "/help-screenshots/partner-customers/add-customer-button.png", alt: "Add Customer Button", description: "Header section with Add Customer button highlighted" },
      { type: "image", url: "/help-screenshots/partner-customers/customer-type-selection.png", alt: "Customer Type Selection", description: "Add Customer panel showing New Customer vs Existing Customer options" },
      { type: "image", url: "/help-screenshots/partner-customers/cloud-provider-selection.png", alt: "Cloud Provider Selection", description: "Cloud provider selection cards for AWS, Azure, and GCP" },
      { type: "image", url: "/help-screenshots/partner-customers/customer-information-form.png", alt: "Customer Information Form", description: "Form fields for entering customer information" },
      { type: "image", url: "/help-screenshots/partner-customers/tenant-detection-before.png", alt: "Tenant Detection Before", description: "Cloud Tenant Detection section before running detection" },
      { type: "image", url: "/help-screenshots/partner-customers/tenant-detection-loading.png", alt: "Tenant Detection Loading", description: "Tenant detection in progress with loading indicator" },
      { type: "image", url: "/help-screenshots/partner-customers/tenant-detection-results.png", alt: "Tenant Detection Results", description: "Detected cloud tenants with account details and costs" },
      { type: "image", url: "/help-screenshots/partner-customers/service-selection.png", alt: "Service Selection", description: "Additional cloud services selection interface" },
      { type: "image", url: "/help-screenshots/partner-customers/add-customer-success.png", alt: "Add Customer Success", description: "Success notification after adding a customer" },
      { type: "image", url: "/help-screenshots/partner-customers/customers-table.png", alt: "Customers Table", description: "Customers table showing customer data with all columns" },
      { type: "image", url: "/help-screenshots/partner-customers/search-functionality.png", alt: "Search Functionality", description: "Search bar with search term and filtered results" },
      { type: "image", url: "/help-screenshots/partner-customers/pagination-controls.png", alt: "Pagination Controls", description: "Pagination controls showing page numbers and navigation" },
      { type: "image", url: "/help-screenshots/partner-customers/customer-detail-view.png", alt: "Customer Detail View", description: "Full customer detail view with overview and metrics" },
      { type: "image", url: "/help-screenshots/partner-customers/billing-information.png", alt: "Billing Information", description: "Billing Information card with payment details" },
      { type: "image", url: "/help-screenshots/partner-customers/subscription-details.png", alt: "Subscription Details", description: "Subscription Details table showing all active subscriptions" }
    ],
    videos: [
      { type: "video", url: "https://example.com/video-partner-customers", title: "Partner Customers Guide", description: "Complete walkthrough of managing partner customers" }
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

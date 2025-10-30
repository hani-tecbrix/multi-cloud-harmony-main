import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Eye, Cloud, Database, ArrowLeft, ShoppingCart, Check, Star, Shield, Zap, Users, Clock, ChevronRight, Trash2, CreditCard, MapPin, Mail, Phone, Building2, Loader2, Globe, UserPlus, UserCheck } from "lucide-react";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCart } from "@/contexts/CartContext";
import { useSearchParams, useNavigate } from "react-router-dom";

// Get logo from multiple CDN sources
const logoUrlMap: { [key: string]: string } = {
  // Cloud Providers
  "amazon.com": "https://cdn.brandfetch.io/idVoqFQ-78/w/128/h/128/theme/dark/icon.png",
  "microsoft.com": "https://cdn.brandfetch.io/idgS27aNck/w/128/h/128/theme/dark/icon.png",
  "google.com": "https://cdn.brandfetch.io/idqwPsNkb7/w/128/h/128/theme/dark/icon.png",
  
  // Productivity & Collaboration
  "idsWBrtc_i": "https://cdn.brandfetch.io/idsWBrtc_i/w/128/h/128/theme/dark/icon.png", // Microsoft 365
  "slack.com": "https://cdn.brandfetch.io/idJ_HhtG0Z/w/128/h/128/fallback/lettermark/icon.webp?c=1ax1761845184782bfumLaCV7mkRY04hIe",
  "zoom.us": "https://cdn.brandfetch.io/id3aO4Szj3/w/128/h/128/theme/dark/icon.png",
  "atlassian.com": "https://cdn.brandfetch.io/idlQIwGMOK/w/128/h/128/theme/dark/icon.png",
  "asana.com": "https://cdn.brandfetch.io/idDgVMQq-T/w/128/h/128/theme/dark/icon.png",
  "notion.so": "https://cdn.brandfetch.io/idAnl0GK3J/w/128/h/128/theme/dark/icon.png",
  "monday.com": "https://cdn.brandfetch.io/idHFUcTb1F/w/128/h/128/fallback/lettermark/icon.webp?c=1ax1761844826900bfumLaCV7mUZw33sQd",
  "trello.com": "https://cdn.brandfetch.io/idhiE33Q5g/w/128/h/128/theme/dark/icon.png",
  
  // CRM & Sales
  "salesforce.com": "https://cdn.brandfetch.io/idw382nG0m/w/128/h/128/theme/dark/icon.png",
  "hubspot.com": "https://cdn.brandfetch.io/idJ73K8MBr/w/128/h/128/theme/dark/icon.png",
  "zendesk.com": "https://cdn.brandfetch.io/idNq8SRGPd/w/128/h/128/fallback/lettermark/icon.webp?c=1ax1761844853773bfumLaCV7mfDFZ8i_C",
  "intercom.com": "https://cdn.brandfetch.io/idTG7sOdGX/w/128/h/128/theme/dark/icon.png",
  
  // Development & DevOps
  "github.com": "https://cdn.brandfetch.io/idZAyF9rlg/w/128/h/128/theme/dark/icon.png",
  "gitlab.com": "https://cdn.brandfetch.io/idV_AC9qS-/w/128/h/128/theme/dark/icon.png",
  "docker.com": "https://cdn.brandfetch.io/idD-OWLqXC/w/128/h/128/theme/dark/icon.png",
  "datadoghq.com": "https://cdn.brandfetch.io/idg33VVWFZ/w/128/h/128/theme/dark/icon.png",
  "newrelic.com": "https://cdn.brandfetch.io/id0xeHmxWQ/w/128/h/128/theme/dark/icon.png",
  
  // Design & Creative
  "adobe.com": "https://cdn.brandfetch.io/idkrQGARPW/w/128/h/128/theme/dark/icon.png",
  "figma.com": "https://cdn.brandfetch.io/idZHcZ_i7F/w/128/h/128/fallback/lettermark/icon.webp?c=1ax1761844252993bfumLaCV7msFWUWiYY",
  "canva.com": "https://cdn.brandfetch.io/idh7FJcr6g/w/128/h/128/theme/dark/icon.png",
  
  // Data & Analytics
  "snowflake.com": "https://cdn.brandfetch.io/id7jO3Y8mr/w/128/h/128/theme/dark/icon.png",
  "tableau.com": "https://cdn.brandfetch.io/id3xLZ3VKT/w/128/h/128/theme/dark/icon.png",
  "databricks.com": "https://cdn.brandfetch.io/idUl8AxRFh/w/128/h/128/theme/dark/icon.png",
  
  // E-commerce & Retail
  "shopify.com": "https://cdn.brandfetch.io/idqwQ6r3S4/w/128/h/128/theme/dark/icon.png",
  "stripe.com": "https://cdn.brandfetch.io/idzP5YfnqZ/w/128/h/128/theme/dark/icon.png",
  
  // HR & Recruiting
  "workday.com": "https://cdn.brandfetch.io/idKMuXCmuf/w/128/h/128/theme/dark/icon.png",
  "bamboohr.com": "https://cdn.brandfetch.io/id0v8CvAOL/w/128/h/128/theme/dark/icon.png",
};

const getLogoUrl = (domain: string) => {
  return logoUrlMap[domain] || `https://img.logo.dev/${domain}?token=pk_X-1ZO13CREWLfXv9Z5h6xQ`;
};

// Enhanced cloud providers with products (excluding Oracle and IBM)
const cloudProviders = [
  { 
    id: 1,
    name: "Amazon AWS", 
    type: "Consumption", 
    category: "Cloud Infrastructure", 
    domain: "amazon.com",
    description: "Scalable cloud computing platform",
    products: [
      {
        id: "aws-ec2",
        name: "Amazon EC2",
        description: "Scalable compute capacity in the cloud",
        features: ["Virtual servers", "Auto scaling", "Multiple instance types", "Pay-as-you-go pricing"],
        plans: [
          { name: "t3.micro", price: 0.0104, period: "per hour", specs: "1 vCPU, 1 GB RAM" },
          { name: "t3.small", price: 0.0208, period: "per hour", specs: "2 vCPU, 2 GB RAM" },
          { name: "t3.medium", price: 0.0416, period: "per hour", specs: "2 vCPU, 4 GB RAM" },
          { name: "m5.large", price: 0.096, period: "per hour", specs: "2 vCPU, 8 GB RAM" }
        ]
      },
      {
        id: "aws-s3",
        name: "Amazon S3",
        description: "Object storage built to store and retrieve any amount of data",
        features: ["99.999999999% durability", "Unlimited storage", "Multiple storage classes", "Global availability"],
        plans: [
          { name: "Standard", price: 0.023, period: "per GB/month", specs: "Frequently accessed data" },
          { name: "IA", price: 0.0125, period: "per GB/month", specs: "Infrequently accessed data" },
          { name: "Glacier", price: 0.004, period: "per GB/month", specs: "Long-term archival" }
        ]
      },
      {
        id: "aws-rds",
        name: "Amazon RDS",
        description: "Managed relational database service",
        features: ["Multiple database engines", "Automated backups", "High availability", "Scaling"],
        plans: [
          { name: "db.t3.micro", price: 0.017, period: "per hour", specs: "1 vCPU, 1 GB RAM" },
          { name: "db.t3.small", price: 0.034, period: "per hour", specs: "2 vCPU, 2 GB RAM" },
          { name: "db.r5.large", price: 0.24, period: "per hour", specs: "2 vCPU, 16 GB RAM" }
        ]
      }
    ]
  },
  { 
    id: 2,
    name: "Microsoft Azure", 
    type: "Consumption", 
    category: "Cloud Infrastructure", 
    domain: "microsoft.com",
    description: "Enterprise cloud services",
    products: [
      {
        id: "azure-vm",
        name: "Azure Virtual Machines",
        description: "Scalable on-demand computing resources",
        features: ["Windows & Linux VMs", "Auto scaling", "Hybrid cloud", "Enterprise security"],
        plans: [
          { name: "B1s", price: 0.0052, period: "per hour", specs: "1 vCPU, 1 GB RAM" },
          { name: "B2s", price: 0.0104, period: "per hour", specs: "2 vCPU, 4 GB RAM" },
          { name: "D2s v3", price: 0.096, period: "per hour", specs: "2 vCPU, 8 GB RAM" },
          { name: "D4s v3", price: 0.192, period: "per hour", specs: "4 vCPU, 16 GB RAM" }
        ]
      },
      {
        id: "azure-sql",
        name: "Azure SQL Database",
        description: "Fully managed relational database",
        features: ["Built-in intelligence", "Automatic tuning", "High availability", "Security"],
        plans: [
          { name: "Basic", price: 4.99, period: "per month", specs: "5 DTU, 2 GB storage" },
          { name: "Standard S0", price: 15, period: "per month", specs: "10 DTU, 250 GB storage" },
          { name: "Premium P1", price: 125, period: "per month", specs: "125 DTU, 500 GB storage" }
        ]
      }
    ]
  },
  { 
    id: 3,
    name: "Google Cloud", 
    type: "Consumption", 
    category: "Cloud Infrastructure", 
    domain: "google.com",
    description: "AI-powered cloud solutions",
    products: [
      {
        id: "gcp-compute",
        name: "Compute Engine",
        description: "Scalable virtual machines",
        features: ["Preemptible instances", "Custom machine types", "Live migration", "Global load balancing"],
        plans: [
          { name: "e2-micro", price: 0.006, period: "per hour", specs: "0.25-2 vCPU, 1 GB RAM" },
          { name: "e2-small", price: 0.012, period: "per hour", specs: "0.5-2 vCPU, 2 GB RAM" },
          { name: "e2-medium", price: 0.024, period: "per hour", specs: "1-2 vCPU, 4 GB RAM" },
          { name: "n1-standard-1", price: 0.0475, period: "per hour", specs: "1 vCPU, 3.75 GB RAM" }
        ]
      },
      {
        id: "gcp-storage",
        name: "Cloud Storage",
        description: "Object storage for any amount of data",
        features: ["Multi-regional", "Nearline storage", "Coldline storage", "Archive storage"],
        plans: [
          { name: "Standard", price: 0.020, period: "per GB/month", specs: "Frequently accessed data" },
          { name: "Nearline", price: 0.010, period: "per GB/month", specs: "Accessed once per month" },
          { name: "Coldline", price: 0.004, period: "per GB/month", specs: "Accessed once per year" }
        ]
      }
    ]
  }
];

const saasProviders = [
  { 
    id: 1,
    name: "Microsoft 365", 
    type: "License", 
    category: "Productivity", 
    domain: "idsWBrtc_i",
    description: "Office productivity suite",
    products: [
      {
        id: "office365-business",
        name: "Microsoft 365 Business Standard",
        description: "Complete productivity suite for businesses",
        features: ["Office apps", "Exchange email", "Teams", "SharePoint", "OneDrive"],
        plans: [
          { name: "Business Basic", price: 6, period: "per user/month", specs: "Web and mobile apps only" },
          { name: "Business Standard", price: 12.50, period: "per user/month", specs: "Desktop apps + web apps" },
          { name: "Business Premium", price: 22, period: "per user/month", specs: "All features + security" }
        ]
      },
      {
        id: "office365-enterprise",
        name: "Microsoft 365 Enterprise",
        description: "Enterprise-grade productivity and security",
        features: ["Advanced security", "Compliance tools", "Analytics", "Power Platform"],
        plans: [
          { name: "E3", price: 36, period: "per user/month", specs: "Core productivity + security" },
          { name: "E5", price: 57, period: "per user/month", specs: "Advanced security + analytics" }
        ]
      }
    ]
  },
  { 
    id: 2,
    name: "Salesforce", 
    type: "License", 
    category: "CRM", 
    domain: "salesforce.com",
    description: "Customer relationship management platform",
    products: [
      {
        id: "salesforce-essentials",
        name: "Salesforce CRM",
        description: "Complete CRM solution for sales and service teams",
        features: ["Contact management", "Lead tracking", "Email integration", "Mobile app", "Reports & Dashboards"],
        plans: [
          { name: "Essentials", price: 25, period: "per user/month", specs: "Up to 10 users" },
          { name: "Professional", price: 75, period: "per user/month", specs: "Complete CRM for any size team" },
          { name: "Enterprise", price: 150, period: "per user/month", specs: "Advanced customization" },
          { name: "Unlimited", price: 300, period: "per user/month", specs: "Unlimited support" }
        ]
      }
    ]
  },
  { 
    id: 3,
    name: "Slack", 
    type: "License", 
    category: "Communication", 
    domain: "slack.com",
    description: "Team collaboration platform",
    products: [
      {
        id: "slack-pro",
        name: "Slack Workspace",
        description: "Advanced collaboration features",
        features: ["Unlimited message history", "Screen sharing", "Workflow builder", "Integrations"],
        plans: [
          { name: "Free", price: 0, period: "per user/month", specs: "Basic features" },
          { name: "Pro", price: 7.25, period: "per user/month", specs: "Advanced features" },
          { name: "Business+", price: 12.50, period: "per user/month", specs: "Enterprise features" },
          { name: "Enterprise Grid", price: 0, period: "per user/month", specs: "Contact sales" }
        ]
      }
    ]
  },
  { 
    id: 4,
    name: "Zoom", 
    type: "License", 
    category: "Communication", 
    domain: "zoom.us",
    description: "Video conferencing platform",
    products: [
      {
        id: "zoom-meetings",
        name: "Zoom Meetings",
        description: "Enterprise video conferencing",
        features: ["HD video & audio", "Screen sharing", "Recording", "Breakout rooms", "Virtual backgrounds"],
        plans: [
          { name: "Basic", price: 0, period: "per month", specs: "40 min limit, 100 participants" },
          { name: "Pro", price: 15.99, period: "per host/month", specs: "30 hour limit, 100 participants" },
          { name: "Business", price: 19.99, period: "per host/month", specs: "300 participants" },
          { name: "Enterprise", price: 19.99, period: "per host/month", specs: "500 participants" }
        ]
      }
    ]
  },
  { 
    id: 5,
    name: "HubSpot", 
    type: "License", 
    category: "CRM", 
    domain: "hubspot.com",
    description: "All-in-one CRM, marketing, and sales platform",
    products: [
      {
        id: "hubspot-crm",
        name: "HubSpot CRM Suite",
        description: "Integrated CRM and marketing automation",
        features: ["Contact management", "Email marketing", "Landing pages", "Marketing automation", "Analytics"],
        plans: [
          { name: "Free", price: 0, period: "per month", specs: "Basic CRM tools" },
          { name: "Starter", price: 50, period: "per month", specs: "Essential marketing tools" },
          { name: "Professional", price: 800, period: "per month", specs: "Advanced automation" },
          { name: "Enterprise", price: 3200, period: "per month", specs: "Enterprise features" }
        ]
      }
    ]
  },
  { 
    id: 6,
    name: "Atlassian Jira", 
    type: "License", 
    category: "Project Management", 
    domain: "atlassian.com",
    description: "Project and issue tracking software",
    products: [
      {
        id: "jira-software",
        name: "Jira Software",
        description: "Agile project management tool",
        features: ["Scrum & Kanban boards", "Custom workflows", "Reporting", "Integrations", "Automation"],
        plans: [
          { name: "Free", price: 0, period: "per month", specs: "Up to 10 users" },
          { name: "Standard", price: 7.50, period: "per user/month", specs: "For growing teams" },
          { name: "Premium", price: 14.50, period: "per user/month", specs: "Advanced features" },
          { name: "Enterprise", price: 0, period: "per user/month", specs: "Contact sales" }
        ]
      }
    ]
  },
  { 
    id: 7,
    name: "Adobe Creative Cloud", 
    type: "License", 
    category: "Design", 
    domain: "adobe.com",
    description: "Professional creative applications",
    products: [
      {
        id: "adobe-cc",
        name: "Creative Cloud All Apps",
        description: "Complete collection of Adobe creative apps",
        features: ["Photoshop", "Illustrator", "InDesign", "Premiere Pro", "After Effects", "100GB cloud storage"],
        plans: [
          { name: "Individual", price: 54.99, period: "per month", specs: "All apps + services" },
          { name: "Business", price: 84.99, period: "per user/month", specs: "Business features" },
          { name: "Student", price: 19.99, period: "per month", specs: "60% discount" }
        ]
      }
    ]
  },
  { 
    id: 8,
    name: "GitHub", 
    type: "License", 
    category: "Development", 
    domain: "github.com",
    description: "Code hosting and collaboration platform",
    products: [
      {
        id: "github-enterprise",
        name: "GitHub Enterprise",
        description: "Complete developer platform",
        features: ["Unlimited repositories", "Actions CI/CD", "Advanced security", "Team management", "Support"],
        plans: [
          { name: "Free", price: 0, period: "per month", specs: "Unlimited public repositories" },
          { name: "Team", price: 4, period: "per user/month", specs: "Private repositories" },
          { name: "Enterprise", price: 21, period: "per user/month", specs: "Advanced security & support" }
        ]
      }
    ]
  },
  { 
    id: 9,
    name: "Shopify", 
    type: "License", 
    category: "E-commerce", 
    domain: "shopify.com",
    description: "Complete e-commerce platform",
    products: [
      {
        id: "shopify-store",
        name: "Shopify Online Store",
        description: "Build and manage your online store",
        features: ["Custom domain", "SSL certificate", "24/7 support", "Abandoned cart recovery", "Discount codes"],
        plans: [
          { name: "Basic", price: 39, period: "per month", specs: "Everything to start selling" },
          { name: "Shopify", price: 105, period: "per month", specs: "Professional reports" },
          { name: "Advanced", price: 399, period: "per month", specs: "Advanced reports & shipping" },
          { name: "Plus", price: 2000, period: "per month", specs: "Enterprise solutions" }
        ]
      }
    ]
  },
  { 
    id: 10,
    name: "Datadog", 
    type: "License", 
    category: "Monitoring", 
    domain: "datadoghq.com",
    description: "Cloud monitoring and security platform",
    products: [
      {
        id: "datadog-monitoring",
        name: "Datadog Platform",
        description: "Full-stack observability",
        features: ["Infrastructure monitoring", "APM", "Log management", "Synthetic monitoring", "Security"],
        plans: [
          { name: "Free", price: 0, period: "per month", specs: "5 hosts, 1-day retention" },
          { name: "Pro", price: 15, period: "per host/month", specs: "15-month retention" },
          { name: "Enterprise", price: 23, period: "per host/month", specs: "Advanced features" }
        ]
      }
    ]
  },
  { 
    id: 11,
    name: "Notion", 
    type: "License", 
    category: "Productivity", 
    domain: "notion.so",
    description: "All-in-one workspace",
    products: [
      {
        id: "notion-workspace",
        name: "Notion Workspace",
        description: "Connected workspace for wiki, docs, and projects",
        features: ["Unlimited pages", "Collaborative workspace", "API access", "Advanced permissions", "Version history"],
        plans: [
          { name: "Free", price: 0, period: "per month", specs: "For individuals" },
          { name: "Plus", price: 10, period: "per user/month", specs: "For small teams" },
          { name: "Business", price: 18, period: "per user/month", specs: "For companies" },
          { name: "Enterprise", price: 0, period: "per user/month", specs: "Contact sales" }
        ]
      }
    ]
  },
  { 
    id: 12,
    name: "Monday.com", 
    type: "License", 
    category: "Project Management", 
    domain: "monday.com",
    description: "Work operating system",
    products: [
      {
        id: "monday-work-os",
        name: "Monday Work OS",
        description: "Flexible project management platform",
        features: ["Custom workflows", "Automations", "Integrations", "Dashboards", "Time tracking"],
        plans: [
          { name: "Individual", price: 0, period: "per month", specs: "Up to 2 seats" },
          { name: "Basic", price: 8, period: "per seat/month", specs: "Essential features" },
          { name: "Standard", price: 10, period: "per seat/month", specs: "Advanced features" },
          { name: "Pro", price: 16, period: "per seat/month", specs: "Complete features" }
        ]
      }
    ]
  },
  { 
    id: 13,
    name: "Zendesk", 
    type: "License", 
    category: "Customer Support", 
    domain: "zendesk.com",
    description: "Customer service software",
    products: [
      {
        id: "zendesk-support",
        name: "Zendesk Support",
        description: "Customer support ticketing system",
        features: ["Email, chat, phone", "Ticket management", "Knowledge base", "Reporting", "Mobile apps"],
        plans: [
          { name: "Suite Team", price: 49, period: "per agent/month", specs: "For small teams" },
          { name: "Suite Growth", price: 79, period: "per agent/month", specs: "For growing teams" },
          { name: "Suite Professional", price: 99, period: "per agent/month", specs: "Advanced features" },
          { name: "Suite Enterprise", price: 150, period: "per agent/month", specs: "Complete control" }
        ]
      }
    ]
  },
  { 
    id: 14,
    name: "Figma", 
    type: "License", 
    category: "Design", 
    domain: "figma.com",
    description: "Collaborative interface design tool",
    products: [
      {
        id: "figma-design",
        name: "Figma Design",
        description: "Collaborative design platform",
        features: ["Real-time collaboration", "Prototyping", "Design systems", "Developer handoff", "Plugins"],
        plans: [
          { name: "Starter", price: 0, period: "per month", specs: "3 files, unlimited drafts" },
          { name: "Professional", price: 12, period: "per editor/month", specs: "Unlimited files" },
          { name: "Organization", price: 45, period: "per editor/month", specs: "Advanced security" },
          { name: "Enterprise", price: 75, period: "per editor/month", specs: "Enterprise features" }
        ]
      }
    ]
  },
  { 
    id: 15,
    name: "Asana", 
    type: "License", 
    category: "Project Management", 
    domain: "asana.com",
    description: "Work management platform",
    products: [
      {
        id: "asana-work",
        name: "Asana Work Management",
        description: "Organize and manage team projects",
        features: ["Tasks & projects", "Timelines", "Portfolios", "Goals", "Workload management", "Automations"],
        plans: [
          { name: "Basic", price: 0, period: "per month", specs: "Core features for individuals" },
          { name: "Premium", price: 10.99, period: "per user/month", specs: "For teams" },
          { name: "Business", price: 24.99, period: "per user/month", specs: "For organizations" },
          { name: "Enterprise", price: 0, period: "per user/month", specs: "Contact sales" }
        ]
      }
    ]
  }
];

const Marketplace = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<typeof cloudProviders[0] | typeof saasProviders[0] | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showCustomerSelection, setShowCustomerSelection] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerType, setCustomerType] = useState<"new" | "existing">("new");
  const [checkoutData, setCheckoutData] = useState({
    // Existing customer fields
    domain: "",
    
    // New customer fields
    company: "",
    cloud: "",
    plan: "",
    consumer: "",
    name: "",
    primaryDomain: "",
    reference: "",
    invoiceProfile: "",
    endCustomer: "",
    phone: "",
    address: "",
    city: "",
    country: "United States"
  });
  
  // Use CartContext instead of local state
  const { cart, addToCart, removeFromCart, updateQuantity, getTotalItems, getTotalPrice, clearCart } = useCart();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Check if cart should be shown from URL params
  useEffect(() => {
    if (searchParams.get('cart') === 'true') {
      setShowCart(true);
    }
  }, [searchParams]);

  const handleAddProvider = (name: string) => {
    toast.success(`${name} added to your subscriptions!`);
  };

  const handleViewDetails = (provider: typeof cloudProviders[0] | typeof saasProviders[0]) => {
    setSelectedProvider(provider);
  };

  const handleViewProduct = (product: any) => {
    setSelectedProduct(product);
  };

  const handleAddToCart = (product: any, plan: any) => {
    if (!selectedProvider) {
      toast.error("Provider information is missing");
      return;
    }
    addToCart(product, plan, selectedProvider);
  };

  const calculateTotal = () => {
    return getTotalPrice();
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    setShowCustomerSelection(true);
  };

  const handleCustomerSelectionContinue = () => {
    if (customerType === "existing" && !checkoutData.domain) {
      toast.error("Please enter your domain");
      return;
    }
    setShowCustomerSelection(false);
    setShowCheckout(true);
  };

  const handleProcessPayment = async () => {
    if (customerType === "existing") {
      if (!checkoutData.domain) {
        toast.error("Please fill in all required fields");
        return;
      }
    } else {
      if (!checkoutData.company || !checkoutData.name || !checkoutData.primaryDomain) {
        toast.error("Please fill in all required fields");
        return;
      }
    }
    
    setIsProcessing(true);
    
    try {
      // Simulate payment processing with more realistic steps
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate order number
      const orderNumber = `ORD-${Date.now()}`;
      
      // Clear cart after successful payment
      clearCart();
      
      setIsProcessing(false);
      setShowCheckout(false);
      setShowCart(false);
      
      toast.success(`Order ${orderNumber} placed successfully! Your subscriptions will be activated shortly.`);
      
      // Reset form for next order
      setCheckoutData({
        domain: "",
        company: "",
        cloud: "",
        plan: "",
        consumer: "",
        name: "",
        primaryDomain: "",
        reference: "",
        invoiceProfile: "",
        endCustomer: "",
        phone: "",
        address: "",
        city: "",
        country: "United States"
      });
      setCustomerType("new");
      
    } catch (error) {
      setIsProcessing(false);
      toast.error("Payment processing failed. Please try again.");
    }
  };

  const handleBackToProvider = () => {
    setSelectedProduct(null);
  };

  const handleBackToMarketplace = () => {
    setSelectedProvider(null);
    setSelectedProduct(null);
  };

  // Product Detail View
  if (selectedProduct) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={handleBackToProvider}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to {selectedProvider?.name}
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Product Overview */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                    <img
                      src={getLogoUrl(selectedProvider?.domain || "")}
                      alt={selectedProvider?.name}
                      className="w-12 h-12 object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div className="hidden w-12 h-12 items-center justify-center">
                      <Cloud className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold">{selectedProduct.name}</h1>
                    <p className="text-muted-foreground mt-2">{selectedProduct.description}</p>
                    <div className="flex items-center gap-4 mt-4">
                      <Badge variant="outline" className="bg-primary/10 text-primary">
                        {selectedProvider?.type}
                      </Badge>
                      <Badge variant="outline">{selectedProvider?.category}</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" />
                  Key Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-2">
                  {selectedProduct.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pricing Plans */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-primary" />
                  Pricing Plans
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Plan</TableHead>
                      <TableHead>Specifications</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-center">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedProduct.plans.map((plan: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{plan.name}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{plan.specs}</TableCell>
                        <TableCell className="text-right font-semibold">
                          ${plan.price}{plan.period.includes('hour') ? '/hr' : plan.period.includes('month') ? '/mo' : plan.period.includes('GB') ? '/GB' : ''}
                        </TableCell>
                        <TableCell className="text-center">
                          <Button
                            size="sm"
                            onClick={() => handleAddToCart(selectedProduct, plan)}
                            className="bg-primary-10 hover:bg-primary/90 text-primary hover:text-white shadow-md"
                          >
                            <ShoppingCart className="h-4 w-4 mr-1" />
                            Add to Cart
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Provider Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Provider Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <img
                      src={getLogoUrl(selectedProvider?.domain || "")}
                      alt={selectedProvider?.name}
                      className="w-8 h-8 object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div className="hidden w-8 h-8 items-center justify-center">
                      <Cloud className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold">{selectedProvider?.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedProvider?.category}</p>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-gray-600" />
                    <span className="text-sm">Enterprise Security</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-gray-600" />
                    <span className="text-sm">High Performance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-600" />
                    <span className="text-sm">24/7 Support</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cart Summary */}
            {cart.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Cart Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between text-sm">
                        <div className="flex-1">
                          <p className="font-medium">{item.product.name}</p>
                          <p className="text-muted-foreground">{item.plan.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">
                            ${(item.plan.price * item.quantity).toFixed(2)}{item.plan.period.includes('hour') ? '/hr' : item.plan.period.includes('month') ? '/mo' : ''}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 h-6 w-6 p-0"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Separator className="my-4" />
                  <div className="flex items-center justify-between font-semibold">
                    <span>Total Items:</span>
                    <span>{getTotalItems()}</span>
                  </div>
                  <Separator className="my-4" />
                  <Button 
                    className="w-full"
                    onClick={() => navigate("/checkout")}
                    variant="gradient"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Proceed Order
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Provider Detail View
  if (selectedProvider) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={handleBackToMarketplace}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Marketplace
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
            <img
              src={getLogoUrl(selectedProvider.domain)}
              alt={selectedProvider.name}
              className="w-12 h-12 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            <div className="hidden w-12 h-12 items-center justify-center">
              <Cloud className="h-8 w-8 text-primary" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold">{selectedProvider.name}</h1>
            <p className="text-muted-foreground mt-1">{selectedProvider.description}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {selectedProvider.type}
              </Badge>
              <Badge variant="outline">{selectedProvider.category}</Badge>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {selectedProvider.products.map((product) => (
            <Card 
              key={product.id}
              className="group relative overflow-hidden border-0 bg-gradient-to-br from-card to-card/50 shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 hover:scale-[1.02]"
              onClick={() => handleViewProduct(product)}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <CardContent className="p-6 relative z-10">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors duration-300">
                      {product.name}
                    </h3>
                    <div className="transform transition-transform duration-300 group-hover:translate-x-1">
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                  <div className="space-y-2">
                    {product.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 animate-in fade-in slide-in-from-left-1">
                        <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <Check className="h-2.5 w-2.5 text-green-600" />
                        </div>
                        <span className="text-xs text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2">
                    <Badge variant="outline" className="text-xs font-medium shadow-sm">
                      Starting at ${product.plans[0].price}{product.plans[0].period.includes('hour') ? '/hr' : product.plans[0].period.includes('month') ? '/mo' : ''}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Cart View
  if (showCart && !selectedProduct && !selectedProvider) {
    return (
      <>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Shopping Cart</h1>
              <p className="text-sm text-muted-foreground mt-1">{cart.length} items in your cart</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => setShowCart(false)}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
              {cart.length > 0 && (
                <Button onClick={handleCheckout} className="bg-primary hover:bg-primary/90">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Proceed to Checkout
                </Button>
              )}
            </div>
          </div>

          {cart.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
                <p className="text-muted-foreground mb-4">Start adding products to your cart to continue</p>
                <Button onClick={() => setShowCart(false)} className="bg-primary hover:bg-primary/90">
                  Browse Marketplace
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-4">
                {cart.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Cloud className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold">{item.product.name}</h3>
                              <p className="text-sm text-muted-foreground">{item.plan.name}</p>
                              <p className="text-xs text-muted-foreground mt-1">{item.plan.specs}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex items-center gap-4 mt-4">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                -
                              </Button>
                              <span className="w-12 text-center font-medium">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                +
                              </Button>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">
                                ${(item.plan.price * item.quantity).toFixed(2)}{item.plan.period.includes('hour') ? '/hr' : item.plan.period.includes('month') ? '/mo' : ''}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${calculateTotal().toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Tax</span>
                        <span>${(calculateTotal() * 0.08).toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>${(calculateTotal() * 1.08).toFixed(2)}</span>
                      </div>
                    </div>
                    <Separator />
                    <Button 
                      className="w-full" 
                      onClick={handleCheckout}
                      variant="gradient"
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      Checkout
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>

        {/* Customer Selection Dialog */}
        <Dialog open={showCustomerSelection} onOpenChange={setShowCustomerSelection}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <UserCheck className="h-5 w-5 text-primary" />
                Customer Selection
              </DialogTitle>
              <DialogDescription>
                Are you a new customer or an existing customer?
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <RadioGroup value={customerType} onValueChange={(value) => setCustomerType(value as "new" | "existing")}>
                <div className="grid gap-4">
                  {/* Existing Customer Option */}
                  <label
                    htmlFor="existing"
                    className={`flex flex-col space-y-3 rounded-lg border-2 p-4 cursor-pointer transition-all duration-300 ${
                      customerType === "existing"
                        ? "border-primary bg-primary/5 shadow-md"
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
                          I already have an account with this domain
                        </p>
                      </div>
                    </div>
                    {customerType === "existing" && (
                      <div className="ml-7 space-y-2 animate-in slide-in-from-top-2">
                        <Label htmlFor="domain">Your Domain *</Label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="domain"
                            placeholder="example.com"
                            value={checkoutData.domain}
                            onChange={(e) => setCheckoutData({...checkoutData, domain: e.target.value})}
                            className="pl-9"
                          />
                        </div>
                      </div>
                    )}
                  </label>

                  {/* New Customer Option */}
                  <label
                    htmlFor="new"
                    className={`flex flex-col space-y-3 rounded-lg border-2 p-4 cursor-pointer transition-all duration-300 ${
                      customerType === "new"
                        ? "border-primary bg-primary/5 shadow-md"
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
                          Create a new account and complete registration
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
              </RadioGroup>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCustomerSelection(false)}>
                Cancel
              </Button>
              <Button onClick={handleCustomerSelectionContinue} className="bg-primary hover:bg-primary/90">
                Continue
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Checkout Dialog */}
        <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <CreditCard className="h-5 w-5 text-primary" />
                Checkout
              </DialogTitle>
              <DialogDescription>
                {customerType === "existing" 
                  ? "Please review your order and confirm your domain"
                  : "Please review your order and complete your registration"}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Order Summary */}
              <Card className="border-2">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-sm p-2 rounded-lg hover:bg-muted/50 transition-colors">
                      <div>
                        <p className="font-medium">{item.product.name} - {item.plan.name}</p>
                        <p className="text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-semibold">
                        ${(item.plan.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-lg text-primary">${(calculateTotal() * 1.08).toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Information */}
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2 text-lg">
                  <Building2 className="h-5 w-5 text-primary" />
                  {customerType === "existing" ? "Customer Information" : "Registration Information"}
                </h3>

                {customerType === "existing" ? (
                  /* Existing Customer Form */
                  <Card className="border-2">
                    <CardContent className="pt-6 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="existing-domain" className="flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          Domain *
                        </Label>
                        <Input
                          id="existing-domain"
                          placeholder="example.com"
                          value={checkoutData.domain}
                          onChange={(e) => setCheckoutData({...checkoutData, domain: e.target.value})}
                          className="font-mono"
                        />
                        <p className="text-xs text-muted-foreground">
                          Enter your registered domain to continue
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  /* New Customer Form */
                  <Card className="border-2">
                    <CardContent className="pt-6 space-y-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="company">Company *</Label>
                          <Input
                            id="company"
                            placeholder="Company Name"
                            value={checkoutData.company}
                            onChange={(e) => setCheckoutData({...checkoutData, company: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="name">Name *</Label>
                          <Input
                            id="name"
                            placeholder="Full Name"
                            value={checkoutData.name}
                            onChange={(e) => setCheckoutData({...checkoutData, name: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="primaryDomain">Primary Domain *</Label>
                          <div className="relative">
                            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="primaryDomain"
                              placeholder="example.com"
                              value={checkoutData.primaryDomain}
                              onChange={(e) => setCheckoutData({...checkoutData, primaryDomain: e.target.value})}
                              className="pl-9 font-mono"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cloud">Cloud Provider</Label>
                          <Select value={checkoutData.cloud} onValueChange={(value) => setCheckoutData({...checkoutData, cloud: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select cloud provider" />
                            </SelectTrigger>
                            <SelectContent>
                              {cloudProviders.map((provider) => (
                                <SelectItem key={provider.id} value={provider.name}>
                                  {provider.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="plan">Plan</Label>
                          <Input
                            id="plan"
                            placeholder="Selected plan"
                            value={checkoutData.plan}
                            onChange={(e) => setCheckoutData({...checkoutData, plan: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="consumer">Consumer</Label>
                          <Input
                            id="consumer"
                            placeholder="Consumer name"
                            value={checkoutData.consumer}
                            onChange={(e) => setCheckoutData({...checkoutData, consumer: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="reference">Reference (Optional)</Label>
                          <Input
                            id="reference"
                            placeholder="Reference code or number"
                            value={checkoutData.reference}
                            onChange={(e) => setCheckoutData({...checkoutData, reference: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="invoiceProfile">Invoice Profile</Label>
                          <Input
                            id="invoiceProfile"
                            placeholder="Invoice profile name"
                            value={checkoutData.invoiceProfile}
                            onChange={(e) => setCheckoutData({...checkoutData, invoiceProfile: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="endCustomer">End Customer</Label>
                          <Input
                            id="endCustomer"
                            placeholder="End customer name"
                            value={checkoutData.endCustomer}
                            onChange={(e) => setCheckoutData({...checkoutData, endCustomer: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            placeholder="+1 (555) 123-4567"
                            value={checkoutData.phone}
                            onChange={(e) => setCheckoutData({...checkoutData, phone: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Address</Label>
                          <Input
                            id="address"
                            placeholder="Street address"
                            value={checkoutData.address}
                            onChange={(e) => setCheckoutData({...checkoutData, address: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            placeholder="City"
                            value={checkoutData.city}
                            onChange={(e) => setCheckoutData({...checkoutData, city: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="country">Country</Label>
                          <Input
                            id="country"
                            placeholder="Country"
                            value={checkoutData.country}
                            onChange={(e) => setCheckoutData({...checkoutData, country: e.target.value})}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => {setShowCheckout(false); setShowCustomerSelection(true);}} disabled={isProcessing}>
                Back
              </Button>
              <Button onClick={handleProcessPayment} disabled={isProcessing} className="bg-primary hover:bg-primary/90">
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Place Order
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  // Main Marketplace View
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Marketplace</h1>
          <p className="text-sm text-muted-foreground mt-1">Browse and manage cloud providers and SaaS subscriptions</p>
        </div>
        {cart.length > 0 && (
          <Button className="bg-primary hover:bg-primary/90" onClick={() => setShowCart(true)}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            Cart ({getTotalItems()})
          </Button>
        )}
      </div>

      {/* Cloud Providers Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div>
            <CardTitle className="text-base font-medium">Cloud Providers</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">Infrastructure and platform services</p>
          </div>
          <Badge variant="secondary">{cloudProviders.length} Providers</Badge>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cloudProviders.map((provider) => (
              <Card 
                key={provider.id} 
                className="hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden group relative border"
                onMouseEnter={() => setHoveredCard(provider.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleViewDetails(provider)}
              >
                <CardContent className="p-5">
                  {/* Type Badge - Top Right */}
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="text-xs">
                      {provider.type}
                    </Badge>
                  </div>

                  <div className="flex flex-col space-y-3 min-h-[200px]">
                    {/* Logo - Always Visible */}
                    <div className="flex justify-center">
                      <div className="w-16 h-16 flex items-center justify-center">
                        <img 
                          src={getLogoUrl(provider.domain)} 
                          alt={provider.name}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                        <div className="hidden w-full h-full items-center justify-center">
                          <Cloud className="h-10 w-10 text-muted-foreground" />
                        </div>
                      </div>
                    </div>

                    {/* Provider Name */}
                    <h3 className="font-semibold text-sm text-center">{provider.name}</h3>

                    {/* Description - Default State */}
                    <div className={`flex-1 transition-opacity duration-300 ${
                      hoveredCard === provider.id ? 'opacity-0 absolute' : 'opacity-100'
                    }`}>
                      <p className="text-xs text-muted-foreground text-center line-clamp-3">
                        {provider.description}
                      </p>
                    </div>

                    {/* Category - Hover State */}
                    <div className={`transition-opacity duration-300 ${
                      hoveredCard === provider.id ? 'opacity-100' : 'opacity-0 absolute'
                    }`}>
                      <p className="text-xs text-muted-foreground text-center mb-3">
                        {provider.category}
                      </p>
                    </div>

                    {/* View Details Button - Bottom Right (Hover) */}
                    <div className={`mt-auto transition-opacity duration-300 ${
                      hoveredCard === provider.id ? 'opacity-100' : 'opacity-0 absolute'
                    }`}>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewDetails(provider);
                        }}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* SaaS Providers Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div>
            <CardTitle className="text-base font-medium">SaaS Applications</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">Software as a service subscriptions</p>
          </div>
          <Badge variant="secondary">{saasProviders.length} Applications</Badge>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {saasProviders.map((provider) => (
              <Card 
                key={provider.id} 
                className="hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden group relative border"
                onMouseEnter={() => setHoveredCard(provider.id + 100)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleViewDetails(provider)}
              >
                <CardContent className="p-5">
                  {/* Type Badge - Top Right */}
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="text-xs">
                      {provider.type}
                    </Badge>
                  </div>

                  <div className="flex flex-col space-y-3 min-h-[200px]">
                    {/* Logo - Always Visible */}
                    <div className="flex justify-center">
                      <div className="w-16 h-16 flex items-center justify-center">
                        <img 
                          src={getLogoUrl(provider.domain)} 
                          alt={provider.name}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                        <div className="hidden w-full h-full items-center justify-center">
                          <Database className="h-10 w-10 text-muted-foreground" />
                        </div>
                      </div>
                    </div>

                    {/* Provider Name */}
                    <h3 className="font-semibold text-sm text-center">{provider.name}</h3>

                    {/* Description - Default State */}
                    <div className={`flex-1 transition-opacity duration-300 ${
                      hoveredCard === provider.id + 100 ? 'opacity-0 absolute' : 'opacity-100'
                    }`}>
                      <p className="text-xs text-muted-foreground text-center line-clamp-3">
                        {provider.description}
                      </p>
                    </div>

                    {/* Category - Hover State */}
                    <div className={`transition-opacity duration-300 ${
                      hoveredCard === provider.id + 100 ? 'opacity-100' : 'opacity-0 absolute'
                    }`}>
                      <p className="text-xs text-muted-foreground text-center mb-3">
                        {provider.category}
                      </p>
                    </div>

                    {/* View Details Button - Bottom Right (Hover) */}
                    <div className={`mt-auto transition-opacity duration-300 ${
                      hoveredCard === provider.id + 100 ? 'opacity-100' : 'opacity-0 absolute'
                    }`}>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewDetails(provider);
                        }}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Marketplace;
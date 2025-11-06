import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionCard } from "@/components/SectionCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Eye, Cloud, Database, ArrowLeft, ShoppingCart, Check, Star, Shield, Zap, Users, Clock, ChevronRight, Trash2, CreditCard, MapPin, Mail, Phone, Building2, Loader2, Globe, UserPlus, UserCheck, Search, Filter, ChevronLeft, ChevronRight as ChevronRightIcon } from "lucide-react";
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

// Import vendor icons from vendors-icons folder (for cards)
import awsIcon from "@/assets/vendors-icons/aws.png";
import microsoftIcon from "@/assets/vendors-icons/microsoft.png";
import googleCloudIcon from "@/assets/vendors-icons/google-cloud.png";
import oracleIcon from "@/assets/vendors-icons/oracle.png";

// Import vendor logos from vendors-logos folder (for detail views)
import acronisLogo from "@/assets/vendors-logos/acronis.png";
import archerLogo from "@/assets/vendors-logos/archer.png";
import arcteraLogo from "@/assets/vendors-logos/arctera.png";
import arubaLogo from "@/assets/vendors-logos/aruba.png";
import assuredLogo from "@/assets/vendors-logos/assured-data-protection.png";
import autodeskLogo from "@/assets/vendors-logos/autodesk.png";
import awsLogo from "@/assets/vendors-logos/aws.png";
import barracudaLogo from "@/assets/vendors-logos/barracuda.png";
import bittitanLogo from "@/assets/vendors-logos/bittitan.png";
import ciscoLogo from "@/assets/vendors-logos/cisco.png";
import citrixLogo from "@/assets/vendors-logos/citrix.png";
import cloudflareLogo from "@/assets/vendors-logos/cloudflare.png";
import cohesityLogo from "@/assets/vendors-logos/cohesity.png";
import esetLogo from "@/assets/vendors-logos/eset.png";
import everfoxLogo from "@/assets/vendors-logos/everfox.png";
import forcepointLogo from "@/assets/vendors-logos/forcepoint.png";
import genesysLogo from "@/assets/vendors-logos/genesys.png";
import googleCloudLogo from "@/assets/vendors-logos/google-cloud.png";
import ibmLogo from "@/assets/vendors-logos/ibm.png";
import igelLogo from "@/assets/vendors-logos/igel.png";
import ivantiLogo from "@/assets/vendors-logos/ivanti.png";
import microsoftLogo from "@/assets/vendors-logos/microsoft.png";
import netwitnessLogo from "@/assets/vendors-logos/netwitness.png";
import oneIdentityLogo from "@/assets/vendors-logos/one-identity.png";
import onespanLogo from "@/assets/vendors-logos/onespan.png";
import oracleLogo from "@/assets/vendors-logos/oracle.png";
import outseerLogo from "@/assets/vendors-logos/outseer.png";
import questLogo from "@/assets/vendors-logos/quest.png";
import riverbedLogo from "@/assets/vendors-logos/riverbed.png";
import rsaLogo from "@/assets/vendors-logos/rsa.png";
import rubrikLogo from "@/assets/vendors-logos/rubrik.png";
import skyhighLogo from "@/assets/vendors-logos/skyhigh-security.png";
import softwareAgLogo from "@/assets/vendors-logos/software-ag.png";
import splunkLogo from "@/assets/vendors-logos/splunk.png";
import trellixLogo from "@/assets/vendors-logos/trellix.png";
import trendMicroLogo from "@/assets/vendors-logos/trend-micro.png";
import vectraLogo from "@/assets/vendors-logos/vectra.png";
import vmwareLogo from "@/assets/vendors-logos/vmware.png";

// Vendor name to icon mapping (for cards)
const vendorIconMap: { [key: string]: string } = {
  // Cloud Providers
  "Amazon AWS": awsIcon,
  "Microsoft Azure": microsoftIcon,
  "Google Cloud": googleCloudIcon,
  "Oracle Cloud": oracleIcon,
  "Oracle Cloud SaaS": oracleIcon,
};


// Vendor name to logo mapping (for detail views)
const vendorLogoMap: { [key: string]: string } = {
  // Cloud Providers
  "Amazon AWS": awsLogo,
  "AWS SaaS": awsLogo,
  "Microsoft Azure": microsoftLogo,
  "Microsoft SaaS": microsoftLogo,
  "Microsoft 365": microsoftLogo,
  "Google Cloud": googleCloudLogo,
  "Google Cloud SaaS": googleCloudLogo,
  "Oracle Cloud": oracleLogo,
  "Oracle Cloud SaaS": oracleLogo,
  
  // SaaS Vendors - New
  "Acronis": acronisLogo,
  "Archer": archerLogo,
  "Arctera": arcteraLogo,
  "Aruba (HPE)": arubaLogo,
  "Assured Data Protection": assuredLogo,
  "Autodesk": autodeskLogo,
  "Barracuda": barracudaLogo,
  "BitTitan": bittitanLogo,
  "Citrix": citrixLogo,
  "Cloudflare": cloudflareLogo,
  "Cohesity": cohesityLogo,
  "Forcepoint": forcepointLogo,
  "Genesys": genesysLogo,
  "IBM Cloud SaaS": ibmLogo,
  "IGEL": igelLogo,
  "Ivanti": ivantiLogo,
  "Cisco": ciscoLogo,
  "VMware (by Broadcom)": vmwareLogo,
  "ESET": esetLogo,
  "Everfox": everfoxLogo,
  "NetWitness": netwitnessLogo,
  "One Identity": oneIdentityLogo,
  "OneSpan": onespanLogo,
  "Outseer": outseerLogo,
  "Quest": questLogo,
  "Riverbed": riverbedLogo,
  "RSA": rsaLogo,
  "Rubrik": rubrikLogo,
  "Skyhigh Security": skyhighLogo,
  "Software AG": softwareAgLogo,
  "Splunk (Cisco)": splunkLogo,
  "Trend Micro": trendMicroLogo,
  "Trellix": trellixLogo,
  "Vectra AI": vectraLogo,
};

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

// Get icon URL for cards (prefers icons, falls back to logos)
const getIconUrl = (domain: string, vendorName?: string) => {
  // First try local asset icon if vendor name is provided
  if (vendorName && vendorIconMap[vendorName]) {
    return vendorIconMap[vendorName];
  }
  
  // Fallback to logo if icon not available
  if (vendorName && vendorLogoMap[vendorName]) {
    return vendorLogoMap[vendorName];
  }
  
  // Fallback to domain-based CDN
  return logoUrlMap[domain] || `https://img.logo.dev/${domain}?token=pk_X-1ZO13CREWLfXv9Z5h6xQ`;
};

// Get logo URL for detail views (always uses logos)
const getLogoUrl = (domain: string, vendorName?: string) => {
  // First try local asset logo if vendor name is provided
  if (vendorName && vendorLogoMap[vendorName]) {
    return vendorLogoMap[vendorName];
  }
  
  // Fallback to domain-based CDN
  return logoUrlMap[domain] || `https://img.logo.dev/${domain}?token=pk_X-1ZO13CREWLfXv9Z5h6xQ`;
};

// Enhanced cloud providers with products
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
        id: "azure-licenses",
        name: "Licenses",
        description: "Microsoft software licenses and subscriptions",
        features: ["Microsoft 365", "Windows Server", "SQL Server", "Enterprise agreements", "Volume licensing"],
        plans: [
          { name: "Microsoft 365 E3", price: 36, period: "per user/month", specs: "Full productivity suite" },
          { name: "Microsoft 365 E5", price: 57, period: "per user/month", specs: "Advanced security & analytics" },
          { name: "Windows Server Standard", price: 6, period: "per 2-core pack/month", specs: "Server operating system" },
          { name: "SQL Server Standard", price: 15, period: "per 2-core pack/month", specs: "Database server" }
        ]
      },
      {
        id: "azure-reservation",
        name: "Reservation",
        description: "Azure reserved instances and capacity",
        features: ["Cost savings", "1-year & 3-year terms", "Flexible payment", "Capacity guarantees", "Predictable pricing"],
        plans: [
          { name: "1 Year Reserved", price: 0, period: "per month", specs: "Up to 42% savings, pay upfront" },
          { name: "3 Year Reserved", price: 0, period: "per month", specs: "Up to 72% savings, pay upfront" },
          { name: "1 Year Monthly", price: 0, period: "per month", specs: "Up to 36% savings, monthly payments" },
          { name: "3 Year Monthly", price: 0, period: "per month", specs: "Up to 65% savings, monthly payments" }
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
  },
  { 
    id: 4,
    name: "Oracle Cloud", 
    type: "Consumption", 
    category: "Cloud Infrastructure", 
    domain: "oracle.com",
    description: "Enterprise cloud infrastructure and applications",
    products: [
      {
        id: "oracle-compute",
        name: "Oracle Compute",
        description: "High-performance compute instances",
        features: ["Bare metal instances", "Virtual machines", "Auto scaling", "High performance"],
        plans: [
          { name: "VM.Standard.E2.1", price: 0.042, period: "per hour", specs: "1 OCPU, 8 GB RAM" },
          { name: "VM.Standard.E2.2", price: 0.084, period: "per hour", specs: "2 OCPU, 16 GB RAM" },
          { name: "VM.Standard.E2.4", price: 0.168, period: "per hour", specs: "4 OCPU, 32 GB RAM" },
          { name: "BM.Standard.E2.64", price: 1.344, period: "per hour", specs: "64 OCPU, 512 GB RAM" }
        ]
      },
      {
        id: "oracle-storage",
        name: "Oracle Object Storage",
        description: "Scalable object storage service",
        features: ["Durable storage", "Multiple storage tiers", "Data lifecycle management", "API access"],
        plans: [
          { name: "Standard", price: 0.0255, period: "per GB/month", specs: "Frequently accessed data" },
          { name: "Archive", price: 0.0026, period: "per GB/month", specs: "Long-term archival" }
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
  },
  // New SaaS Vendors
  { 
    id: 16,
    name: "Acronis", 
    type: "License", 
    category: "Security & Backup", 
    domain: "acronis.com",
    description: "Cyber protection, backup, and disaster recovery SaaS",
    products: [
      {
        id: "acronis-cyber-protect",
        name: "Acronis Cyber Protect",
        description: "Complete cyber protection and backup solution",
        features: ["Automated backups", "Disaster recovery", "Malware protection", "Ransomware protection", "Cloud storage"],
        plans: [
          { name: "Essential", price: 69, period: "per user/month", specs: "Basic backup & protection" },
          { name: "Advanced", price: 129, period: "per user/month", specs: "Advanced features & recovery" },
          { name: "Enterprise", price: 249, period: "per user/month", specs: "Complete cyber protection" }
        ]
      }
    ]
  },
  { 
    id: 17,
    name: "Archer", 
    type: "License", 
    category: "Governance & Compliance", 
    domain: "archer.com",
    description: "Governance, risk, and compliance SaaS",
    products: [
      {
        id: "archer-grc",
        name: "Archer GRC Platform",
        description: "Enterprise governance, risk, and compliance management",
        features: ["Risk management", "Compliance tracking", "Policy management", "Audit management", "Reporting"],
        plans: [
          { name: "Starter", price: 0, period: "per month", specs: "Contact sales" },
          { name: "Professional", price: 0, period: "per month", specs: "Contact sales" },
          { name: "Enterprise", price: 0, period: "per month", specs: "Contact sales" }
        ]
      }
    ]
  },
  { 
    id: 18,
    name: "Arctera", 
    type: "License", 
    category: "Monitoring & Analytics", 
    domain: "arctera.com",
    description: "Network analytics and observability SaaS",
    products: [
      {
        id: "arctera-network-analytics",
        name: "Arctera Network Analytics",
        description: "Advanced network analytics and observability platform",
        features: ["Network monitoring", "Traffic analysis", "Performance insights", "Real-time alerts", "Reporting"],
        plans: [
          { name: "Basic", price: 49, period: "per month", specs: "Up to 100 devices" },
          { name: "Professional", price: 149, period: "per month", specs: "Up to 500 devices" },
          { name: "Enterprise", price: 0, period: "per month", specs: "Unlimited devices" }
        ]
      }
    ]
  },
  { 
    id: 19,
    name: "Aruba (HPE)", 
    type: "License", 
    category: "Networking", 
    domain: "arubanetworks.com",
    description: "Cloud-managed networking (Aruba Central)",
    products: [
      {
        id: "aruba-central",
        name: "Aruba Central",
        description: "Cloud-managed networking and Wi-Fi management",
        features: ["Wi-Fi management", "Network monitoring", "Device management", "Analytics", "Security"],
        plans: [
          { name: "Foundation", price: 0, period: "per device/month", specs: "Basic device management" },
          { name: "Advanced", price: 1.99, period: "per device/month", specs: "Advanced features" },
          { name: "Premium", price: 4.99, period: "per device/month", specs: "Complete features" }
        ]
      }
    ]
  },
  { 
    id: 20,
    name: "Assured Data Protection", 
    type: "License", 
    category: "Security & Backup", 
    domain: "assureddp.com",
    description: "Backup and disaster recovery SaaS (Rubrik-based)",
    products: [
      {
        id: "assured-backup",
        name: "Assured Backup Service",
        description: "Enterprise backup and disaster recovery solution",
        features: ["Automated backups", "Disaster recovery", "Data protection", "Cloud storage", "Ransomware protection"],
        plans: [
          { name: "Starter", price: 99, period: "per month", specs: "Basic backup services" },
          { name: "Professional", price: 199, period: "per month", specs: "Advanced recovery options" },
          { name: "Enterprise", price: 499, period: "per month", specs: "Complete DR solution" }
        ]
      }
    ]
  },
  { 
    id: 21,
    name: "Autodesk", 
    type: "License", 
    category: "Design & Engineering", 
    domain: "autodesk.com",
    description: "Cloud design and engineering software (Fusion 360, AutoCAD Web)",
    products: [
      {
        id: "autodesk-cloud",
        name: "Autodesk Cloud Platform",
        description: "Cloud-based design and engineering tools",
        features: ["Fusion 360", "AutoCAD Web", "Cloud collaboration", "3D modeling", "CAD tools"],
        plans: [
          { name: "Personal", price: 55, period: "per month", specs: "For individuals" },
          { name: "Commercial", price: 220, period: "per month", specs: "For businesses" },
          { name: "Enterprise", price: 0, period: "per month", specs: "Contact sales" }
        ]
      }
    ]
  },
  { 
    id: 22,
    name: "AWS SaaS", 
    type: "License", 
    category: "Cloud Services", 
    domain: "amazon.com",
    description: "Broad SaaS and PaaS offerings",
    products: [
      {
        id: "aws-saas-platform",
        name: "AWS SaaS Platform",
        description: "Comprehensive SaaS and PaaS solutions",
        features: ["Multiple SaaS offerings", "Scalable infrastructure", "Managed services", "API access", "Enterprise support"],
        plans: [
          { name: "Pay-as-you-go", price: 0, period: "per month", specs: "Usage-based pricing" },
          { name: "Reserved", price: 0, period: "per month", specs: "Contact sales" },
          { name: "Enterprise", price: 0, period: "per month", specs: "Contact sales" }
        ]
      }
    ]
  },
  { 
    id: 23,
    name: "Barracuda", 
    type: "License", 
    category: "Security", 
    domain: "barracuda.com",
    description: "Email and network security SaaS",
    products: [
      {
        id: "barracuda-security",
        name: "Barracuda Security Suite",
        description: "Email and network security protection",
        features: ["Email security", "Network security", "Threat protection", "Spam filtering", "Firewall"],
        plans: [
          { name: "Essentials", price: 9.99, period: "per user/month", specs: "Basic email security" },
          { name: "Advanced", price: 19.99, period: "per user/month", specs: "Advanced protection" },
          { name: "Enterprise", price: 39.99, period: "per user/month", specs: "Complete security suite" }
        ]
      }
    ]
  },
  { 
    id: 24,
    name: "BitTitan", 
    type: "License", 
    category: "Migration", 
    domain: "bittitan.com",
    description: "Cloud migration SaaS (MigrationWiz)",
    products: [
      {
        id: "bittitan-migrationwiz",
        name: "MigrationWiz",
        description: "Cloud migration and data transfer platform",
        features: ["Email migration", "Data migration", "Cloud-to-cloud transfer", "Automated migration", "Support"],
        plans: [
          { name: "Basic", price: 12, period: "per user", specs: "One-time migration" },
          { name: "Professional", price: 0, period: "per migration", specs: "Contact sales" },
          { name: "Enterprise", price: 0, period: "per migration", specs: "Contact sales" }
        ]
      }
    ]
  },
  { 
    id: 25,
    name: "Citrix", 
    type: "License", 
    category: "Workspace & Virtualization", 
    domain: "citrix.com",
    description: "Cloud workspace and app delivery SaaS (Citrix Cloud)",
    products: [
      {
        id: "citrix-cloud",
        name: "Citrix Cloud",
        description: "Cloud workspace and virtual application delivery",
        features: ["Virtual desktops", "App delivery", "Secure access", "Cloud management", "Multi-cloud support"],
        plans: [
          { name: "Citrix Workspace", price: 0, period: "per user/month", specs: "Contact sales" },
          { name: "Citrix DaaS", price: 0, period: "per user/month", specs: "Contact sales" },
          { name: "Enterprise", price: 0, period: "per user/month", specs: "Contact sales" }
        ]
      }
    ]
  },
  { 
    id: 26,
    name: "Cloudflare", 
    type: "License", 
    category: "Security & Performance", 
    domain: "cloudflare.com",
    description: "Security, CDN, and Zero Trust SaaS",
    products: [
      {
        id: "cloudflare-platform",
        name: "Cloudflare Platform",
        description: "Comprehensive security, CDN, and Zero Trust solution",
        features: ["CDN", "DDoS protection", "Zero Trust security", "WAF", "Load balancing"],
        plans: [
          { name: "Free", price: 0, period: "per month", specs: "Basic features" },
          { name: "Pro", price: 20, period: "per month", specs: "Advanced features" },
          { name: "Business", price: 200, period: "per month", specs: "Business features" },
          { name: "Enterprise", price: 0, period: "per month", specs: "Contact sales" }
        ]
      }
    ]
  },
  { 
    id: 27,
    name: "Cohesity", 
    type: "License", 
    category: "Data Management", 
    domain: "cohesity.com",
    description: "Data management SaaS (DataProtect as a Service)",
    products: [
      {
        id: "cohesity-dataprotect",
        name: "Cohesity DataProtect",
        description: "Enterprise data management and protection as a service",
        features: ["Data backup", "Disaster recovery", "Data protection", "Cloud storage", "Analytics"],
        plans: [
          { name: "Starter", price: 0, period: "per month", specs: "Contact sales" },
          { name: "Professional", price: 0, period: "per month", specs: "Contact sales" },
          { name: "Enterprise", price: 0, period: "per month", specs: "Contact sales" }
        ]
      }
    ]
  },
  { 
    id: 28,
    name: "Forcepoint", 
    type: "License", 
    category: "Security", 
    domain: "forcepoint.com",
    description: "Cloud security and DLP SaaS",
    products: [
      {
        id: "forcepoint-security",
        name: "Forcepoint Security Platform",
        description: "Advanced cloud security and data loss prevention",
        features: ["DLP", "Cloud security", "Threat protection", "Web security", "Email security"],
        plans: [
          { name: "Essentials", price: 0, period: "per user/month", specs: "Contact sales" },
          { name: "Advanced", price: 0, period: "per user/month", specs: "Contact sales" },
          { name: "Enterprise", price: 0, period: "per user/month", specs: "Contact sales" }
        ]
      }
    ]
  },
  { 
    id: 29,
    name: "Genesys", 
    type: "License", 
    category: "Customer Experience", 
    domain: "genesys.com",
    description: "Cloud contact center SaaS",
    products: [
      {
        id: "genesys-cloud-cx",
        name: "Genesys Cloud CX",
        description: "Complete cloud contact center solution",
        features: ["Call center", "Omnichannel support", "AI capabilities", "Analytics", "Workforce management"],
        plans: [
          { name: "CX 1", price: 75, period: "per user/month", specs: "Basic contact center" },
          { name: "CX 2", price: 110, period: "per user/month", specs: "Advanced features" },
          { name: "CX 3", price: 155, period: "per user/month", specs: "Complete platform" }
        ]
      }
    ]
  },
  { 
    id: 30,
    name: "Google Cloud SaaS", 
    type: "License", 
    category: "Cloud Services", 
    domain: "google.com",
    description: "SaaS productivity and AI solutions",
    products: [
      {
        id: "google-cloud-saas",
        name: "Google Cloud SaaS Platform",
        description: "Comprehensive SaaS solutions including Workspace and AI",
        features: ["Google Workspace", "Contact Center AI", "Cloud services", "AI & ML", "Collaboration tools"],
        plans: [
          { name: "Starter", price: 0, period: "per user/month", specs: "Basic features" },
          { name: "Business", price: 12, period: "per user/month", specs: "Business features" },
          { name: "Enterprise", price: 0, period: "per user/month", specs: "Contact sales" }
        ]
      }
    ]
  },
  { 
    id: 31,
    name: "IBM Cloud SaaS", 
    type: "License", 
    category: "Cloud Services", 
    domain: "ibm.com",
    description: "Cloud SaaS for security, analytics, AI",
    products: [
      {
        id: "ibm-cloud-saas",
        name: "IBM Cloud SaaS Platform",
        description: "Enterprise SaaS solutions including Watson AI and analytics",
        features: ["Watson AI", "Analytics", "Security services", "Cloud management", "Enterprise support"],
        plans: [
          { name: "Lite", price: 0, period: "per month", specs: "Free tier" },
          { name: "Pay-as-you-go", price: 0, period: "per month", specs: "Usage-based pricing" },
          { name: "Enterprise", price: 0, period: "per month", specs: "Contact sales" }
        ]
      }
    ]
  },
  { 
    id: 32,
    name: "IGEL", 
    type: "License", 
    category: "Endpoint Management", 
    domain: "igel.com",
    description: "Cloud endpoint management SaaS",
    products: [
      {
        id: "igel-os",
        name: "IGEL OS Cloud",
        description: "Cloud-managed endpoint operating system",
        features: ["Endpoint management", "VDI optimization", "Cloud management", "Security", "Device control"],
        plans: [
          { name: "Starter", price: 0, period: "per device/month", specs: "Contact sales" },
          { name: "Professional", price: 0, period: "per device/month", specs: "Contact sales" },
          { name: "Enterprise", price: 0, period: "per device/month", specs: "Contact sales" }
        ]
      }
    ]
  },
  { 
    id: 33,
    name: "Ivanti", 
    type: "License", 
    category: "IT Management", 
    domain: "ivanti.com",
    description: "Endpoint and service management SaaS",
    products: [
      {
        id: "ivanti-neurons",
        name: "Ivanti Neurons",
        description: "AI-powered ITSM and endpoint management platform",
        features: ["ITSM", "Endpoint management", "Asset management", "Service desk", "Automation"],
        plans: [
          { name: "Starter", price: 0, period: "per user/month", specs: "Contact sales" },
          { name: "Professional", price: 0, period: "per user/month", specs: "Contact sales" },
          { name: "Enterprise", price: 0, period: "per user/month", specs: "Contact sales" }
        ]
      }
    ]
  },
  { 
    id: 34,
    name: "Cisco", 
    type: "License", 
    category: "Collaboration & Security", 
    domain: "cisco.com",
    description: "Collaboration and security SaaS (Webex, Meraki Cloud)",
    products: [
      {
        id: "cisco-cloud",
        name: "Cisco Cloud Platform",
        description: "Collaboration and security cloud services",
        features: ["Webex", "Meraki Cloud", "Security", "Networking", "Collaboration tools"],
        plans: [
          { name: "Webex Basic", price: 0, period: "per user/month", specs: "Basic collaboration" },
          { name: "Webex Business", price: 25, period: "per user/month", specs: "Business features" },
          { name: "Enterprise", price: 0, period: "per user/month", specs: "Contact sales" }
        ]
      }
    ]
  },
  { 
    id: 35,
    name: "VMware (by Broadcom)", 
    type: "License", 
    category: "Cloud Management", 
    domain: "vmware.com",
    description: "Cloud management and endpoint SaaS (VMware Cloud)",
    products: [
      {
        id: "vmware-cloud",
        name: "VMware Cloud",
        description: "Cloud management and endpoint solutions",
        features: ["Cloud management", "Virtualization", "Endpoint security", "Multi-cloud", "Automation"],
        plans: [
          { name: "Starter", price: 0, period: "per month", specs: "Contact sales" },
          { name: "Professional", price: 0, period: "per month", specs: "Contact sales" },
          { name: "Enterprise", price: 0, period: "per month", specs: "Contact sales" }
        ]
      }
    ]
  },
  { 
    id: 36,
    name: "ESET", 
    type: "License", 
    category: "Security", 
    domain: "eset.com",
    description: "Cloud-managed security SaaS (ESET PROTECT Cloud)",
    products: [
      {
        id: "eset-protect-cloud",
        name: "ESET PROTECT Cloud",
        description: "Cloud-managed endpoint security and protection",
        features: ["Endpoint protection", "Cloud management", "Threat detection", "Malware protection", "Centralized management"],
        plans: [
          { name: "Essential", price: 38.99, period: "per device/year", specs: "Basic protection" },
          { name: "Professional", price: 54.99, period: "per device/year", specs: "Advanced features" },
          { name: "Enterprise", price: 0, period: "per device/year", specs: "Contact sales" }
        ]
      }
    ]
  },
  { 
    id: 37,
    name: "Everfox", 
    type: "License", 
    category: "Security", 
    domain: "everfox.com",
    description: "Cloud security SaaS",
    products: [
      {
        id: "everfox-security",
        name: "Everfox Security Platform",
        description: "Federal-grade cloud security solutions",
        features: ["Federal security", "Cloud protection", "Data protection", "Compliance", "Threat detection"],
        plans: [
          { name: "Starter", price: 0, period: "per user/month", specs: "Contact sales" },
          { name: "Professional", price: 0, period: "per user/month", specs: "Contact sales" },
          { name: "Enterprise", price: 0, period: "per user/month", specs: "Contact sales" }
        ]
      }
    ]
  },
  { 
    id: 38,
    name: "Microsoft SaaS", 
    type: "License", 
    category: "Productivity & Business", 
    domain: "microsoft.com",
    description: "Microsoft 365, Dynamics 365, Power Platform SaaS",
    products: [
      {
        id: "microsoft-saas-platform",
        name: "Microsoft SaaS Platform",
        description: "Complete Microsoft SaaS ecosystem",
        features: ["Microsoft 365", "Dynamics 365", "Power Platform", "Azure services", "Collaboration"],
        plans: [
          { name: "Business Basic", price: 6, period: "per user/month", specs: "Basic productivity" },
          { name: "Business Standard", price: 12.50, period: "per user/month", specs: "Standard features" },
          { name: "Enterprise", price: 0, period: "per user/month", specs: "Contact sales" }
        ]
      }
    ]
  },
  { 
    id: 39,
    name: "NetWitness", 
    type: "License", 
    category: "Security", 
    domain: "netwitness.com",
    description: "Threat detection and response SaaS",
    products: [
      {
        id: "netwitness-platform",
        name: "NetWitness Platform",
        description: "Advanced threat detection and response system",
        features: ["Threat detection", "SIEM", "Network analysis", "Log analysis", "Incident response"],
        plans: [
          { name: "Starter", price: 0, period: "per month", specs: "Contact sales" },
          { name: "Professional", price: 0, period: "per month", specs: "Contact sales" },
          { name: "Enterprise", price: 0, period: "per month", specs: "Contact sales" }
        ]
      }
    ]
  },
  { 
    id: 40,
    name: "One Identity", 
    type: "License", 
    category: "Identity & Access", 
    domain: "oneidentity.com",
    description: "Identity governance and administration SaaS",
    products: [
      {
        id: "one-identity-platform",
        name: "One Identity Platform",
        description: "Identity governance and access management",
        features: ["Identity governance", "Access management", "Privileged access", "Compliance", "Automation"],
        plans: [
          { name: "Starter", price: 0, period: "per user/month", specs: "Contact sales" },
          { name: "Professional", price: 0, period: "per user/month", specs: "Contact sales" },
          { name: "Enterprise", price: 0, period: "per user/month", specs: "Contact sales" }
        ]
      }
    ]
  },
  { 
    id: 41,
    name: "OneSpan", 
    type: "License", 
    category: "Identity & Security", 
    domain: "onespan.com",
    description: "Digital identity, e-signature, and authentication SaaS",
    products: [
      {
        id: "onespan-platform",
        name: "OneSpan Platform",
        description: "Digital identity and e-signature solutions",
        features: ["E-signatures", "Digital identity", "Authentication", "Document management", "Compliance"],
        plans: [
          { name: "Starter", price: 15, period: "per user/month", specs: "Basic e-signatures" },
          { name: "Professional", price: 35, period: "per user/month", specs: "Advanced features" },
          { name: "Enterprise", price: 0, period: "per user/month", specs: "Contact sales" }
        ]
      }
    ]
  },
  { 
    id: 42,
    name: "Oracle Cloud SaaS", 
    type: "License", 
    category: "Business Applications", 
    domain: "oracle.com",
    description: "Cloud ERP, HCM, and CRM SaaS applications",
    products: [
      {
        id: "oracle-cloud-saas",
        name: "Oracle Cloud SaaS",
        description: "Complete cloud ERP, HCM, and CRM suite",
        features: ["ERP", "HCM", "CRM", "Supply chain", "Financial management"],
        plans: [
          { name: "Starter", price: 0, period: "per user/month", specs: "Contact sales" },
          { name: "Professional", price: 0, period: "per user/month", specs: "Contact sales" },
          { name: "Enterprise", price: 0, period: "per user/month", specs: "Contact sales" }
        ]
      }
    ]
  },
  { 
    id: 43,
    name: "Outseer", 
    type: "License", 
    category: "Security", 
    domain: "outseer.com",
    description: "Fraud detection SaaS (RSA company)",
    products: [
      {
        id: "outseer-fraud-detection",
        name: "Outseer Fraud Detection",
        description: "Advanced fraud detection and prevention platform",
        features: ["Fraud detection", "Risk analysis", "Transaction monitoring", "Real-time alerts", "Analytics"],
        plans: [
          { name: "Starter", price: 0, period: "per month", specs: "Contact sales" },
          { name: "Professional", price: 0, period: "per month", specs: "Contact sales" },
          { name: "Enterprise", price: 0, period: "per month", specs: "Contact sales" }
        ]
      }
    ]
  },
  { 
    id: 44,
    name: "Quest", 
    type: "License", 
    category: "IT Management", 
    domain: "quest.com",
    description: "IT management and data protection SaaS",
    products: [
      {
        id: "quest-platform",
        name: "Quest Platform",
        description: "IT management and data protection solutions",
        features: ["IT management", "Data protection", "Backup & recovery", "Monitoring", "Automation"],
        plans: [
          { name: "Starter", price: 0, period: "per month", specs: "Contact sales" },
          { name: "Professional", price: 0, period: "per month", specs: "Contact sales" },
          { name: "Enterprise", price: 0, period: "per month", specs: "Contact sales" }
        ]
      }
    ]
  },
  { 
    id: 45,
    name: "Riverbed", 
    type: "License", 
    category: "Monitoring & Performance", 
    domain: "riverbed.com",
    description: "Cloud-based observability and performance monitoring SaaS",
    products: [
      {
        id: "riverbed-observability",
        name: "Riverbed Observability",
        description: "Cloud-based performance monitoring and observability",
        features: ["Performance monitoring", "Network observability", "Application monitoring", "Analytics", "Reporting"],
        plans: [
          { name: "Starter", price: 0, period: "per month", specs: "Contact sales" },
          { name: "Professional", price: 0, period: "per month", specs: "Contact sales" },
          { name: "Enterprise", price: 0, period: "per month", specs: "Contact sales" }
        ]
      }
    ]
  },
  { 
    id: 46,
    name: "RSA", 
    type: "License", 
    category: "Security & Governance", 
    domain: "rsa.com",
    description: "Security and governance SaaS (Archer, SecurID Cloud)",
    products: [
      {
        id: "rsa-platform",
        name: "RSA Security Platform",
        description: "Enterprise security and governance solutions",
        features: ["Archer GRC", "SecurID Cloud", "Identity management", "Governance", "Compliance"],
        plans: [
          { name: "Starter", price: 0, period: "per user/month", specs: "Contact sales" },
          { name: "Professional", price: 0, period: "per user/month", specs: "Contact sales" },
          { name: "Enterprise", price: 0, period: "per user/month", specs: "Contact sales" }
        ]
      }
    ]
  },
  { 
    id: 47,
    name: "Rubrik", 
    type: "License", 
    category: "Data Management", 
    domain: "rubrik.com",
    description: "Cloud data management and backup SaaS",
    products: [
      {
        id: "rubrik-platform",
        name: "Rubrik Platform",
        description: "Enterprise cloud data management and backup",
        features: ["Data backup", "Disaster recovery", "Data governance", "Cloud storage", "Automation"],
        plans: [
          { name: "Starter", price: 0, period: "per month", specs: "Contact sales" },
          { name: "Professional", price: 0, period: "per month", specs: "Contact sales" },
          { name: "Enterprise", price: 0, period: "per month", specs: "Contact sales" }
        ]
      }
    ]
  },
  { 
    id: 48,
    name: "Skyhigh Security", 
    type: "License", 
    category: "Security", 
    domain: "skyhighsecurity.com",
    description: "Cloud security SaaS (CASB, SWG)",
    products: [
      {
        id: "skyhigh-security",
        name: "Skyhigh Security Platform",
        description: "Cloud access security broker and secure web gateway",
        features: ["CASB", "SWG", "Cloud security", "Threat protection", "Compliance"],
        plans: [
          { name: "Starter", price: 0, period: "per user/month", specs: "Contact sales" },
          { name: "Professional", price: 0, period: "per user/month", specs: "Contact sales" },
          { name: "Enterprise", price: 0, period: "per user/month", specs: "Contact sales" }
        ]
      }
    ]
  },
  { 
    id: 49,
    name: "Software AG", 
    type: "License", 
    category: "Integration", 
    domain: "softwareag.com",
    description: "Integration and API management SaaS (webMethods .io)",
    products: [
      {
        id: "softwareag-webmethods",
        name: "webMethods.io",
        description: "Cloud-based integration and API management platform",
        features: ["API management", "Integration", "Workflow automation", "Data transformation", "Cloud connectors"],
        plans: [
          { name: "Starter", price: 0, period: "per month", specs: "Contact sales" },
          { name: "Professional", price: 0, period: "per month", specs: "Contact sales" },
          { name: "Enterprise", price: 0, period: "per month", specs: "Contact sales" }
        ]
      }
    ]
  },
  { 
    id: 50,
    name: "Splunk (Cisco)", 
    type: "License", 
    category: "Monitoring & Security", 
    domain: "splunk.com",
    description: "Cloud monitoring, observability, and SIEM SaaS",
    products: [
      {
        id: "splunk-cloud",
        name: "Splunk Cloud",
        description: "Cloud-based monitoring, observability, and SIEM platform",
        features: ["SIEM", "Log analysis", "Monitoring", "Observability", "Security analytics"],
        plans: [
          { name: "Essentials", price: 0, period: "per GB/month", specs: "Usage-based pricing" },
          { name: "Workload", price: 0, period: "per GB/month", specs: "Contact sales" },
          { name: "Enterprise", price: 0, period: "per GB/month", specs: "Contact sales" }
        ]
      }
    ]
  },
  { 
    id: 51,
    name: "Trend Micro", 
    type: "License", 
    category: "Security", 
    domain: "trendmicro.com",
    description: "Cloud security SaaS (Vision One, Cloud One platform)",
    products: [
      {
        id: "trendmicro-cloud",
        name: "Trend Micro Cloud Platform",
        description: "Comprehensive cloud security solutions",
        features: ["Vision One", "Cloud One", "Threat protection", "Cloud security", "XDR"],
        plans: [
          { name: "Essentials", price: 0, period: "per user/month", specs: "Contact sales" },
          { name: "Advanced", price: 0, period: "per user/month", specs: "Contact sales" },
          { name: "Enterprise", price: 0, period: "per user/month", specs: "Contact sales" }
        ]
      }
    ]
  },
  { 
    id: 52,
    name: "Trellix", 
    type: "License", 
    category: "Security", 
    domain: "trellix.com",
    description: "Cybersecurity SaaS (XDR platform)",
    products: [
      {
        id: "trellix-xdr",
        name: "Trellix XDR Platform",
        description: "Extended detection and response cybersecurity platform",
        features: ["XDR", "Threat detection", "Endpoint security", "Network security", "Cloud security"],
        plans: [
          { name: "Starter", price: 0, period: "per user/month", specs: "Contact sales" },
          { name: "Professional", price: 0, period: "per user/month", specs: "Contact sales" },
          { name: "Enterprise", price: 0, period: "per user/month", specs: "Contact sales" }
        ]
      }
    ]
  },
  { 
    id: 53,
    name: "Vectra AI", 
    type: "License", 
    category: "Security", 
    domain: "vectra.ai",
    description: "Cloud-native threat detection and response SaaS",
    products: [
      {
        id: "vectra-platform",
        name: "Vectra AI Platform",
        description: "AI-powered threat detection and response platform",
        features: ["Threat detection", "AI-powered analysis", "Network detection", "Cloud security", "Incident response"],
        plans: [
          { name: "Starter", price: 0, period: "per month", specs: "Contact sales" },
          { name: "Professional", price: 0, period: "per month", specs: "Contact sales" },
          { name: "Enterprise", price: 0, period: "per month", specs: "Contact sales" }
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
  
  // Filtering and pagination state
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [providerTypeFilter, setProviderTypeFilter] = useState<"all" | "cloud" | "saas">("all");
  const [itemsPerPage, setItemsPerPage] = useState(12);
  
  // Use CartContext instead of local state
  const { cart, addToCart, removeFromCart, updateQuantity, getTotalItems, getTotalPrice, clearCart } = useCart();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Separate cloud and SaaS providers
  const cloudProvidersList = cloudProviders.map(p => ({ ...p, providerType: "cloud" as const }));
  const saasProvidersList = saasProviders.map(p => ({ ...p, providerType: "saas" as const }));
  const allProviders = [...cloudProvidersList, ...saasProvidersList];
  
  // Filter function
  const filterProvider = (provider: typeof cloudProvidersList[0] | typeof saasProvidersList[0]) => {
    const matchesSearch = 
      provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || provider.category === categoryFilter;
    const matchesType = typeFilter === "all" || provider.type === typeFilter;
    
    return matchesSearch && matchesCategory && matchesType;
  };
  
  // Filter cloud and SaaS providers separately
  const filteredCloudProviders = cloudProvidersList.filter(filterProvider);
  const filteredSaasProviders = saasProvidersList.filter(filterProvider);
  
  // Apply provider type filter if needed
  const displayCloudProviders = providerTypeFilter === "all" || providerTypeFilter === "cloud" ? filteredCloudProviders : [];
  const displaySaasProviders = providerTypeFilter === "all" || providerTypeFilter === "saas" ? filteredSaasProviders : [];
  
  // Get unique categories and types
  const uniqueCategories = Array.from(new Set(allProviders.map(p => p.category))).sort();
  const uniqueTypes = Array.from(new Set(allProviders.map(p => p.type))).sort();
  
  // Pagination state for each section
  const [cloudPage, setCloudPage] = useState(1);
  const [saasPage, setSaasPage] = useState(1);
  
  // Pagination calculations for Cloud
  const cloudTotalPages = Math.ceil(displayCloudProviders.length / itemsPerPage);
  const cloudStartIndex = (cloudPage - 1) * itemsPerPage;
  const cloudEndIndex = cloudStartIndex + itemsPerPage;
  const paginatedCloudProviders = displayCloudProviders.slice(cloudStartIndex, cloudEndIndex);
  
  // Pagination calculations for SaaS
  const saasTotalPages = Math.ceil(displaySaasProviders.length / itemsPerPage);
  const saasStartIndex = (saasPage - 1) * itemsPerPage;
  const saasEndIndex = saasStartIndex + itemsPerPage;
  const paginatedSaasProviders = displaySaasProviders.slice(saasStartIndex, saasEndIndex);
  
  // Reset to page 1 when filters change
  useEffect(() => {
    setCloudPage(1);
    setSaasPage(1);
  }, [searchTerm, categoryFilter, typeFilter, providerTypeFilter]);
  
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
                      src={getLogoUrl(selectedProvider?.domain || "", selectedProvider?.name)}
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
                      src={getLogoUrl(selectedProvider?.domain || "", selectedProvider?.name)}
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
              src={getLogoUrl(selectedProvider.domain, selectedProvider.name)}
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

      {/* Filters Section */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search vendors by name, description, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-10"
              />
            </div>
            
            {/* Filter Controls */}
            <div className="flex flex-wrap gap-3">
              <Select value={providerTypeFilter} onValueChange={(value) => setProviderTypeFilter(value as "all" | "cloud" | "saas")}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="cloud">Cloud Providers</SelectItem>
                  <SelectItem value="saas">SaaS Applications</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {uniqueCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {uniqueTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
                <span>Showing {displayCloudProviders.length + displaySaasProviders.length} of {allProviders.length} vendors</span>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Cloud Providers Section */}
      {displayCloudProviders.length > 0 && (
        <SectionCard
          title="Cloud Providers"
          description="Infrastructure and platform services"
          icon={Cloud}
          badge={<Badge variant="secondary">{displayCloudProviders.length} Providers</Badge>}
        >
          <div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center"
            >
              {paginatedCloudProviders.map((provider) => (
                <Card 
                  key={provider.id} 
                  className="hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden group relative border w-full max-w-full"
                  onClick={() => handleViewDetails(provider)}
                >
                  <CardContent className="p-5">
                    <div className="flex flex-col space-y-3 min-h-[200px]">
                      {/* Icon - Separate Row */}
                      <div className="flex items-center justify-start h-10 overflow-hidden">
                        <img 
                          src={getIconUrl(provider.domain, provider.name)} 
                          alt={provider.name}
                          className="h-10 w-auto max-w-full object-contain object-left"
                          style={{ maxHeight: '40px', maxWidth: '100%' }}
                          onError={(e) => {
                            // Try to use logo as fallback before showing Cloud icon
                            const logoUrl = vendorLogoMap[provider.name];
                            if (logoUrl && e.currentTarget.src !== logoUrl) {
                              e.currentTarget.src = logoUrl;
                              return;
                            }
                            // Only show Cloud icon if both icon and logo fail
                            e.currentTarget.style.display = 'none';
                            const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                          onLoad={() => {
                            // Hide fallback if image loads successfully
                            const fallback = document.querySelector(`[data-fallback-for="${provider.id}"]`) as HTMLElement;
                            if (fallback) fallback.style.display = 'none';
                          }}
                          loading="lazy"
                        />
                        <div 
                          className="hidden h-10 w-auto items-center justify-center" 
                          data-fallback-for={provider.id}
                        >
                          <Cloud className="h-8 w-8 text-muted-foreground" />
                        </div>
                      </div>
                      
                      {/* Heading and Type - Left Aligned */}
                      <div>
                        <h3 className="font-semibold text-base leading-tight mb-1 text-left line-clamp-2">{provider.name}</h3>
                        <p className="text-xs font-medium text-muted-foreground text-left truncate">{provider.category}</p>
                      </div>

                      {/* Description */}
                      <div className="flex-1 min-h-[60px]">
                        <p className="text-sm text-muted-foreground line-clamp-3 text-left leading-relaxed">
                          {provider.description}
                        </p>
                      </div>

                      {/* View Details Button - Always Visible */}
                      <div className="mt-auto pt-2">
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
            
            {/* Cloud Pagination Controls */}
            {cloudTotalPages > 1 && (
              <div className="flex items-center justify-between border-t pt-4 mt-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Show</span>
                  <Select
                    value={itemsPerPage.toString()}
                    onValueChange={(value) => {
                      setItemsPerPage(Number(value));
                      setCloudPage(1);
                    }}
                  >
                    <SelectTrigger className="h-8 w-[70px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12">12</SelectItem>
                      <SelectItem value="24">24</SelectItem>
                      <SelectItem value="36">36</SelectItem>
                      <SelectItem value="48">48</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-sm text-muted-foreground">
                    of {displayCloudProviders.length} provider{displayCloudProviders.length !== 1 ? 's' : ''}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCloudPage(prev => Math.max(1, prev - 1))}
                    disabled={cloudPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, cloudTotalPages) }, (_, i) => {
                      let pageNum;
                      if (cloudTotalPages <= 5) {
                        pageNum = i + 1;
                      } else if (cloudPage <= 3) {
                        pageNum = i + 1;
                      } else if (cloudPage >= cloudTotalPages - 2) {
                        pageNum = cloudTotalPages - 4 + i;
                      } else {
                        pageNum = cloudPage - 2 + i;
                      }
                      
                      return (
                        <Button
                          key={pageNum}
                          variant={cloudPage === pageNum ? "default" : "outline"}
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => setCloudPage(pageNum)}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCloudPage(prev => Math.min(cloudTotalPages, prev + 1))}
                    disabled={cloudPage === cloudTotalPages}
                  >
                    Next
                    <ChevronRightIcon className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}
        </SectionCard>
      )}

      {/* SaaS Providers Section */}
      {displaySaasProviders.length > 0 && (
        <SectionCard
          title="SaaS Applications"
          description="Software as a service subscriptions"
          icon={Database}
          badge={<Badge variant="secondary">{displaySaasProviders.length} Applications</Badge>}
        >
            <div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center"
            >
              {paginatedSaasProviders.map((provider) => (
                <Card 
                  key={provider.id} 
                  className="hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden group relative border w-full max-w-full"
                  onClick={() => handleViewDetails(provider)}
                >
                  <CardContent className="p-5">
                    <div className="flex flex-col space-y-3 min-h-[200px]">
                      {/* Icon - Separate Row */}
                      <div className="flex items-center justify-start h-10 overflow-hidden">
                        <img 
                          src={getIconUrl(provider.domain, provider.name)} 
                          alt={provider.name}
                          className="h-10 w-auto max-w-full object-contain object-left"
                          style={{ maxHeight: '40px', maxWidth: '100%' }}
                          onError={(e) => {
                            // Try to use logo as fallback before showing Database icon
                            const logoUrl = vendorLogoMap[provider.name];
                            if (logoUrl && e.currentTarget.src !== logoUrl) {
                              e.currentTarget.src = logoUrl;
                              return;
                            }
                            // Only show Database icon if both icon and logo fail
                            e.currentTarget.style.display = 'none';
                            const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                          onLoad={() => {
                            // Hide fallback if image loads successfully
                            const fallback = document.querySelector(`[data-fallback-for="${provider.id}"]`) as HTMLElement;
                            if (fallback) fallback.style.display = 'none';
                          }}
                          loading="lazy"
                        />
                        <div 
                          className="hidden h-10 w-auto items-center justify-center" 
                          data-fallback-for={provider.id}
                        >
                          <Database className="h-8 w-8 text-muted-foreground" />
                        </div>
                      </div>
                      
                      {/* Heading and Type - Left Aligned */}
                      <div>
                        <h3 className="font-semibold text-base leading-tight mb-1 text-left line-clamp-2">{provider.name}</h3>
                        <p className="text-xs font-medium text-muted-foreground text-left truncate">{provider.category}</p>
                      </div>

                      {/* Description */}
                      <div className="flex-1 min-h-[60px]">
                        <p className="text-sm text-muted-foreground line-clamp-3 text-left leading-relaxed">
                          {provider.description}
                        </p>
                      </div>

                      {/* View Details Button - Always Visible */}
                      <div className="mt-auto pt-2">
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
            
            {/* SaaS Pagination Controls */}
            {saasTotalPages > 1 && (
              <div className="flex items-center justify-between border-t pt-4 mt-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Show</span>
                  <Select
                    value={itemsPerPage.toString()}
                    onValueChange={(value) => {
                      setItemsPerPage(Number(value));
                      setSaasPage(1);
                    }}
                  >
                    <SelectTrigger className="h-8 w-[70px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12">12</SelectItem>
                      <SelectItem value="24">24</SelectItem>
                      <SelectItem value="36">36</SelectItem>
                      <SelectItem value="48">48</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-sm text-muted-foreground">
                    of {displaySaasProviders.length} application{displaySaasProviders.length !== 1 ? 's' : ''}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSaasPage(prev => Math.max(1, prev - 1))}
                    disabled={saasPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, saasTotalPages) }, (_, i) => {
                      let pageNum;
                      if (saasTotalPages <= 5) {
                        pageNum = i + 1;
                      } else if (saasPage <= 3) {
                        pageNum = i + 1;
                      } else if (saasPage >= saasTotalPages - 2) {
                        pageNum = saasTotalPages - 4 + i;
                      } else {
                        pageNum = saasPage - 2 + i;
                      }
                      
                      return (
                        <Button
                          key={pageNum}
                          variant={saasPage === pageNum ? "default" : "outline"}
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => setSaasPage(pageNum)}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSaasPage(prev => Math.min(saasTotalPages, prev + 1))}
                    disabled={saasPage === saasTotalPages}
                  >
                    Next
                    <ChevronRightIcon className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}
        </SectionCard>
      )}

      {/* Empty State */}
      {displayCloudProviders.length === 0 && displaySaasProviders.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Cloud className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No vendors found</h3>
            <p className="text-muted-foreground">Try adjusting your filters to see more results</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Marketplace;
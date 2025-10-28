import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search, 
  Building2, 
  Cloud, 
  Server,
  Database,
  Shield,
  Zap,
  CheckCircle,
  Plus,
  Package
} from "lucide-react";

// Mock subscription data
const mockSubscriptions = [
  {
    id: "1",
    name: "AWS EC2 Instance",
    provider: "Amazon Web Services",
    category: "Compute",
    description: "Elastic Compute Cloud instances for scalable computing",
    pricing: "Hourly",
    price: 0.10,
    features: ["Auto-scaling", "Load balancing", "Multiple regions"],
    icon: Server,
    popular: true
  },
  {
    id: "2",
    name: "Azure SQL Database",
    provider: "Microsoft Azure",
    category: "Database",
    description: "Managed SQL database service with high availability",
    pricing: "Monthly",
    price: 150.00,
    features: ["High availability", "Automated backups", "Security compliance"],
    icon: Database,
    popular: false
  },
  {
    id: "3",
    name: "Google Cloud Storage",
    provider: "Google Cloud Platform",
    category: "Storage",
    description: "Object storage for any amount of data",
    pricing: "Per GB",
    price: 0.02,
    features: ["Global availability", "Versioning", "Lifecycle management"],
    icon: Cloud,
    popular: true
  },
  {
    id: "4",
    name: "AWS Security Hub",
    provider: "Amazon Web Services",
    category: "Security",
    description: "Centralized security findings management",
    pricing: "Monthly",
    price: 50.00,
    features: ["Threat detection", "Compliance monitoring", "Automated remediation"],
    icon: Shield,
    popular: false
  },
  {
    id: "5",
    name: "Azure Functions",
    provider: "Microsoft Azure",
    category: "Compute",
    description: "Serverless compute service for event-driven applications",
    pricing: "Per Execution",
    price: 0.0002,
    features: ["Event-driven", "Auto-scaling", "Pay-per-use"],
    icon: Zap,
    popular: true
  },
  {
    id: "6",
    name: "GCP Kubernetes Engine",
    provider: "Google Cloud Platform",
    category: "Compute",
    description: "Managed Kubernetes service for containerized applications",
    pricing: "Hourly",
    price: 0.10,
    features: ["Container orchestration", "Auto-scaling", "Multi-cloud"],
    icon: Server,
    popular: false
  }
];

interface Subscription {
  id: string;
  name: string;
  provider: string;
  category: string;
  description: string;
  pricing: string;
  price: number;
  features: string[];
  icon: any;
  popular: boolean;
}

interface SubscriptionSelectionProps {
  onSubscriptionsSelect: (subscriptions: Subscription[]) => void;
  selectedSubscriptions: Subscription[];
  onContinue: () => void;
}

const SubscriptionSelection = ({ onSubscriptionsSelect, selectedSubscriptions, onContinue }: SubscriptionSelectionProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const categories = ["all", ...Array.from(new Set(mockSubscriptions.map(sub => sub.category)))];

  const filteredSubscriptions = mockSubscriptions.filter(subscription => {
    const matchesSearch = subscription.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subscription.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subscription.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || subscription.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleSubscriptionToggle = (subscription: Subscription) => {
    const isSelected = selectedSubscriptions.some(sub => sub.id === subscription.id);
    if (isSelected) {
      onSubscriptionsSelect(selectedSubscriptions.filter(sub => sub.id !== subscription.id));
    } else {
      onSubscriptionsSelect([...selectedSubscriptions, subscription]);
    }
  };

  const getPricingDisplay = (subscription: Subscription) => {
    switch (subscription.pricing) {
      case "Hourly":
        return `$${subscription.price}/hr`;
      case "Monthly":
        return `$${subscription.price}/mo`;
      case "Per GB":
        return `$${subscription.price}/GB`;
      case "Per Execution":
        return `$${subscription.price}/execution`;
      default:
        return `$${subscription.price}`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Select Subscriptions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="subscriptionSearch">Search Subscriptions</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="subscriptionSearch"
                placeholder="Search by name, provider, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Filter by Category</Label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={categoryFilter === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCategoryFilter(category)}
                  className="capitalize"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Subscriptions Summary */}
      {selectedSubscriptions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Selected Subscriptions ({selectedSubscriptions.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {selectedSubscriptions.map((subscription) => (
                <div key={subscription.id} className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    <subscription.icon className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">{subscription.name}</p>
                      <p className="text-sm text-muted-foreground">{subscription.provider}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{getPricingDisplay(subscription)}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSubscriptionToggle(subscription)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Available Subscriptions */}
      <Card>
        <CardHeader>
          <CardTitle>Available Subscriptions</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredSubscriptions.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No subscriptions found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredSubscriptions.map((subscription) => {
                const isSelected = selectedSubscriptions.some(sub => sub.id === subscription.id);
                const IconComponent = subscription.icon;
                
                return (
                  <div
                    key={subscription.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                      isSelected 
                        ? 'border-primary bg-primary/5 ring-2 ring-primary/20' 
                        : 'border-border hover:border-primary/50 hover:bg-muted/50'
                    }`}
                    onClick={() => handleSubscriptionToggle(subscription)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${isSelected ? 'bg-primary/10' : 'bg-muted'}`}>
                          <IconComponent className={`h-5 w-5 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm">{subscription.name}</h3>
                          <p className="text-xs text-muted-foreground">{subscription.provider}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {subscription.popular && (
                          <Badge variant="secondary" className="text-xs">Popular</Badge>
                        )}
                        <Checkbox
                          checked={isSelected}
                          onChange={() => handleSubscriptionToggle(subscription)}
                        />
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{subscription.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Pricing</span>
                        <span className="text-sm font-semibold">{getPricingDisplay(subscription)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Category</span>
                        <Badge variant="outline" className="text-xs">{subscription.category}</Badge>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <p className="text-xs font-medium mb-2">Key Features:</p>
                      <div className="flex flex-wrap gap-1">
                        {subscription.features.slice(0, 2).map((feature, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {subscription.features.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{subscription.features.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Continue Button */}
      <div className="flex justify-end">
        <Button
          onClick={onContinue}
          disabled={selectedSubscriptions.length === 0}
          variant="gradient"
          size="lg"
        >
          Continue to Review
        </Button>
      </div>
    </div>
  );
};

export default SubscriptionSelection;

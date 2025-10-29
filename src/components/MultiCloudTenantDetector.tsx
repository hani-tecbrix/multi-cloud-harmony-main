import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Cloud, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  Package,
  TrendingUp,
  Link as LinkIcon,
  ArrowRight,
  Database,
  Server,
  HardDrive
} from "lucide-react";
import { toast } from "sonner";

interface TenantData {
  tenantId: string;
  provider: 'AWS' | 'Azure' | 'GCP';
  accountName: string;
  createdDate: string;
  region: string;
  existingServices: {
    name: string;
    type: string;
    monthlyCost: number;
  }[];
  totalMonthlySpend: number;
}

interface CloudService {
  id: string;
  provider: 'AWS' | 'Azure' | 'GCP';
  name: string;
  category: string;
  icon: any;
  recommended: boolean;
}

interface MultiCloudTenantDetectorProps {
  email: string;
  onTenantsDetected: (tenants: TenantData[], selectedServices: CloudService[]) => void;
  isChecking: boolean;
  setIsChecking: (checking: boolean) => void;
}

const availableServices: CloudService[] = [
  { id: 'aws-ec2', provider: 'AWS', name: 'EC2 Instances', category: 'Compute', icon: Server, recommended: true },
  { id: 'aws-s3', provider: 'AWS', name: 'S3 Storage', category: 'Storage', icon: HardDrive, recommended: true },
  { id: 'aws-rds', provider: 'AWS', name: 'RDS Database', category: 'Database', icon: Database, recommended: false },
  { id: 'azure-vm', provider: 'Azure', name: 'Virtual Machines', category: 'Compute', icon: Server, recommended: true },
  { id: 'azure-storage', provider: 'Azure', name: 'Blob Storage', category: 'Storage', icon: HardDrive, recommended: false },
  { id: 'azure-sql', provider: 'Azure', name: 'Azure SQL', category: 'Database', icon: Database, recommended: true },
  { id: 'gcp-compute', provider: 'GCP', name: 'Compute Engine', category: 'Compute', icon: Server, recommended: false },
  { id: 'gcp-storage', provider: 'GCP', name: 'Cloud Storage', category: 'Storage', icon: HardDrive, recommended: false },
];

export const MultiCloudTenantDetector = ({ 
  email, 
  onTenantsDetected, 
  isChecking, 
  setIsChecking 
}: MultiCloudTenantDetectorProps) => {
  const [detectedTenants, setDetectedTenants] = useState<TenantData[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [showServiceSelection, setShowServiceSelection] = useState(false);

  const handleCheckTenants = async () => {
    if (!email) {
      toast.error("Please enter an email address first");
      return;
    }

    setIsChecking(true);
    setDetectedTenants([]);
    setShowServiceSelection(false);
    
    // Simulate multi-cloud API calls
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock response - detect multiple tenants
    const mockTenants: TenantData[] = [
      {
        tenantId: "TNT-AZURE-" + Math.random().toString(36).substr(2, 6).toUpperCase(),
        provider: "Azure",
        accountName: "Production Environment",
        createdDate: "2023-03-15",
        region: "East US",
        existingServices: [
          { name: "Virtual Machines", type: "Compute", monthlyCost: 1200 },
          { name: "Azure SQL Database", type: "Database", monthlyCost: 850 },
          { name: "Blob Storage", type: "Storage", monthlyCost: 450 }
        ],
        totalMonthlySpend: 2500
      },
      {
        tenantId: "TNT-GCP-" + Math.random().toString(36).substr(2, 6).toUpperCase(),
        provider: "GCP",
        accountName: "Development Environment",
        createdDate: "2023-08-22",
        region: "us-central1",
        existingServices: [
          { name: "Compute Engine", type: "Compute", monthlyCost: 650 },
          { name: "Cloud Storage", type: "Storage", monthlyCost: 280 }
        ],
        totalMonthlySpend: 930
      }
    ];

    setDetectedTenants(mockTenants);
    setIsChecking(false);
    
    // Auto-select recommended services based on existing usage
    const recommended = availableServices
      .filter(service => service.recommended)
      .map(service => service.id);
    setSelectedServices(recommended);
    
    setShowServiceSelection(true);
    toast.success(`Found ${mockTenants.length} existing cloud tenants!`);
  };

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleContinue = () => {
    const services = availableServices.filter(s => selectedServices.includes(s.id));
    onTenantsDetected(detectedTenants, services);
  };

  const getProviderColor = (provider: string) => {
    switch (provider) {
      case 'AWS': return 'bg-orange-500/10 text-orange-600 border-orange-500/20';
      case 'Azure': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'GCP': return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  const getProviderBg = (provider: string) => {
    switch (provider) {
      case 'AWS': return 'bg-orange-500/5';
      case 'Azure': return 'bg-blue-500/5';
      case 'GCP': return 'bg-red-500/5';
      default: return 'bg-gray-500/5';
    }
  };

  return (
    <div className="space-y-4">
      {/* Detection Button */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={handleCheckTenants}
          disabled={isChecking || !email}
          className="flex-1"
        >
          {isChecking ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Scanning All Cloud Providers...
            </>
          ) : (
            <>
              <Cloud className="h-4 w-4 mr-2" />
              Detect All Cloud Tenants
            </>
          )}
        </Button>
      </div>

      {/* Detected Tenants */}
      {detectedTenants.length > 0 && (
        <Card className="border-accent bg-accent/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <CheckCircle className="h-5 w-5 text-accent" />
              {detectedTenants.length} Existing Cloud Tenant{detectedTenants.length > 1 ? 's' : ''} Detected
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {detectedTenants.map((tenant, index) => (
              <Card key={index} className={getProviderBg(tenant.provider)}>
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    {/* Tenant Header */}
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge className={getProviderColor(tenant.provider)}>
                            {tenant.provider}
                          </Badge>
                          <span className="font-semibold">{tenant.accountName}</span>
                        </div>
                        <p className="text-xs text-muted-foreground font-mono">
                          {tenant.tenantId}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">
                          ${tenant.totalMonthlySpend.toLocaleString()}/mo
                        </p>
                        <p className="text-xs text-muted-foreground">{tenant.region}</p>
                      </div>
                    </div>

                    <Separator />

                    {/* Existing Services */}
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Current Services ({tenant.existingServices.length})
                      </p>
                      <div className="grid grid-cols-1 gap-2">
                        {tenant.existingServices.map((service, idx) => (
                          <div 
                            key={idx}
                            className="flex items-center justify-between p-2 rounded bg-background/50"
                          >
                            <div className="flex items-center gap-2">
                              <Package className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm">{service.name}</span>
                              <Badge variant="outline" className="text-xs">
                                {service.type}
                              </Badge>
                            </div>
                            <span className="text-sm font-medium">
                              ${service.monthlyCost}/mo
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Link Status */}
                    <div className="flex items-center gap-2 p-2 rounded bg-background/50">
                      <LinkIcon className="h-3 w-3 text-accent" />
                      <span className="text-xs text-muted-foreground">
                        Ready to link to your managed services
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Service Selection */}
      {showServiceSelection && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="h-5 w-5" />
              Select Services to Add
              <Badge variant="secondary" className="ml-auto">
                {selectedServices.length} selected
              </Badge>
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Choose which cloud services you want to add to your managed platform
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Group by Provider */}
            {['AWS', 'Azure', 'GCP'].map(provider => {
              const providerServices = availableServices.filter(s => s.provider === provider);
              const selectedCount = providerServices.filter(s => selectedServices.includes(s.id)).length;
              
              return (
                <div key={provider} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge className={getProviderColor(provider)}>
                      {provider}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {selectedCount}/{providerServices.length} selected
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {providerServices.map(service => (
                      <div
                        key={service.id}
                        className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all cursor-pointer ${
                          selectedServices.includes(service.id)
                            ? 'border-accent bg-accent/5'
                            : 'border-transparent bg-muted/30 hover:bg-muted/50'
                        }`}
                        onClick={() => toggleService(service.id)}
                      >
                        <Checkbox
                          checked={selectedServices.includes(service.id)}
                          onCheckedChange={() => toggleService(service.id)}
                        />
                        <service.icon className="h-4 w-4 text-muted-foreground" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{service.name}</span>
                            {service.recommended && (
                              <Badge variant="secondary" className="text-xs bg-accent/10 text-accent">
                                Recommended
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{service.category}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Continue Button */}
            <div className="flex items-center justify-between pt-4">
              <div className="text-sm text-muted-foreground">
                {selectedServices.length === 0 && (
                  <div className="flex items-center gap-2 text-warning">
                    <AlertCircle className="h-4 w-4" />
                    <span>Please select at least one service</span>
                  </div>
                )}
              </div>
              <Button
                variant="gradient"
                onClick={handleContinue}
                disabled={selectedServices.length === 0}
              >
                Continue with {selectedServices.length} Service{selectedServices.length !== 1 ? 's' : ''}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};


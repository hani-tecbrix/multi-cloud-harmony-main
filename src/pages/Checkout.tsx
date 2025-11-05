import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  CheckCircle, 
  Loader2, 
  ArrowLeft,
  ShoppingCart
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CustomerSelection from "@/components/CustomerSelection";
import SubscriptionSelection from "@/components/SubscriptionSelection";

const Checkout = () => {
  const { cart, getTotalItems, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [selectedSubscriptions, setSelectedSubscriptions] = useState<any[]>([]);
  const [checkoutData, setCheckoutData] = useState({
    agreeToTerms: false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setCheckoutData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateStep1 = () => {
    return selectedCustomer !== null;
  };

  const validateStep2 = () => {
    return selectedSubscriptions.length > 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCustomerSelect = (customer: any) => {
    setSelectedCustomer(customer);
  };

  const handleProcessPayment = async () => {
    // Validate required data
    if (!selectedCustomer) {
      toast.error("Please select a customer");
      return;
    }

    if (selectedSubscriptions.length === 0 && cart.length === 0) {
      toast.error("Please select at least one subscription or add items to cart");
      return;
    }

    if (!checkoutData.agreeToTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Order placed successfully!");
      clearCart();
      navigate("/orders");
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <ShoppingCart className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Add some products to your cart before proceeding to checkout.
            </p>
            <Button onClick={() => navigate("/marketplace")} variant="gradient" className="w-full">
              Browse Marketplace
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/marketplace")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Marketplace
            </Button>
          </div>
          <h1 className="text-3xl font-bold">Place Order</h1>
          <p className="text-muted-foreground">
            Review your order and complete your purchase
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
              {/* Progress Steps */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    {[1, 2, 3].map((step) => (
                      <div key={step} className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          currentStep >= step 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {currentStep > step ? <CheckCircle className="h-4 w-4" /> : step}
                        </div>
                        <span className={`ml-2 text-sm ${
                          currentStep >= step ? 'text-primary' : 'text-muted-foreground'
                        }`}>
                          {step === 1 ? 'Customer Selection' : step === 2 ? 'Subscription Selection' : 'Review & Place Order'}
                        </span>
                        {step < 3 && (
                          <div className={`w-16 h-px mx-4 ${
                            currentStep > step ? 'bg-primary' : 'bg-muted'
                          }`} />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

            {/* Step 1: Customer Selection */}
            {currentStep === 1 && (
              <CustomerSelection
                onCustomerSelect={handleCustomerSelect}
                selectedCustomer={selectedCustomer}
                onContinue={handleNextStep}
              />
            )}

            {/* Step 2: Subscription Selection */}
            {currentStep === 2 && (
              <SubscriptionSelection
                onSubscriptionsSelect={setSelectedSubscriptions}
                selectedSubscriptions={selectedSubscriptions}
                onContinue={handleNextStep}
              />
            )}

            {/* Step 3: Review & Place Order */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Review & Place Order
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Customer Information</h3>
                    <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                      <p><strong>{selectedCustomer?.name}</strong></p>
                      <p>{selectedCustomer?.email}</p>
                      <p>{selectedCustomer?.phone}</p>
                      <p>{selectedCustomer?.address}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Status:</span>
                        <Badge variant={selectedCustomer?.status === 'active' ? 'default' : 'destructive'}>
                          {selectedCustomer?.status}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Selected Subscriptions</h3>
                    <div className="space-y-3">
                      {selectedSubscriptions.map((subscription) => (
                        <div key={subscription.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium">{subscription.name}</p>
                            <p className="text-sm text-muted-foreground">{subscription.provider}</p>
                            <p className="text-xs text-muted-foreground">{subscription.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">
                              {subscription.pricing === "Hourly" ? `$${subscription.price}/hr` : 
                               subscription.pricing === "Per GB" ? `$${subscription.price}/GB` : 
                               subscription.pricing === "Per Execution" ? `$${subscription.price}/execution` :
                               `$${subscription.price}/mo`}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Cart Items</h3>
                    <div className="space-y-3">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium">{item.product.name}</p>
                            <p className="text-sm text-muted-foreground">{item.plan.name}</p>
                            <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">
                              ${(item.plan.price * item.quantity).toFixed(2)}
                              {item.plan.period.includes('hour') ? '/hr' : item.plan.period.includes('month') ? '/mo' : ''}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="agreeToTerms"
                        checked={checkoutData.agreeToTerms}
                        onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked as boolean)}
                      />
                      <Label htmlFor="agreeToTerms" className="text-sm">
                        I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePreviousStep}
                disabled={currentStep === 1}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              {currentStep < 3 ? (
                <Button onClick={handleNextStep} variant="gradient">
                  Next Step
                </Button>
              ) : (
                <Button 
                  onClick={handleProcessPayment} 
                  variant="gradient"
                  disabled={
                    !selectedCustomer || 
                    (selectedSubscriptions.length === 0 && cart.length === 0) ||
                    !checkoutData.agreeToTerms || 
                    isProcessing
                  }
                  className="gap-2"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      Place Order
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-sm">
                      <div className="flex-1">
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-muted-foreground">{item.plan.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-semibold">
                        ${(item.plan.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Subtotal</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Tax (8%)</span>
                    <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${(getTotalPrice() * 1.08).toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Badge */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Secure checkout powered by industry-standard encryption</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
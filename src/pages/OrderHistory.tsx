import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionCard } from "@/components/SectionCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Calendar,
  CreditCard,
  CheckCircle,
  Clock,
  XCircle,
  ArrowLeft,
  ShoppingBag
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock order data
const mockOrders = [
  {
    id: "ORD-1703123456789",
    date: "2024-01-15",
    status: "completed",
    total: 1250.00,
    itemCount: 3,
    paymentMethod: "Credit Card",
    items: [
      { name: "AWS EC2 Instance", plan: "t3.medium", provider: "Amazon Web Services", price: 450.00 },
      { name: "Google Cloud Storage", plan: "Standard", provider: "Google Cloud", price: 200.00 },
      { name: "Microsoft Azure", plan: "Basic", provider: "Microsoft", price: 600.00 }
    ]
  },
  {
    id: "ORD-1703123456790",
    date: "2024-01-10",
    status: "processing",
    total: 850.00,
    itemCount: 2,
    paymentMethod: "Invoice",
    items: [
      { name: "Slack Pro", plan: "Monthly", provider: "Slack", price: 400.00 },
      { name: "Zoom Business", plan: "Monthly", provider: "Zoom", price: 450.00 }
    ]
  },
  {
    id: "ORD-1703123456791",
    date: "2024-01-05",
    status: "cancelled",
    total: 300.00,
    itemCount: 1,
    paymentMethod: "Credit Card",
    items: [
      { name: "Dropbox Business", plan: "Monthly", provider: "Dropbox", price: 300.00 }
    ]
  }
];

const OrderHistory = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "processing":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="default" className="bg-green-100 text-green-800">Completed</Badge>;
      case "processing":
        return <Badge variant="default" className="bg-yellow-100 text-yellow-800">Processing</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  if (selectedOrder) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => setSelectedOrder(null)}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Orders
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  {getStatusIcon(selectedOrder.status)}
                  Order {selectedOrder.id}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Placed on {new Date(selectedOrder.date).toLocaleDateString()}
                </p>
              </div>
              {getStatusBadge(selectedOrder.status)}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Order Items */}
            <div>
              <h3 className="font-semibold mb-4">Order Items</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedOrder.items.map((item: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.plan}</TableCell>
                      <TableCell>{item.provider}</TableCell>
                      <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <Separator />

            {/* Order Summary */}
            <div className="space-y-4">
              <h3 className="font-semibold">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${(selectedOrder.total / 1.08).toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Tax (8%)</span>
                  <span>${(selectedOrder.total * 0.08 / 1.08).toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Payment Information */}
            <div className="space-y-4">
              <h3 className="font-semibold">Payment Information</h3>
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{selectedOrder.paymentMethod}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download Invoice
              </Button>
              {selectedOrder.status === "processing" && (
                <Button variant="destructive">
                  Cancel Order
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Order History</h1>
          <p className="text-sm text-muted-foreground mt-1">View and manage your past orders</p>
        </div>
        <Button onClick={() => navigate("/marketplace")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Marketplace
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("all")}
              >
                All
              </Button>
              <Button
                variant={statusFilter === "completed" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("completed")}
              >
                Completed
              </Button>
              <Button
                variant={statusFilter === "processing" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("processing")}
              >
                Processing
              </Button>
              <Button
                variant={statusFilter === "cancelled" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("cancelled")}
              >
                Cancelled
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <SectionCard
        title={`Orders (${filteredOrders.length})`}
        icon={ShoppingBag}
      >
          {filteredOrders.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No orders found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || statusFilter !== "all" 
                  ? "Try adjusting your search or filter criteria"
                  : "You haven't placed any orders yet"
                }
              </p>
              {!searchTerm && statusFilter === "all" && (
                <Button onClick={() => navigate("/marketplace")}>
                  Browse Marketplace
                </Button>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        {getStatusBadge(order.status)}
                      </div>
                    </TableCell>
                    <TableCell>{order.itemCount} items</TableCell>
                    <TableCell className="text-right font-semibold">
                      ${order.total.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
      </SectionCard>
    </div>
  );
};

export default OrderHistory;

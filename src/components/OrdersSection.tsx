
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, Search, ShoppingCart, Calendar, MapPin } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Order {
  id: string;
  orderId: string;
  orderDate: string;
  buyerName: string;
  buyerCity: string;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  items: Array<{
    productName: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  buyerPhone: string;
  buyerAddress: string;
}

export const OrdersSection = () => {
  const [orders] = useState<Order[]>([
    {
      id: "1",
      orderId: "ORD-2024-001",
      orderDate: "2024-01-15",
      buyerName: "Priya Sharma",
      buyerCity: "Chennai",
      status: "confirmed",
      items: [
        { productName: "Red Flower Pot", quantity: 10, price: 150 },
        { productName: "7cm Sparkler", quantity: 5, price: 80 }
      ],
      totalAmount: 1900,
      buyerPhone: "+91 9876543210",
      buyerAddress: "123 Anna Nagar, Chennai, Tamil Nadu 600040"
    },
    {
      id: "2",
      orderId: "ORD-2024-002",
      orderDate: "2024-01-16",
      buyerName: "Rahul Patel",
      buyerCity: "Mumbai",
      status: "shipped",
      items: [
        { productName: "Rocket Small", quantity: 3, price: 200 },
        { productName: "Green Flower Pot", quantity: 8, price: 160 }
      ],
      totalAmount: 1880,
      buyerPhone: "+91 9876543211",
      buyerAddress: "456 Andheri West, Mumbai, Maharashtra 400058"
    },
    {
      id: "3",
      orderId: "ORD-2024-003",
      orderDate: "2024-01-17",
      buyerName: "Anjali Reddy",
      buyerCity: "Hyderabad",
      status: "pending",
      items: [
        { productName: "12cm Sparkler", quantity: 15, price: 120 }
      ],
      totalAmount: 1800,
      buyerPhone: "+91 9876543212",
      buyerAddress: "789 Jubilee Hills, Hyderabad, Telangana 500033"
    },
    {
      id: "4",
      orderId: "ORD-2024-004",
      orderDate: "2024-01-18",
      buyerName: "Vikram Singh",
      buyerCity: "Delhi",
      status: "delivered",
      items: [
        { productName: "Red Flower Pot", quantity: 6, price: 150 },
        { productName: "Rocket Small", quantity: 4, price: 200 }
      ],
      totalAmount: 1700,
      buyerPhone: "+91 9876543213",
      buyerAddress: "321 Connaught Place, New Delhi, Delhi 110001"
    },
    {
      id: "5",
      orderId: "ORD-2024-005",
      orderDate: "2024-01-19",
      buyerName: "Meera Gupta",
      buyerCity: "Bangalore",
      status: "cancelled",
      items: [
        { productName: "Green Flower Pot", quantity: 12, price: 160 }
      ],
      totalAmount: 1920,
      buyerPhone: "+91 9876543214",
      buyerAddress: "654 Koramangala, Bangalore, Karnataka 560034"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter(order =>
    order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.buyerCity.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "confirmed": return "bg-blue-100 text-blue-800";
      case "shipped": return "bg-purple-100 text-purple-800";
      case "delivered": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: Order['status']) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold gradient-text">My Orders</h2>
          <p className="text-muted-foreground mt-1">Track and manage all your customer orders</p>
        </div>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b">
          <CardTitle className="text-xl flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-primary" />
            Order Management
          </CardTitle>
          <CardDescription>
            View detailed information about all customer orders
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Badge variant="secondary" className="text-sm">
                {filteredOrders.length} entries found
              </Badge>
            </div>
          </div>

          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">S.No</TableHead>
                  <TableHead className="font-semibold">Order ID</TableHead>
                  <TableHead className="font-semibold">Order Date</TableHead>
                  <TableHead className="font-semibold">Buyer Name</TableHead>
                  <TableHead className="font-semibold">Buyer City</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Amount</TableHead>
                  <TableHead className="font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order, index) => (
                  <TableRow key={order.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-mono text-sm">{order.orderId}</TableCell>
                    <TableCell className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      {new Date(order.orderDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="font-medium">{order.buyerName}</TableCell>
                    <TableCell className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      {order.buyerCity}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.status)}>
                        {getStatusText(order.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold text-green-600">₹{order.totalAmount}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedOrder(order)}
                            className="h-8 w-8 p-0 hover:bg-primary/10"
                          >
                            <Eye className="h-4 w-4 text-primary" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Order Details</DialogTitle>
                            <DialogDescription>
                              Complete information for {order.orderId}
                            </DialogDescription>
                          </DialogHeader>
                          {selectedOrder && (
                            <div className="space-y-6">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <h4 className="font-semibold text-gray-700">Order Information</h4>
                                  <div className="space-y-1 text-sm">
                                    <p><span className="font-medium">Order ID:</span> {selectedOrder.orderId}</p>
                                    <p><span className="font-medium">Date:</span> {new Date(selectedOrder.orderDate).toLocaleDateString()}</p>
                                    <p><span className="font-medium">Status:</span> 
                                      <Badge className={`ml-2 ${getStatusColor(selectedOrder.status)}`}>
                                        {getStatusText(selectedOrder.status)}
                                      </Badge>
                                    </p>
                                    <p><span className="font-medium">Total Amount:</span> ₹{selectedOrder.totalAmount}</p>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <h4 className="font-semibold text-gray-700">Buyer Information</h4>
                                  <div className="space-y-1 text-sm">
                                    <p><span className="font-medium">Name:</span> {selectedOrder.buyerName}</p>
                                    <p><span className="font-medium">Phone:</span> {selectedOrder.buyerPhone}</p>
                                    <p><span className="font-medium">City:</span> {selectedOrder.buyerCity}</p>
                                    <p><span className="font-medium">Address:</span> {selectedOrder.buyerAddress}</p>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <h4 className="font-semibold text-gray-700">Order Items</h4>
                                <div className="rounded-lg border">
                                  <Table>
                                    <TableHeader>
                                      <TableRow className="bg-gray-50">
                                        <TableHead>Product</TableHead>
                                        <TableHead>Quantity</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>Total</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {selectedOrder.items.map((item, itemIndex) => (
                                        <TableRow key={itemIndex}>
                                          <TableCell className="font-medium">{item.productName}</TableCell>
                                          <TableCell>{item.quantity}</TableCell>
                                          <TableCell>₹{item.price}</TableCell>
                                          <TableCell className="font-semibold">₹{item.quantity * item.price}</TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

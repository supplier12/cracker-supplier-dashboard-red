
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";

const Delivery = () => {
  return (
    <DashboardLayout activeSection="delivery">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Package className="h-8 w-8 text-orange-600" />
          <div>
            <h1 className="text-2xl font-bold gradient-text">Delivery Management</h1>
            <p className="text-muted-foreground">Track and manage your deliveries</p>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Active Deliveries</CardTitle>
            <CardDescription>Monitor ongoing delivery operations</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Delivery management functionality coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Delivery;

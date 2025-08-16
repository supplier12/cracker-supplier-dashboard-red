
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck } from "lucide-react";

const VehicleDetails = () => {
  return (
    <DashboardLayout activeSection="vehicle-details">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Truck className="h-8 w-8 text-orange-600" />
          <div>
            <h1 className="text-2xl font-bold gradient-text">Vehicle Details</h1>
            <p className="text-muted-foreground">Manage your delivery vehicles</p>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Your Vehicles</CardTitle>
            <CardDescription>View and manage your registered vehicles</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Vehicle management functionality coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default VehicleDetails;

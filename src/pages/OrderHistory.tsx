
import { DashboardLayout } from "@/components/DashboardLayout";
import { OrdersSection } from "@/components/OrdersSection";

const OrderHistory = () => {
  return (
    <DashboardLayout activeSection="order-history">
      <OrdersSection />
    </DashboardLayout>
  );
};

export default OrderHistory;

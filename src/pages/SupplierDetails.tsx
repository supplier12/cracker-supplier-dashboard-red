
import { DashboardLayout } from "@/components/DashboardLayout";
import { ProfileSection } from "@/components/ProfileSection";

const SupplierDetails = () => {
  return (
    <DashboardLayout activeSection="supplier-details">
      <ProfileSection />
    </DashboardLayout>
  );
};

export default SupplierDetails;

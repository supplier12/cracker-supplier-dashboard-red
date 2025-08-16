import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ProfileSection } from "@/components/ProfileSection";

const Profile = () => {
  useEffect(() => {
    document.title = "Profile | Supplier Panel";
  }, []);

  return (
    <DashboardLayout activeSection="profile">
      <ProfileSection />
    </DashboardLayout>
  );
};

export default Profile;
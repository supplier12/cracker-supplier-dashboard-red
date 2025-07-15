
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Edit2, User, Phone, Store, MapPin, Hash } from "lucide-react";

export const ProfileSection = () => {
  const [profileData, setProfileData] = useState({
    name: "Rajesh Kumar",
    mobile: "+91 9876543210",
    shopName: "Kumar Crackers Store",
    shopNumber: "SC-123",
    shopAddress: "123 Main Street, Sivakasi, Tamil Nadu 626123"
  });

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editData, setEditData] = useState(profileData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = () => {
    setProfileData(editData);
    setIsEditDialogOpen(false);
  };

  const profileFields = [
    { key: "name", label: "Name", icon: User, value: profileData.name },
    { key: "mobile", label: "Mobile Number", icon: Phone, value: profileData.mobile },
    { key: "shopName", label: "Shop Name", icon: Store, value: profileData.shopName },
    { key: "shopNumber", label: "Shop Number", icon: Hash, value: profileData.shopNumber },
    { key: "shopAddress", label: "Shop Address", icon: MapPin, value: profileData.shopAddress }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold gradient-text">Profile Information</h2>
          <p className="text-muted-foreground mt-1">Manage your supplier profile details</p>
        </div>
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-bg border-0 hover:opacity-90">
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>
                Update your profile information below.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {profileFields.map((field) => (
                <div key={field.key} className="space-y-2">
                  <Label htmlFor={field.key}>{field.label}</Label>
                  <Input
                    id={field.key}
                    name={field.key}
                    value={editData[field.key as keyof typeof editData]}
                    onChange={handleInputChange}
                    className="h-10"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveProfile} className="gradient-bg border-0">
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b">
          <CardTitle className="text-xl flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Supplier Details
          </CardTitle>
          <CardDescription>
            Your business information and contact details
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profileFields.map((field) => {
              const Icon = field.icon;
              return (
                <div key={field.key} className="flex items-start space-x-3 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <Label className="text-sm font-medium text-gray-600">{field.label}</Label>
                    <p className="text-base font-semibold text-gray-900 mt-1">{field.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

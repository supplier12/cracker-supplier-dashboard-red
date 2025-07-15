
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ProfileSection } from "@/components/ProfileSection";
import { ProductSection } from "@/components/ProductSection";
import { OrdersSection } from "@/components/OrdersSection";
import { Button } from "@/components/ui/button";
import { Menu, LogOut } from "lucide-react";

export const Dashboard = () => {
  const [activeSection, setActiveSection] = useState<"profile" | "products" | "orders">("profile");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSignOut = () => {
    window.location.reload();
  };

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileSection />;
      case "products":
        return <ProductSection />;
      case "orders":
        return <OrdersSection />;
      default:
        return <ProfileSection />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />
        
        <main className="flex-1 flex flex-col">
          <header className="bg-white shadow-sm border-b p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="hover:bg-gray-100"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold gradient-text">
                Supplier Dashboard
              </h1>
            </div>
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </header>
          
          <div className="flex-1 p-6">
            {renderContent()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

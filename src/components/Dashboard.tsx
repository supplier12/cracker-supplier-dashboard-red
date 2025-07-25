
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ProfileSection } from "@/components/ProfileSection";
import { ProductSection } from "@/components/ProductSection";
import { OrdersSection } from "@/components/OrdersSection";
import { Button } from "@/components/ui/button";
import { Menu, LogOut } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export const Dashboard = () => {
  const [activeSection, setActiveSection] = useState<"profile" | "products" | "orders">("profile");
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

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
        {/* Mobile Overlay */}
        {isMobile && isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        
        <AppSidebar 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          isMobile={isMobile}
        />
        
        <main className="flex-1 flex flex-col min-w-0">
          <header className="bg-white shadow-sm border-b p-3 md:p-4 flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-4 min-w-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="hover:bg-gray-100 flex-shrink-0"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-lg md:text-2xl font-bold gradient-text truncate">
                Supplier Dashboard
              </h1>
            </div>
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="flex items-center gap-1 md:gap-2 text-xs md:text-sm flex-shrink-0"
              size={isMobile ? "sm" : "default"}
            >
              <LogOut className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </header>
          
          <div className="flex-1 p-3 md:p-6 overflow-x-hidden">
            <div className="w-full max-w-full">
              {renderContent()}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

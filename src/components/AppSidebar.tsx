
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar";
import { User, Package, ShoppingCart, Store, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppSidebarProps {
  activeSection: "profile" | "products" | "orders";
  setActiveSection: (section: "profile" | "products" | "orders") => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const AppSidebar = ({ 
  activeSection, 
  setActiveSection, 
  isOpen,
  setIsOpen 
}: AppSidebarProps) => {
  const menuItems = [
    {
      id: "profile" as const,
      label: "Profile",
      icon: User,
      description: "Manage your information"
    },
    {
      id: "products" as const,
      label: "Products",
      icon: Package,
      description: "Manage your products"
    },
    {
      id: "orders" as const,
      label: "My Orders",
      icon: ShoppingCart,
      description: "View all orders"
    }
  ];

  if (!isOpen) {
    return null;
  }

  return (
    <div className="relative">
      <Sidebar className="bg-white border-r shadow-lg w-48">
        <SidebarHeader className="p-3 border-b relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 h-6 w-6 p-0 hover:bg-gray-100"
          >
            <X className="h-3 w-3" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg gradient-bg">
              <Store className="h-4 w-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold gradient-text">CrackerSupply</h2>
              <p className="text-xs text-muted-foreground">Supplier Panel</p>
            </div>
          </div>
        </SidebarHeader>
        
        <SidebarContent className="p-2">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start h-10 transition-all duration-200 text-xs",
                    isActive 
                      ? "bg-primary text-white shadow-md" 
                      : "hover:bg-accent hover:text-accent-foreground",
                    "px-2"
                  )}
                  onClick={() => setActiveSection(item.id)}
                >
                  <Icon className="h-4 w-4 mr-2 flex-shrink-0" />
                  <div className="flex flex-col items-start text-left">
                    <span className="font-medium text-xs leading-tight">{item.label}</span>
                    <span className="text-xs opacity-75 leading-tight">{item.description}</span>
                  </div>
                </Button>
              );
            })}
          </div>
        </SidebarContent>
      </Sidebar>
    </div>
  );
};

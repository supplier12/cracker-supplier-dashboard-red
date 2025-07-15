
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar";
import { User, Package, ShoppingCart, Store } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppSidebarProps {
  activeSection: "profile" | "products" | "orders";
  setActiveSection: (section: "profile" | "products" | "orders") => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export const AppSidebar = ({ 
  activeSection, 
  setActiveSection, 
  isCollapsed,
  setIsCollapsed 
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

  return (
    <Sidebar className={cn("bg-white border-r shadow-lg", isCollapsed ? "w-16" : "w-72")}>
      <SidebarHeader className="p-6 border-b">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg gradient-bg">
            <Store className="h-6 w-6 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="text-xl font-bold gradient-text">CrackerSupply</h2>
              <p className="text-sm text-muted-foreground">Supplier Panel</p>
            </div>
          )}
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start h-12 transition-all duration-200",
                  isActive 
                    ? "bg-primary text-white shadow-md" 
                    : "hover:bg-accent hover:text-accent-foreground",
                  isCollapsed ? "px-3" : "px-4"
                )}
                onClick={() => setActiveSection(item.id)}
              >
                <Icon className={cn("h-5 w-5", isCollapsed ? "mr-0" : "mr-3")} />
                {!isCollapsed && (
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{item.label}</span>
                    <span className="text-xs opacity-75">{item.description}</span>
                  </div>
                )}
              </Button>
            );
          })}
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

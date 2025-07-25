
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar";
import { User, Package, ShoppingCart, Store, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppSidebarProps {
  activeSection: "profile" | "products" | "orders";
  setActiveSection: (section: "profile" | "products" | "orders") => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isMobile: boolean;
}

export const AppSidebar = ({ 
  activeSection, 
  setActiveSection, 
  isOpen,
  setIsOpen,
  isMobile
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
    <>
      {/* Mobile Sidebar */}
      {isMobile ? (
        <div className={cn(
          "fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <Sidebar className="bg-white border-r shadow-2xl w-80 h-full">
            <SidebarHeader className="p-4 border-b bg-gradient-to-r from-orange-50 to-orange-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg">
                    <Store className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
                      CrackerSupply
                    </h2>
                    <p className="text-sm text-orange-600/80">Supplier Panel</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 p-0 hover:bg-orange-100 rounded-full"
                >
                  <X className="h-4 w-4 text-orange-600" />
                </Button>
              </div>
            </SidebarHeader>
            
            <SidebarContent className="p-3 bg-white">
              <div className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  
                  return (
                    <Button
                      key={item.id}
                      variant={isActive ? "default" : "ghost"}
                      className={cn(
                        "w-full justify-start h-12 transition-all duration-200 text-sm rounded-xl",
                        isActive 
                          ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg hover:from-orange-600 hover:to-orange-700" 
                          : "hover:bg-orange-50 hover:text-orange-700 text-gray-700",
                        "px-4"
                      )}
                      onClick={() => {
                        setActiveSection(item.id);
                        setIsOpen(false);
                      }}
                    >
                      <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
                      <div className="flex flex-col items-start text-left">
                        <span className="font-medium text-sm leading-tight">{item.label}</span>
                        <span className="text-xs opacity-75 leading-tight">{item.description}</span>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </SidebarContent>
          </Sidebar>
        </div>
      ) : (
        /* Desktop Sidebar */
        <div className={cn(
          "transition-all duration-300 ease-in-out",
          !isOpen && "w-0 overflow-hidden"
        )}>
          <Sidebar className="bg-white border-r shadow-lg w-64 h-full">
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
      )}
    </>
  );
};


import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Edit2, Trash2, Plus, Search, Package } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Product {
  id: string;
  category: string;
  name: string;
  price: number;
}

export const ProductSection = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: "1", category: "Flower Pots", name: "Red Flower Pot", price: 150 },
    { id: "2", category: "Sparklers", name: "7cm Sparkler", price: 80 },
    { id: "3", category: "Rockets", name: "Rocket Small", price: 200 },
    { id: "4", category: "Flower Pots", name: "Green Flower Pot", price: 160 },
    { id: "5", category: "Sparklers", name: "12cm Sparkler", price: 120 }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [newProduct, setNewProduct] = useState({
    category: "",
    name: "",
    price: ""
  });

  const categories = ["Flower Pots", "Sparklers", "Rockets", "Bombs", "Whistles"];
  
  const productsByCategory = {
    "Flower Pots": ["Red Flower Pot", "Green Flower Pot", "Blue Flower Pot", "Multi Color Flower Pot"],
    "Sparklers": ["7cm Sparkler", "12cm Sparkler", "15cm Sparkler", "Electric Sparkler"],
    "Rockets": ["Rocket Small", "Rocket Medium", "Rocket Large", "Whistle Rocket"],
    "Bombs": ["Atom Bomb", "Hydrogen Bomb", "Thunder Bomb", "Color Bomb"],
    "Whistles": ["Single Whistle", "Double Whistle", "Triple Whistle", "Musical Whistle"]
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = () => {
    if (newProduct.category && newProduct.name && newProduct.price) {
      const product: Product = {
        id: Date.now().toString(),
        category: newProduct.category,
        name: newProduct.name,
        price: parseFloat(newProduct.price)
      };
      setProducts([...products, product]);
      setNewProduct({ category: "", name: "", price: "" });
      setIsAddDialogOpen(false);
    }
  };

  const handleUpdateProduct = (id: string, newPrice: number) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, price: newPrice } : product
    ));
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const availableProducts = newProduct.category ? productsByCategory[newProduct.category as keyof typeof productsByCategory] || [] : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold gradient-text">Product Management</h2>
          <p className="text-muted-foreground mt-1">Manage your cracker inventory and pricing</p>
        </div>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b">
          <CardTitle className="text-xl flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Product Inventory
          </CardTitle>
          <CardDescription>
            View and manage all your cracker products
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Badge variant="secondary" className="text-sm">
                {filteredProducts.length} entries found
              </Badge>
            </div>
          </div>

          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">S.No</TableHead>
                  <TableHead className="font-semibold">Category</TableHead>
                  <TableHead className="font-semibold">Product Name</TableHead>
                  <TableHead className="font-semibold">Price (₹)</TableHead>
                  <TableHead className="font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product, index) => (
                  <TableRow key={product.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-primary/10 text-primary">
                        {product.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="font-semibold text-green-600">₹{product.price}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingProduct(product)}
                          className="h-8 w-8 p-0 hover:bg-primary/10"
                        >
                          <Edit2 className="h-4 w-4 text-primary" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="h-8 w-8 p-0 hover:bg-red-100"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b">
          <CardTitle className="text-xl flex items-center gap-2">
            <Plus className="h-5 w-5 text-primary" />
            Add New Product
          </CardTitle>
          <CardDescription>
            Add products to your inventory with updated pricing
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={newProduct.category} onValueChange={(value) => setNewProduct({...newProduct, category: value, name: ""})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Select value={newProduct.name} onValueChange={(value) => setNewProduct({...newProduct, name: value})} disabled={!newProduct.category}>
                <SelectTrigger>
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  {availableProducts.map((product) => (
                    <SelectItem key={product} value={product}>{product}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Original Price (₹)</Label>
              <Input
                id="price"
                type="number"
                placeholder="Enter price"
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label>&nbsp;</Label>
              <Button onClick={handleAddProduct} className="w-full gradient-bg border-0 hover:opacity-90">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Product Dialog */}
      <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product Price</DialogTitle>
            <DialogDescription>
              Update the price for {editingProduct?.name}
            </DialogDescription>
          </DialogHeader>
          {editingProduct && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Product Name</Label>
                <Input value={editingProduct.name} disabled />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Input value={editingProduct.category} disabled />
              </div>
              <div className="space-y-2">
                <Label>New Price (₹)</Label>
                <Input
                  type="number"
                  defaultValue={editingProduct.price}
                  onChange={(e) => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setEditingProduct(null)}>
                  Cancel
                </Button>
                <Button onClick={() => handleUpdateProduct(editingProduct.id, editingProduct.price)} className="gradient-bg border-0">
                  Update Price
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

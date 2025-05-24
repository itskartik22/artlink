"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LuPlus, LuPencil, LuTrash2, LuChevronLeft, LuChevronRight } from "react-icons/lu";
import Image from "next/image";
import ProductForm from "@/components/forms/ProductForm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useCurrentUser } from "@/hooks/useCurrentUser";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  dimensions: {
    width?: number;
    height?: number;
    depth?: number;
  } | null;
  medium: string;
  category: string;
  style: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const user = useCurrentUser();
  const [currentImageIndexes, setCurrentImageIndexes] = useState<{ [key: string]: number }>({});

  const fetchProducts = async () => {
    try {
      const response = await fetch(`/api/products?artistId=${user?.id}`);
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
      
      // Initialize image indexes
      const indexes: { [key: string]: number } = {};
      data.forEach((product: Product) => {
        indexes[product.id] = 0;
      });
      setCurrentImageIndexes(indexes);
    } catch (error) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchProducts();
    }
  }, [user?.id]);

  const handleDelete = async (productId: string) => {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete product");
      
      toast.success("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  const nextImage = (productId: string, imagesLength: number) => {
    setCurrentImageIndexes(prev => ({
      ...prev,
      [productId]: (prev[productId] + 1) % imagesLength
    }));
  };

  const prevImage = (productId: string, imagesLength: number) => {
    setCurrentImageIndexes(prev => ({
      ...prev,
      [productId]: (prev[productId] - 1 + imagesLength) % imagesLength
    }));
  };

  if (!user?.id) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <p>Please log in to view your products.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Artworks</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <LuPlus className="mr-2 h-4 w-4" />
              Add New Artwork
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[900px] h-[90vh] overflow-y-auto">
            <ProductForm onSuccess={() => {
              setOpen(false);
              fetchProducts();
            }} />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Artwork Inventory</CardTitle>
          <CardDescription>
            Manage your artworks, update details, and track inventory
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : products.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              No artworks found. Start by adding your first artwork!
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Images</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Specifications</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="relative w-32 h-32">
                        <Image
                          src={product.images[currentImageIndexes[product.id]]}
                          alt={product.name}
                          fill
                          className="object-cover rounded"
                        />
                        {product.images.length > 1 && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40"
                              onClick={() => prevImage(product.id, product.images.length)}
                            >
                              <LuChevronLeft className="h-4 w-4 text-white" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40"
                              onClick={() => nextImage(product.id, product.images.length)}
                            >
                              <LuChevronRight className="h-4 w-4 text-white" />
                            </Button>
                          </>
                        )}
                        <div className="absolute bottom-1 right-1 bg-black/60 text-white text-xs px-2 py-1 rounded">
                          {currentImageIndexes[product.id] + 1}/{product.images.length}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-gray-500 line-clamp-2">
                          {product.description}
                        </div>
                        <div className="text-sm mt-1">
                          <span className="font-medium">Category:</span> {product.category}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div><span className="font-medium">Medium:</span> {product.medium}</div>
                        <div><span className="font-medium">Style:</span> {product.style}</div>
                        {product.dimensions && (
                          <div className="mt-1">
                            <div className="font-medium">Dimensions:</div>
                            <div className="pl-2">
                              {product.dimensions.width && <div>Width: {product.dimensions.width}cm</div>}
                              {product.dimensions.height && <div>Height: {product.dimensions.height}cm</div>}
                              {product.dimensions.depth && <div>Depth: {product.dimensions.depth}cm</div>}
                            </div>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>₹{product.price}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            // TODO: Implement edit functionality
                            toast.info("Edit functionality coming soon!");
                          }}
                        >
                          <LuPencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDelete(product.id)}
                        >
                          <LuTrash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 
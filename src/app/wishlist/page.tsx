"use client";

import { useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { getWishlistItems } from "@/actions/wishlistAction";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toggleWishlist } from "@/actions/wishlistAction";
import AddToCart from "@/components/cart/AddToCart";
import Link from "next/link";

interface WishlistItem {
  id: string;
  product: {
    id: string;
    name: string;
    description: string | null;
    price: number;
    images: string[];
    stock: number;
  };
}

const WishlistPage = () => {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = useCurrentUser();
  const { toast } = useToast();

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) return;

      try {
        const result = await getWishlistItems(user.id);
        if ("error" in result) {
          toast({
            title: "Error",
            description: result.error,
            variant: "destructive",
          });
          return;
        }
        setItems(result.items as WishlistItem[]);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch wishlist items",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlist();
  }, [user, toast]);

  const handleRemove = async (productId: string) => {
    if (!user) return;

    try {
      const result = await toggleWishlist(user.id, productId);
      if ("error" in result) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
        return;
      }

      setItems(items.filter(item => item.product.id !== productId));
      toast({
        title: "Success",
        description: "Item removed from wishlist",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove item",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold mb-4">Please login to view your wishlist</h2>
        <Link href="/login">
          <Button>Login</Button>
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
        <Link href="/explore">
          <Button>Explore Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row gap-4 bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
          >
            <div className="relative w-full md:w-48 h-48">
              <Image
                src={item.product.images[0]}
                alt={item.product.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">{item.product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {item.product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">₹{item.product.price}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemove(item.product.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              <div className="mt-4">
                <AddToCart
                  productId={item.product.id}
                  stock={item.product.stock}
                  price={item.product.price}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;

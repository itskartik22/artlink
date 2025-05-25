"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { toggleWishlist, getWishlistStatus } from "@/actions/wishlistAction";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  productId: string;
  className?: string;
}

const WishlistButton = ({ productId, className }: WishlistButtonProps) => {
  const { toast } = useToast();
  const user = useCurrentUser();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkWishlistStatus = async () => {
      if (!user) return;

      const result = await getWishlistStatus(user.id, productId);
      if (!("error" in result)) {
        setIsInWishlist(result.inWishlist);
      }
    };

    checkWishlistStatus();
  }, [user, productId]);

  const handleWishlist = async () => {
    if (!user) {
      toast({
        title: "Please login",
        description: "You need to be logged in to add items to wishlist",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const result = await toggleWishlist(user.id, productId);

      if ("error" in result) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
        return;
      }

      setIsInWishlist(result.inWishlist);
      toast({
        title: result.inWishlist ? "Added to Wishlist" : "Removed from Wishlist",
        description: result.inWishlist 
          ? "Item has been added to your wishlist"
          : "Item has been removed from your wishlist",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update wishlist",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      className={cn(
        "w-full bg-white text-gray-900 hover:text-white hover:shadow-inner hover:shadow-white",
        isInWishlist && "bg-red-500 text-white",
        className
      )}
      onClick={handleWishlist}
      disabled={isLoading}
    >
      {isLoading ? "Updating..." : isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
    </Button>
  );
};

export default WishlistButton; 
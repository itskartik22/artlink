"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Heart } from "lucide-react";
import { toggleLike, getLikesCount, isLiked } from "@/actions/likeAction";
import { cn } from "@/lib/utils";

interface LikeButtonProps {
  productId: string;
  className?: string;
}

const LikeButton = ({ productId, className }: LikeButtonProps) => {
  const { toast } = useToast();
  const user = useCurrentUser();
  const [isLikedState, setIsLikedState] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      if (!user) return;

      const [likeStatus, countResult] = await Promise.all([
        isLiked(user.id, productId),
        getLikesCount(productId),
      ]);

      if (!("error" in likeStatus)) {
        setIsLikedState(likeStatus.liked);
      }

      if (!("error" in countResult)) {
        setLikesCount(countResult.count);
      }
    };

    fetchLikeStatus();
  }, [user, productId]);

  const handleLike = async () => {
    if (!user) {
      toast({
        title: "Please login",
        description: "You need to be logged in to like products",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const result = await toggleLike(user.id, productId);

      if ("error" in result) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
        return;
      }

      setIsLikedState(result.liked);
      setLikesCount((prev) => (result.liked ? prev + 1 : prev - 1));
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Failed to update like status",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "relative group transition-all duration-200 hover:scale-110",
        isLikedState && "text-red-500",
        className
      )}
      onClick={handleLike}
      disabled={isLoading}
    >
      <Heart
        className={cn(
          "h-5 w-5 transition-all duration-200",
          isLikedState && "fill-current"
        )}
      />
      {likesCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-background text-xs px-1.5 py-0.5 rounded-full">
          {likesCount}
        </span>
      )}
    </Button>
  );
};

export default LikeButton; 
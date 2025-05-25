"use server";

import { prisma } from "@/lib/db";

export async function toggleWishlist(userId: string, productId: string) {
  try {
    // Check if the item is already in wishlist
    const existingItem = await prisma.wishlist.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    if (existingItem) {
      // Remove from wishlist
      await prisma.wishlist.delete({
        where: {
          id: existingItem.id,
        },
      });
      return { inWishlist: false };
    }

    // Add to wishlist
    await prisma.wishlist.create({
      data: {
        userId,
        productId,
      },
    });
    return { inWishlist: true };
  } catch (error) {
    console.error("Error toggling wishlist:", error);
    return { error: "Failed to update wishlist" };
  }
}

export async function getWishlistStatus(userId: string, productId: string) {
  try {
    const item = await prisma.wishlist.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });
    return { inWishlist: !!item };
  } catch (error) {
    console.error("Error checking wishlist status:", error);
    return { error: "Failed to check wishlist status" };
  }
}

export async function getWishlistItems(userId: string) {
  try {
    const items = await prisma.wishlist.findMany({
      where: {
        userId,
      },
      include: {
        product: true,
      },
    });
    return { items };
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return { error: "Failed to fetch wishlist" };
  }
} 
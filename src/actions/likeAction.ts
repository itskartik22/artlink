"use server";

import { prisma } from "@/lib/db";

export async function toggleLike(userId: string, productId: string) {
  try {
    // Check if the like already exists
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    if (existingLike) {
      // Unlike the product
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
      return { liked: false };
    }

    // Like the product
    await prisma.like.create({
      data: {
        userId,
        productId,
      },
    });
    return { liked: true };
  } catch (error) {
    console.error("Error toggling like:", error);
    return { error: "Failed to toggle like" };
  }
}

export async function getLikesCount(productId: string) {
  try {
    const count = await prisma.like.count({
      where: {
        productId,
      },
    });
    return { count };
  } catch (error) {
    console.error("Error getting likes count:", error);
    return { error: "Failed to get likes count" };
  }
}

export async function isLiked(userId: string, productId: string) {
  try {
    const like = await prisma.like.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });
    return { liked: !!like };
  } catch (error) {
    console.error("Error checking like status:", error);
    return { error: "Failed to check like status" };
  }
} 
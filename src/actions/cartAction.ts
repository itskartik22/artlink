"use server";

import { prisma } from "@/lib/db";

export async function addToCart(userId: string, productId: string, quantity: number) {
  console.log("userId", userId);
  console.log("productId", productId);
  console.log("quantity", quantity);
  try {
    // Check if the product exists and has enough stock
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return { error: "Product not found." };
    }

    if (product.stock < quantity) {
      return { error: "Not enough stock available." };
    }

    // Check if the item is already in the cart
    const existingCartItem = await prisma.cart.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    if (existingCartItem) {
      // Update quantity if item exists
      const newQuantity = existingCartItem.quantity + quantity;
      if (newQuantity > product.stock) {
        return { error: "Not enough stock available." };
      }

      const updatedCartItem = await prisma.cart.update({
        where: {
          id: existingCartItem.id,
        },
        data: {
          quantity: newQuantity,
        },
      });

      return updatedCartItem;
    }

    // Create new cart item if it doesn't exist
    const cartItem = await prisma.cart.create({
      data: {
        userId,
        productId,
        quantity,
      },
    });

    return cartItem;
  } catch (error) {
    console.error(error);
    return { error: "Error adding to cart." };
  }
}

export async function getCart(userId: string) {
  try {
    const cartItems = await prisma.cart.findMany({
      where: {
        userId,
      },
      include: {
        product: true,
      },
    });
    if (!cartItems) {
      return { error: "No items in cart." };
    }
    return cartItems;
  } catch (error) {
    console.error(error);
    return { error: "Error fetching cart." };
  }
}

export async function updateCartItem(cartItemId: string, quantity: number) {
  try {
    const cartItem = await prisma.cart.update({
      where: {
        id: cartItemId,
      },
      data: {
        quantity,
      },
    });
    if (!cartItem) {
      return { error: "Error updating cart item." };
    }
    return cartItem;
  } catch (error) {
    console.error(error);
    return { error: "Error updating cart item." };
  }
}

export async function removeFromCart(cartItemId: string) {
  try {
    const cartItem = await prisma.cart.delete({
      where: {
        id: cartItemId,
      },
    });
    if (!cartItem) {
      return { error: "Error removing from cart." };
    }
    return cartItem;
  } catch (error) {
    console.error(error);
    return { error: "Error removing from cart." };
  }
}

export async function clearCart(userId: string) {
  try {
    const cartItems = await prisma.cart.deleteMany({
      where: {
        userId,
      },
    });
    if (!cartItems) {
      return { error: "Error clearing cart." };
    }
    return cartItems;
  } catch (error) {
    console.error(error);
    return { error: "Error clearing cart." };
  }
}
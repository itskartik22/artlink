"use server";

import { prisma } from "@/lib/db";

export async function getProducts(artistId: string) {
  try {
    const products = await prisma.product.findMany({
      where: {
        artistId,
      },
    });
    if (!products) {
      return { error: "No products found." };
    }
    return products;
  } catch (error) {
    console.error(error);
    return { error: "Error fetching products." };
  }
}

export async function getProduct(productId: string) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
    if (!product) {
      return { error: "Product not found." };
    }
    return product;
  } catch (error) {
    console.error(error);
    return { error: "Error fetching product." };
  }
}

export async function createProduct(data: any) {
  try {
    const product = await prisma.product.create({
      data,
    });
    if (!product) {
      return { error: "Error creating product." };
    }
    return product;
  } catch (error) {
    console.error(error);
    return { error: "Error creating product." };
  }
}

export async function updateProduct(productId: string, data: any) {
  try {
    const product = await prisma.product.update({
      where: {
        id: productId,
      },
      data,
    });
    if (!product) {
      return { error: "Product not found." };
    }
    return product;
  } catch (error) {
    console.error(error);
    return { error: "Error updating product." };
  }
}

export async function deleteProduct(productId: string) {
  try {
    const product = await prisma.product.delete({
      where: {
        id: productId,
      },
    });
    if (!product) {
      return { error: "Product not found." };
    }
    return product;
  } catch (error) {
    console.error(error);
    return { error: "Error deleting product." };
  }
}

// get all products
export async function getAllProducts() {
  try {
    const products = await prisma.product.findMany({
      include: {
        likes: true,
      },
    });
    return { products: products.map(product => ({
      ...product,
      likes: product.likes || []
    })) };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { error: "Failed to fetch products" };
  }
}
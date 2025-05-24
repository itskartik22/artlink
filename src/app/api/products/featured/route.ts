import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: {
        stock: {
          gt: 0,
        },
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 8,
    });

    const formattedProducts = products.map(product => ({
      ...product,
      artist: {
        name: product.user.name,
      },
    }));

    return NextResponse.json(formattedProducts);
  } catch (error) {
    console.error("[FEATURED_PRODUCTS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 
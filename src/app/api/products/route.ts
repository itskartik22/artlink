import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const session = await auth();

    
    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    })
    console.log("reqk", user);

    if (!user || user.role !== "Artist") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    console.log("body", body);
    const { 
      name, 
      description, 
      price, 
      stock, 
      images,
      dimensions,
      medium,
      category,
      style,
    } = body;

    if (!name || !description || !price || stock === undefined || !images || images.length === 0) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    if (images.length > 5) {
      return new NextResponse("Maximum 5 images allowed", { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
        images,
        dimensions,
        medium,
        category,
        style,
        artistId: user.id,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("[PRODUCTS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const artistId = searchParams.get("artistId");

    if (!artistId) {
      return new NextResponse("Artist ID is required", { status: 400 });
    }

    const products = await prisma.product.findMany({
      where: {
        artistId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("[PRODUCTS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 
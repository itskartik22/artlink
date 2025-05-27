import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "Admin") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const artworks = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        images: true,
        status: true,
        createdAt: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(artworks);
  } catch (error) {
    console.error("[ADMIN_ARTWORKS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "Admin") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { artworkId, status, rejectionReason } = body;

    if (!artworkId || !status) {
      return new NextResponse("Artwork ID and status are required", { status: 400 });
    }

    const artwork = await prisma.product.update({
      where: {
        id: artworkId,
      },
      data: {
        status,
        ...(rejectionReason && { rejectionReason }),
        isVerified: status === "approved",
      },
    });

    return NextResponse.json(artwork);
  } catch (error) {
    console.error("[ADMIN_ARTWORKS_UPDATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 
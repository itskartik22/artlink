import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "Artist") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { orderId } = params;
    const body = await req.json();
    const { status } = body;

    if (!status || !["pending", "processing", "completed", "cancelled"].includes(status)) {
      return new NextResponse("Invalid status", { status: 400 });
    }

    // Verify the order belongs to the artist's products
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        product: true
      }
    });

    if (!order) {
      return new NextResponse("Order not found", { status: 404 });
    }

    if (order.product.artistId !== session.user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Update order status
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status },
      include: {
        product: {
          select: {
            name: true,
            images: true
          }
        },
        user: {
          select: {
            name: true
          }
        }
      }
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error("[ORDER_UPDATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 
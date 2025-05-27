import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "Admin") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const orders = await prisma.order.findMany({
      select: {
        id: true,
        createdAt: true,
        status: true,
        quantity: true,
        totalAmount: true,
        product: {
          select: {
            name: true,
            images: true,
            price: true,
          },
        },
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

    return NextResponse.json(orders);
  } catch (error) {
    console.error("[ADMIN_ORDERS]", error);
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
    const { orderId, status } = body;

    if (!orderId || !status) {
      return new NextResponse("Order ID and status are required", { status: 400 });
    }

    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status,
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("[ADMIN_ORDERS_UPDATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function PATCH(req: Request, { params }: { params: { orderId: string } }) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "Admin") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { orderId } = params;
    const body = await req.json();
    const { status } = body;

    if (!orderId || !status) {
      return new NextResponse("Order ID and status are required", { status: 400 });
    }

    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("[ADMIN_ORDERS_UPDATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 
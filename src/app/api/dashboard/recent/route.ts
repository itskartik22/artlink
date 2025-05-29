import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "Artist") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get 5 most recent orders
    const recentOrders = await prisma.order.findMany({
      where: {
        product: {
          artistId: session.user.id
        }
      },
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
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 5
    });

    // Get 5 most recent commission requests
    const recentCommissions = await prisma.commission.findMany({
      where: {
        artistId: session.user.id
      },
      include: {
        client: {
          select: {
            name: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 5
    });

    return NextResponse.json({
      orders: recentOrders.map(order => ({
        id: order.id,
        productName: order.product.name,
        customerName: order.user.name,
        amount: order.totalAmount,
        status: order.status,
        date: order.createdAt,
        image: order.product.images[0]
      })),
      commissions: recentCommissions.map(commission => ({
        id: commission.id,
        customerName: commission.client.name,
        description: commission.description,
        budget: commission.budget,
        status: commission.status,
        date: commission.createdAt
      }))
    });
  } catch (error) {
    console.error("[DASHBOARD_RECENT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 
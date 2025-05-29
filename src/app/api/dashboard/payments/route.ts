import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "Artist") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get total earnings from completed orders
    const totalEarnings = await prisma.order.aggregate({
      where: {
        product: {
          artistId: session.user.id
        },
        status: "completed"
      },
      _sum: {
        totalAmount: true
      }
    });

    // Get pending payments (orders that are completed but not yet withdrawn)
    const pendingPayments = await prisma.order.aggregate({
      where: {
        product: {
          artistId: session.user.id
        },
        status: "processing"
      },
      _sum: {
        totalAmount: true
      }
    });

    // Get recent transactions
    const transactions = await prisma.order.findMany({
      where: {
        product: {
          artistId: session.user.id
        },
        status: {
          in: ["completed", "processing", "pending"]
        }
      },
      include: {
        product: {
          select: {
            name: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      },
      take: 10
    });

    // Get commission earnings
    const commissionEarnings = await prisma.commission.aggregate({
      where: {
        artistId: session.user.id,
        status: "Completed"
      },
      _sum: {
        budget: true
      }
    });

    return NextResponse.json({
      stats: {
        totalEarnings: (totalEarnings._sum?.totalAmount || 0) + (commissionEarnings._sum?.budget || 0),
        availableBalance: pendingPayments._sum?.totalAmount || 0,
        pendingPayments: pendingPayments._sum?.totalAmount || 0
      },
      transactions: transactions.map(tx => ({
        id: tx.id,
        type: "Sale",
        description: tx.product.name,
        amount: tx.totalAmount,
        status: tx.status,
        date: tx.createdAt
      }))
    });
  } catch (error) {
    console.error("[DASHBOARD_PAYMENTS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 
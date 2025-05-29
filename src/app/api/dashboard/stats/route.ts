import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "Artist") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Calculate total revenue (all time)
    const totalRevenue = await prisma.order.aggregate({
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

    // Calculate revenue for last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentRevenue = await prisma.order.aggregate({
      where: {
        product: {
          artistId: session.user.id
        },
        status: "completed",
        createdAt: {
          gte: thirtyDaysAgo
        }
      },
      _sum: {
        totalAmount: true
      }
    });

    // Get total orders count
    const totalOrders = await prisma.order.count({
      where: {
        product: {
          artistId: session.user.id
        }
      }
    });

    // Get recent orders count (last 30 days)
    const recentOrders = await prisma.order.count({
      where: {
        product: {
          artistId: session.user.id
        },
        createdAt: {
          gte: thirtyDaysAgo
        }
      }
    });

    // Get active and total products count
    const productsCount = await prisma.product.aggregate({
      where: {
        artistId: session.user.id
      },
      _count: {
        id: true
      }
    });

    const activeProductsCount = await prisma.product.count({
      where: {
        artistId: session.user.id,
        status: "active"
      }
    });

    // Get commission requests statistics
    const commissionsStats = await prisma.commission.groupBy({
      by: ['status'],
      where: {
        artistId: session.user.id
      },
      _count: {
        id: true
      }
    });

    // Calculate commission statistics
    const commissionCounts = {
      total: 0,
      pending: 0,
      completed: 0,
      rejected: 0
    };

    commissionsStats.forEach(stat => {
      commissionCounts.total += stat._count.id;
      if (stat.status in commissionCounts) {
        commissionCounts[stat.status as keyof typeof commissionCounts] = stat._count.id;
      }
    });

    return NextResponse.json({
      revenue: {
        total: totalRevenue._sum.totalAmount || 0,
        recent: recentRevenue._sum.totalAmount || 0
      },
      orders: {
        total: totalOrders,
        recent: recentOrders
      },
      products: {
        total: productsCount._count.id || 0,
        active: activeProductsCount
      },
      commissions: commissionCounts
    });
  } catch (error) {
    console.error("[DASHBOARD_STATS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 
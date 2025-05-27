import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "Admin") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const [
      totalUsers,
      totalArtworks,
      totalRevenue,
      pendingVerifications,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.product.count(),
      prisma.order.aggregate({
        _sum: {
          quantity: true,
        },
      }),
      prisma.product.count({
        where: {
          status: "pending",
        },
      }),
    ]);

    return NextResponse.json({
      totalUsers,
      totalArtworks,
      totalRevenue: totalRevenue._sum.quantity || 0,
      pendingVerifications,
    });
  } catch (error) {
    console.error("[ADMIN_STATS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 
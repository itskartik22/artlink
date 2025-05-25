import { NextResponse } from "next/server";
import { auth } from "@/auth";
import {prisma } from "@/lib/db";

// GET artist's commissions
export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const commissions = await prisma.commission.findMany({
      where: {
        artistId: session.user.id,
      },
      include: {
        client: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(commissions);
  } catch (error) {
    console.error("[COMMISSIONS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// Update commission status
export async function PATCH(req: Request) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { commissionId, status } = body;

    if (!commissionId || !status) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Verify the artist owns this commission
    const commission = await prisma.commission.findUnique({
      where: {
        id: commissionId,
        artistId: session.user.id,
      },
    });

    if (!commission) {
      return new NextResponse("Commission not found", { status: 404 });
    }

    // Update the commission status
    const updatedCommission = await prisma.commission.update({
      where: {
        id: commissionId,
      },
      data: {
        status,
      },
    });

    return NextResponse.json(updatedCommission);
  } catch (error) {
    console.error("[COMMISSION_UPDATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 
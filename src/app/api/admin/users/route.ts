import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "Admin") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        verifiedByAdmin: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("[ADMIN_USERS]", error);
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
    const { userId, role, verifiedByAdmin } = body;

    if (!userId) {
      return new NextResponse("User ID is required", { status: 400 });
    }

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...(role && { role }),
        ...(typeof verifiedByAdmin === "boolean" && { verifiedByAdmin }),
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("[ADMIN_USERS_UPDATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 
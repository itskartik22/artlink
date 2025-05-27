import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function PATCH(req: Request, { params }: { params: { userId: string } }) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "Admin") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { userId } = params;
    const body = await req.json();
    const { role, verifiedByAdmin } = body;

    if (!userId) {
      return new NextResponse("User ID is required", { status: 400 });
    }

    const user = await prisma.user.update({
      where: { id: userId },
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
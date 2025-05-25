import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

// Get artist availability
export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        id: true,
        profileSetup: true,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("[ARTIST_AVAILABILITY_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// Update artist availability
export async function PATCH(req: Request) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { available } = body;

    if (typeof available !== 'boolean') {
      return new NextResponse("Invalid availability status", { status: 400 });
    }

    const user = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        profileSetup: available,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("[ARTIST_AVAILABILITY_UPDATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 
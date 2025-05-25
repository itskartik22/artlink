import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

// Get artist commission settings
export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const settings = await prisma.artistCommissionSettings.findUnique({
      where: {
        userId: session.user.id,
      },
      include: {
        artForms: true,
        tags: true,
      },
    });

    return NextResponse.json(settings);
  } catch (error) {
    console.error("[COMMISSION_SETTINGS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// Create or update artist commission settings
export async function POST(req: Request) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const {
      isAcceptingCommissions,
      basePrice,
      pricePerHour,
      minimumPrice,
      maximumPrice,
      currency,
      turnaroundDays,
      description,
      termsAndConditions,
      artForms,
      tags,
    } = body;

    // Validate required fields
    if (!basePrice || !minimumPrice) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Create or update commission settings with nested artForms and tags
    const settings = await prisma.artistCommissionSettings.upsert({
      where: {
        userId: session.user.id,
      },
      create: {
        userId: session.user.id,
        isAcceptingCommissions,
        basePrice,
        pricePerHour,
        minimumPrice,
        maximumPrice,
        currency,
        turnaroundDays,
        description,
        termsAndConditions,
        artForms: {
          create: artForms,
        },
        tags: {
          create: tags,
        },
      },
      update: {
        isAcceptingCommissions,
        basePrice,
        pricePerHour,
        minimumPrice,
        maximumPrice,
        currency,
        turnaroundDays,
        description,
        termsAndConditions,
        artForms: {
          deleteMany: {},
          create: artForms,
        },
        tags: {
          deleteMany: {},
          create: tags,
        },
      },
      include: {
        artForms: true,
        tags: true,
      },
    });

    return NextResponse.json(settings);
  } catch (error) {
    console.error("[COMMISSION_SETTINGS_UPDATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// Delete artist commission settings
export async function DELETE() {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await prisma.artistCommissionSettings.delete({
      where: {
        userId: session.user.id,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[COMMISSION_SETTINGS_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 
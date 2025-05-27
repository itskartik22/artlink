import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    if (!signature) {
      return new NextResponse("Signature missing", { status: 400 });
    }

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(body)
      .digest("hex");

    if (signature !== expectedSignature) {
      return new NextResponse("Invalid signature", { status: 400 });
    }

    const event = JSON.parse(body);

    // Handle successful payment
    if (event.event === "payment.captured") {
      const { order_id, payment_id } = event.payload.payment.entity;

      // Update order status
      await prisma.order.update({
        where: {
          paymentId: order_id,
        },
        data: {
          status: "completed",
        },
      });

      // Clear cart (you'll need to implement this)
      // await clearCart(userId);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[RAZORPAY_WEBHOOK]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    console.log(razorpay)

    const body = await req.json();
    const { amount, items } = body;

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Convert to smallest currency unit (paise)
      currency: "INR",
      receipt: `order_${Date.now()}`,
    });


    // Create order in database
    const dbOrder = await prisma.order.create({
      data: {
        userId: session.user.id,
        productId: items[0].product.id, // Assuming single product for now
        quantity: items[0].quantity,
        totalAmount: amount,
        paymentId: order.id,
        status: "pending",
      },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      dbOrderId: dbOrder.id,
    });
  } catch (error) {
    console.error("[RAZORPAY_ORDER]", error);
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 
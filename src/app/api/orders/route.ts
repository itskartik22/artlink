import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    let orders;
    if (session.user.role === "Artist") {
      // Artists can only see orders for their own products
      orders = await prisma.order.findMany({
        where: {
          product: {
            artistId: session.user.id
          }
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            }
          },
          product: {
            select: {
              id: true,
              name: true,
              price: true,
              images: true,
              artistId: true,
              user: {
                select: {
                  name: true,
                  email: true,
                }
              }
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
    } else {
      // Regular users can only see their own orders
      orders = await prisma.order.findMany({
        where: {
          userId: session.user.id
        },
        include: {
          product: {
            select: {
              id: true,
              name: true,
              price: true,
              images: true,
              artistId: true,
              user: {
                select: {
                  name: true,
                  email: true,
                }
              }
            }
          },
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
    }

    // Remove sensitive information before sending response
    const sanitizedOrders = orders.map(order => ({
      id: order.id,
      createdAt: order.createdAt,
      totalAmount: order.totalAmount,
      status: order.status,
      quantity: order.quantity,
      user: session.user.role === "Artist" ? {
        name: order.user.name,
        email: order.user.email
      } : undefined,
      product: {
        id: order.product.id,
        name: order.product.name,
        price: order.product.price,
        images: order.product.images,
        user: {
          name: order.product.user.name
        }
      }
    }));

    return NextResponse.json(sanitizedOrders);
  } catch (error) {
    console.error("[ORDERS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 
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
      const artistProducts = await prisma.product.findMany({
        where: {
          artistId: session.user.id
        },
        select: {
          id: true
        }
      });

      const productIds = artistProducts.map(product => product.id);

      orders = await prisma.order.findMany({
        where: {
          productId: {
            in: productIds
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

      // Verify each order's product belongs to the artist
      orders = orders.filter(order => order.product.artistId === session.user.id);
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

      // Additional verification that user only sees their own orders
      orders = orders.filter(order => order.userId === session.user.id);
    }

    // Remove sensitive information before sending response
    const sanitizedOrders = orders.map(order => ({
      ...order,
      user: session.user.role === "Artist" ? {
        name: order.user.name,
        email: order.user.email
      } : {
        name: order.user.name
      },
      product: {
        ...order.product,
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
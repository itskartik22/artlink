"use client";

import { useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";

interface OrderProduct {
  id: string;
  name: string;
  price: number;
  images: string[];
  user?: {
    name: string;
    email: string;
  };
}

interface Order {
  id: string;
  createdAt: string;
  totalAmount: number;
  status: string;
  quantity: number;
  product: OrderProduct;
  user?: {
    name: string;
    email: string;
  };
}

const OrderCard = ({ order, isArtist }: { order: Order; isArtist: boolean }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const statusColor = {
    completed: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    cancelled: "bg-red-100 text-red-800"
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              <span>Order #{order.id.slice(0, 8)}</span>
              <Badge
                className={`${statusColor[order.status as keyof typeof statusColor]} border-none`}
              >
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
            </CardTitle>
            <CardDescription className="mt-1">
              Placed on {new Date(order.createdAt).toLocaleDateString()} at{" "}
              {new Date(order.createdAt).toLocaleTimeString()}
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              className={`w-6 h-6 transform transition-transform ${isExpanded ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className={`space-y-4 ${isExpanded ? "" : "max-h-[150px] overflow-hidden"}`}>
          <div className="flex gap-6 items-start">
            <div className="relative w-32 h-32 flex-shrink-0">
              <img
                src={order.product.images[0]}
                alt={order.product.name}
                className="object-cover rounded-lg w-full h-full shadow-sm"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {order.product.name}
              </h3>
              {isArtist ? (
                <p className="text-sm text-gray-600 mb-1">
                  Buyer: {order.user?.name}
                </p>
              ) : (
                <p className="text-sm text-gray-600 mb-1">
                  Artist: {order.product.user?.name}
                </p>
              )}
              <div className="flex flex-wrap gap-4 mt-3">
                <div className="bg-gray-50 px-3 py-1 rounded-full">
                  <p className="text-sm text-gray-600">
                    Quantity: <span className="font-medium">{order.quantity}</span>
                  </p>
                </div>
                <div className="bg-gray-50 px-3 py-1 rounded-full">
                  <p className="text-sm text-gray-600">
                    Price: <span className="font-medium">₹{order.product.price.toLocaleString()}</span>
                  </p>
                </div>
                <div className="bg-gray-50 px-3 py-1 rounded-full">
                  <p className="text-sm text-gray-600">
                    Total: <span className="font-medium">₹{order.totalAmount.toLocaleString()}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {isExpanded && (
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Order Details</h4>
                  <dl className="space-y-1">
                    <div className="text-sm">
                      <dt className="inline text-gray-500">Order ID: </dt>
                      <dd className="inline ml-1 text-gray-900">{order.id}</dd>
                    </div>
                    <div className="text-sm">
                      <dt className="inline text-gray-500">Status: </dt>
                      <dd className="inline ml-1 text-gray-900 capitalize">{order.status}</dd>
                    </div>
                  </dl>
                </div>
                {isArtist && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Buyer Information</h4>
                    <dl className="space-y-1">
                      <div className="text-sm">
                        <dt className="inline text-gray-500">Name: </dt>
                        <dd className="inline ml-1 text-gray-900">{order.user?.name}</dd>
                      </div>
                      <div className="text-sm">
                        <dt className="inline text-gray-500">Email: </dt>
                        <dd className="inline ml-1 text-gray-900">{order.user?.email}</dd>
                      </div>
                    </dl>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const OrderSkeleton = () => (
  <Card>
    <CardHeader>
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-32" />
        </div>
        <Skeleton className="h-5 w-20" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="flex items-center gap-4">
        <Skeleton className="h-24 w-24 rounded-md" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-20" />
        </div>
        <div className="text-right space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = useCurrentUser();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {

    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast({
          title: "Error",
          description: "Failed to fetch orders",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (user && user.role !== "Artist") {
      fetchOrders();
    }
  }, [user, toast, router]);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <h2 className="text-2xl font-semibold mb-4">Please login</h2>
            <p className="text-muted-foreground mb-6">You need to be logged in to view your orders</p>
            <Button onClick={() => router.push("/login")}>
              Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <OrderSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Your Orders</h1>
            <p className="text-gray-600 mt-1">Track and manage your purchases</p>
          </div>
          <Button onClick={() => router.push("/explore")} className="bg-primary hover:bg-primary/90">
            Continue Shopping
          </Button>
        </div>

        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">No orders yet</h2>
            <p className="text-gray-600 text-center mb-6 max-w-sm">
              Looks like you haven't made any purchases yet. Start exploring our amazing collection of artworks!
            </p>
            <Button onClick={() => router.push("/explore")} className="bg-primary hover:bg-primary/90">
              Start Shopping
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Your Orders</h1>
          <p className="text-gray-600 mt-1">Track and manage your purchases</p>
        </div>
        <Button onClick={() => router.push("/explore")} className="bg-primary hover:bg-primary/90">
          Continue Shopping
        </Button>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            isArtist={false}
          />
        ))}
      </div>
      {user?.role === "Artist" && (
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <h2 className="text-2xl font-semibold mb-4">Artist Dashboard</h2>
              <p className="text-muted-foreground mb-6">Please visit your dashboard to view customer orders</p>
              <Button onClick={() => router.push("/dashboard/orders")}>
                Go to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Orders; 
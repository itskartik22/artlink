"use client";

import { useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { useToast } from "@/components/ui/use-toast";

interface OrderProduct {
  id: string;
  name: string;
  price: number;
  images: string[];
}

interface Order {
  id: string;
  createdAt: string;
  totalAmount: number;
  status: string;
  quantity: number;
  product: OrderProduct;
  user: {
    name: string;
    email: string;
  };
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const user = useCurrentUser();

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

    fetchOrders();
  }, [toast]);

  const formattedOrders = orders.map((order) => ({
    id: order.id,
    customer: order.user.name,
    email: order.user.email,
    product: order.product.name,
    amount: order.totalAmount,
    quantity: order.quantity,
    status: order.status,
    date: new Date(order.createdAt).toLocaleDateString(),
    image: order.product.images[0],
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading
            title={`Orders (${orders.length})`}
            description="Manage orders from your customers"
          />
        </div>
        <Separator />
        <DataTable
          columns={columns}
          data={formattedOrders}
          searchKey="customer"
          isLoading={isLoading}
        />
      </div>
    </div>
  );
} 
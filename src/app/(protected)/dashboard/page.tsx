"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LuDollarSign,
  LuPackage,
  LuShoppingCart,
  LuPaintbrush,
  LuEye,
  LuTrendingUp,
} from "react-icons/lu";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";

interface DashboardStats {
  revenue: {
    total: number;
    recent: number;
  };
  orders: {
    total: number;
    recent: number;
  };
  products: {
    total: number;
    active: number;
  };
  commissions: {
    total: number;
    pending: number;
    completed: number;
    rejected: number;
  };
}

interface RecentOrder {
  id: string;
  productName: string;
  customerName: string;
  amount: number;
  status: string;
  date: string;
  image: string;
}

interface RecentCommission {
  id: string;
  customerName: string;
  description: string;
  budget: number;
  status: string;
  date: string;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [recentCommissions, setRecentCommissions] = useState<RecentCommission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsResponse, recentResponse] = await Promise.all([
          fetch("/api/dashboard/stats"),
          fetch("/api/dashboard/recent")
        ]);

        if (!statsResponse.ok || !recentResponse.ok) {
          throw new Error("Failed to fetch dashboard data");
        }

        const statsData = await statsResponse.json();
        const recentData = await recentResponse.json();

        setStats(statsData);
        setRecentOrders(recentData.orders);
        setRecentCommissions(recentData.commissions);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast({
          title: "Error",
          description: "Failed to fetch dashboard data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [toast]);

  const statCards = [
    {
      title: "Total Revenue",
      value: stats ? `₹${stats.revenue.total.toLocaleString()}` : "₹0",
      secondaryValue: stats ? `₹${stats.revenue.recent.toLocaleString()} this month` : null,
      icon: LuDollarSign,
      description: "All time revenue",
    },
    {
      title: "Orders",
      value: stats ? stats.orders.total.toString() : "0",
      secondaryValue: stats ? `${stats.orders.recent} this month` : null,
      icon: LuShoppingCart,
      description: "Total orders received",
    },
    {
      title: "Products",
      value: stats ? stats.products.total.toString() : "0",
      secondaryValue: stats ? `${stats.products.active} active` : null,
      icon: LuPackage,
      description: "Total products listed",
    },
    {
      title: "Commission Requests",
      value: stats ? stats.commissions.total.toString() : "0",
      secondaryValue: stats ? `${stats.commissions.pending} pending` : null,
      icon: LuPaintbrush,
      description: "Total requests received",
      tertiaryValue: stats ? `${stats.commissions.completed} completed` : null,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s an overview of your store
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className="rounded-full p-2 bg-primary/5">
                <stat.icon className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-7 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ) : (
                <>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  {stat.secondaryValue && (
                    <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <LuTrendingUp className="h-3 w-3" />
                      {stat.secondaryValue}
                    </div>
                  )}
                  {stat.tertiaryValue && (
                    <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <LuEye className="h-3 w-3" />
                      {stat.tertiaryValue}
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.description}
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-14 w-full" />
                ))}
              </div>
            ) : recentOrders.length === 0 ? (
              <div className="text-sm text-muted-foreground">
                No orders to display
              </div>
            ) : (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center gap-4 rounded-lg border p-4"
                  >
                    <img
                      src={order.image}
                      alt={order.productName}
                      className="h-12 w-12 rounded-md object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {order.productName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {order.customerName}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        ₹{order.amount.toLocaleString()}
                      </p>
                      <Badge
                        variant={
                          order.status === "completed" ? "default" :
                          order.status === "pending" ? "secondary" :
                          "destructive"
                        }
                        className="mt-1"
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Commission Requests</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-14 w-full" />
                ))}
              </div>
            ) : recentCommissions.length === 0 ? (
              <div className="text-sm text-muted-foreground">
                No commission requests to display
              </div>
            ) : (
              <div className="space-y-4">
                {recentCommissions.map((commission) => (
                  <div
                    key={commission.id}
                    className="rounded-lg border p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium">
                        {commission.customerName}
                      </p>
                      <Badge
                        variant={
                          commission.status === "completed" ? "default" :
                          commission.status === "pending" ? "secondary" :
                          "destructive"
                        }
                      >
                        {commission.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {commission.description}
                    </p>
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Budget: ₹{commission.budget.toLocaleString()}
                      </span>
                      <span className="text-muted-foreground">
                        {new Date(commission.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 
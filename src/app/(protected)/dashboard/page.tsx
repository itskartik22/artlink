"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LuDollarSign,
  LuPackage,
  LuShoppingCart,
  LuPaintbrush,
} from "react-icons/lu";
import { useState } from "react";

const stats = [
  {
    title: "Total Revenue",
    value: "₹12,345",
    icon: LuDollarSign,
    description: "Last 30 days",
  },
  {
    title: "Total Orders",
    value: "25",
    icon: LuShoppingCart,
    description: "Last 30 days",
  },
  {
    title: "Active Products",
    value: "12",
    icon: LuPackage,
    description: "Live in store",
  },
  {
    title: "Commission Requests",
    value: "8",
    icon: LuPaintbrush,
    description: "Pending review",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your store
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
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
            <div className="text-sm text-muted-foreground">
              No orders to display
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Commission Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              No commission requests to display
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 
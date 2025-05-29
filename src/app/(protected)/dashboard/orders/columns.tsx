"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends unknown> {
    refreshData: () => Promise<void>;
  }
}

export type OrderColumn = {
  id: string;
  customer: string;
  email: string;
  product: string;
  amount: number;
  quantity: number;
  status: string;
  date: string;
  image: string;
  paymentId: string;
};

const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "product",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <img
            src={row.original.image}
            alt={row.getValue("product")}
            className="h-10 w-10 rounded-md object-cover"
          />
          <div className="font-medium">{row.getValue("product")}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "customer",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Customer
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div>
          <div className="font-medium">{row.getValue("customer")}</div>
          <div className="text-sm text-muted-foreground">{row.original.email}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(amount);
      return (
        <div>
          <div className="font-medium">{formatted}</div>
          <div className="text-sm text-muted-foreground">
            Qty: {row.original.quantity}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row, table }) => {
      const [isUpdating, setIsUpdating] = useState(false);
      const { toast } = useToast();
      const status = row.getValue("status") as string;

      const updateStatus = async (newStatus: string) => {
        try {
          setIsUpdating(true);
          const response = await fetch(`/api/orders/${row.original.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: newStatus }),
          });

          if (!response.ok) {
            throw new Error("Failed to update status");
          }

          // Refresh the table data
          await table.options.meta?.refreshData();

          toast({
            title: "Status updated",
            description: `Order status has been updated to ${newStatus}`,
          });
        } catch (error) {
          console.error("Error updating status:", error);
          toast({
            title: "Error",
            description: "Failed to update order status",
            variant: "destructive",
          });
        } finally {
          setIsUpdating(false);
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 flex items-center gap-2"
              disabled={isUpdating}
            >
              <Badge variant={
                status === "completed" ? "default" :
                status === "processing" ? "secondary" :
                status === "pending" ? "outline" :
                "destructive"
              }>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Badge>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Update Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {statusOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => updateStatus(option.value)}
                disabled={status === option.value || isUpdating}
                className="flex items-center justify-between"
              >
                {option.label}
                {status === option.value && (
                  <Check className="h-4 w-4" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "paymentId",
    header: "Payment ID",
    cell: ({ row }) => {
      const paymentId = row.getValue("paymentId") as string;
      return (
        <div className="font-mono text-sm">
          {paymentId}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(order.id)}
            >
              Copy Order ID
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(order.email)}
            >
              Copy Customer Email
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(order.paymentId)}
            >
              Copy Payment ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
]; 
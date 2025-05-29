"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { LuArrowUpRight, LuArrowDownRight, LuWallet } from "react-icons/lu";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";

interface PaymentStats {
  totalEarnings: number;
  availableBalance: number;
  pendingPayments: number;
}

interface Transaction {
  id: string;
  type: string;
  description: string;
  amount: number;
  status: string;
  date: string;
}

interface PaymentData {
  stats: PaymentStats;
  transactions: Transaction[];
}

export default function PaymentsPage() {
  const [data, setData] = useState<PaymentData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const response = await fetch("/api/dashboard/payments");
        if (!response.ok) {
          throw new Error("Failed to fetch payment data");
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching payment data:", error);
        toast({
          title: "Error",
          description: "Failed to fetch payment data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentData();
  }, [toast]);

  const stats = [
    {
      title: "Total Earnings",
      value: data ? `₹${data.stats.totalEarnings.toLocaleString()}` : "₹0",
      description: "Lifetime earnings",
      icon: LuWallet,
    },
    {
      title: "Available Balance",
      value: data ? `₹${data.stats.availableBalance.toLocaleString()}` : "₹0",
      description: "Ready to withdraw",
      icon: LuArrowUpRight,
    },
    {
      title: "Pending Payments",
      value: data ? `₹${data.stats.pendingPayments.toLocaleString()}` : "₹0",
      description: "Processing",
      icon: LuArrowDownRight,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Payments</h2>
        <p className="text-muted-foreground">
          Manage your earnings and view transaction history
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>
                A list of all your transactions and their status.
              </CardDescription>
            </div>
            <Button>Withdraw Funds</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[60px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                  </TableRow>
                ))
              ) : data?.transactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    No transactions found
                  </TableCell>
                </TableRow>
              ) : (
                data?.transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">
                      {transaction.id}
                    </TableCell>
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell className="text-green-600">
                      ₹{transaction.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          transaction.status === "completed" ? "default" :
                          transaction.status === "pending" ? "secondary" :
                          "outline"
                        }
                      >
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(transaction.date).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
} 
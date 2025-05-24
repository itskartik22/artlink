"use client";

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

const transactions = [
  {
    id: "TRX001",
    type: "Sale",
    description: "Abstract Painting",
    amount: 12999,
    status: "Completed",
    date: "2024-03-20",
  },
  {
    id: "TRX002",
    type: "Commission",
    description: "Custom Portrait",
    amount: 25000,
    status: "Pending",
    date: "2024-03-19",
  },
  {
    id: "TRX003",
    type: "Withdrawal",
    description: "Bank Transfer",
    amount: -35000,
    status: "Completed",
    date: "2024-03-18",
  },
];

const stats = [
  {
    title: "Total Earnings",
    value: "₹1,25,000",
    description: "Lifetime earnings",
    icon: LuWallet,
  },
  {
    title: "Available Balance",
    value: "₹45,000",
    description: "Ready to withdraw",
    icon: LuArrowUpRight,
  },
  {
    title: "Pending Payments",
    value: "₹25,000",
    description: "Processing",
    icon: LuArrowDownRight,
  },
];

export default function PaymentsPage() {
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
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    {transaction.id}
                  </TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell className={transaction.amount < 0 ? "text-red-600" : "text-green-600"}>
                    ₹{Math.abs(transaction.amount)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        transaction.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {transaction.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{transaction.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
} 
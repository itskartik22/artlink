import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
// import { auth } from "@/auth";
// import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await auth();

  // if (!session?.user || session.user.role !== "ARTIST") {
  //   redirect("/");
  // }

  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardSidebar />
      <div className="md:pl-64">
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
} 
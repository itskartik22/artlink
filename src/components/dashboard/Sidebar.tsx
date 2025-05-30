"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuLayoutDashboard, LuUpload, LuPackage, LuSettings } from "react-icons/lu";

const routes = [
  {
    label: "Dashboard",
    icon: LuLayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "Upload Product",
    icon: LuUpload,
    href: "/dashboard/upload",
  },
  {
    label: "My Products",
    icon: LuPackage,
    href: "/dashboard/products",
  },
  {
    label: "Settings",
    icon: LuSettings,
    href: "/dashboard/settings",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-gray-100 text-gray-800 w-64">
      <div className="px-3 py-2 flex-1">
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-gray-800/90 rounded-lg transition",
                pathname === route.href ? "text-white bg-gray-800/90" : ""
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className="h-5 w-5 mr-3" />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 
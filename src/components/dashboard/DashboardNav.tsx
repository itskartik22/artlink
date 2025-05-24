"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LuUser, LuLogOut, LuBell } from "react-icons/lu";
import Link from "next/link";
import { signOut } from "next-auth/react";
import Image from "next/image";

export function DashboardNav() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b z-40 md:pl-64">
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        {/* Logo - Only visible on mobile */}
        <div className="md:hidden">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image
              src="/img/logo.jpeg"
              alt="ArtLink"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="font-bold text-lg">ArtLink</span>
          </Link>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <LuBell className="h-5 w-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-indigo-600 rounded-full" />
          </Button>

          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-gray-900 hidden sm:block"
          >
            View Store
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full border-2 border-indigo-100"
              >
                <Image
                  src="/img/placeholder-avatar.jpg"
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  href="/dashboard/settings"
                  className="flex items-center cursor-pointer"
                >
                  <LuUser className="mr-2 h-4 w-4" />
                  <span>Profile Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600 focus:text-red-600 cursor-pointer"
                onClick={() => signOut()}
              >
                <LuLogOut className="mr-2 h-4 w-4" />
                <span>Log Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
} 
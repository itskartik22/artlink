import React from "react";
import { IoMenu } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";
// import { isLoggedIn } from "@/lib/auth";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LogoutButton } from "../auth/logout-button";
import Image from "next/image";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const MobileNav = ({ loggedInStatus }: { loggedInStatus: boolean }) => {
  const user = useCurrentUser();
  return (
    <div className="hidden max-sm:flex">
      <Sheet>
        <SheetTrigger>
          <IoMenu className="h-8 w-8" />
        </SheetTrigger>
        <SheetContent className="pt-8 w-1/2">
          <SheetClose className="w-full">
            {loggedInStatus ? (
              <div className="flex flex-col items-start gap-2 ">
                <div className="flex flex-row items-center gap-2 shadow-md rounded-md w-full p-2 ">
                  {user && user.image ? (
                    <Image
                      src={user.image}
                      alt="User Avatar"
                      width={32}
                      height={32}
                      className="rounded-full ml-2"
                    />
                  ) : (
                    <FaUserCircle className="h-8 w-8 text-gray-500 ml-2" />
                  )}
                  <Link href="/profile"> {user?.name || "Profile"}</Link>
                </div>

                <div className="flex p-2 rounded-md w-full items-center">
                  <Link href="/explore">Explore</Link>
                </div>
                <div className="flex p-2 rounded-md w-full items-center">
                  <Link href="/commissions">Commission</Link>
                </div>
                <div className="flex p-2 rounded-md w-full items-center">
                  <Link href="/wishlist">Wishlist</Link>
                </div>
                <div className="flex p-2 rounded-md w-full items-center">
                  <Link href="/cart">Cart</Link>
                </div>
                <div className="flex p-2 rounded-md w-full items-center">
                  <Link href="/profile">Profile</Link>
                </div>

                <LogoutButton className="w-full" />
              </div>
            ) : (
              <div className="gap-3 flex flex-col">
                <div className="p-2">
                  <Link href="/explore">Explore</Link>
                </div>
                <div className="p-2">
                  <Link href="/wishlist">Wishlist</Link>
                </div>
                <div className="p-2">
                  <Link href="/cart">Cart</Link>
                </div>
                <Button>
                  <Link href="/login">Login</Link>
                </Button>
              </div>
            )}
          </SheetClose>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;

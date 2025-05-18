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

const MobileNav = ({ loggedInStatus }: { loggedInStatus: boolean }) => {
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
                  <FaUserCircle className="h-8 w-8" />
                  <Link href="/profile"> Profile</Link>
                </div>

                <div className="flex p-2 shadow-md rounded-md w-full items-center">
                  <Link href="/gallery">Gallery</Link>
                </div>
                <div className="flex p-2 shadow-md rounded-md w-full items-center">
                  <Link href="/wishlist">Wishlist</Link>
                </div>
                <div className="flex p-2 shadow-md rounded-md w-full items-center">
                  <Link href="/cart">Cart</Link>
                </div>

                <LogoutButton className="w-full" />
              </div>
            ) : (
              <div className="gap-3 flex flex-col">
                <div className="p-2">
                  <Link href="/gallery">Gallery</Link>
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

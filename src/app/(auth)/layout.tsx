import Image from "next/image";
import React from "react";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen h-screen flex justify-center">
      <div className="md:w-1/2 w-full flex justify-center">{children}</div>
    </div>
  );
}

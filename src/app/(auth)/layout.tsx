import Image from "next/image";
import React from "react";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full px-10 flex justify-center">
      <div className="w-full flex justify-center">{children}</div>
    </div>
  );
}

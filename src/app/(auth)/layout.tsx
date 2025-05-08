import Image from "next/image";
import React from "react";
import { Inter } from "next/font/google";
import LoginForm from "../../components/_auth/LoginForm";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen h-screen flex">
      <div className="md:w-1/2 hidden md:flex flex-col items-center justify-center bg-slate-950 text-white">
        <Link href="/ ">
          <Image
            src="/assets/logos/mitmaai-white-logo.png"
            width={250}
            height={200}
            alt="mitmaai.org"
          />
        </Link>
        <h1 className="text-xl font-normal text-center">
          Bridging the Past, Building the Future.
        </h1>
      </div>
      <div className="md:w-1/2 w-full flex justify-center">{children}</div>
    </div>
  );
}

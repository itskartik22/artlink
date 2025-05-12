"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";
// import Loader from "@/components/shared/Loader";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  // console.log(pathname);
  const list = [
    { category: "Profile Setting", link: "/profilesetting" },
    { category: "Orders", link: "/yourorders" },
  ];

  const [sidebar, setSidebar] = useState(false);
  function handleSidebar() {
    setSidebar(!sidebar);
  }

  return (
    <div className="w-full h-screen">
      <div className="md:px-12 px-2 py-4 flex flex-row">
        {sidebar ? (
          <ChevronLeft
            onClick={handleSidebar}
            className="xl:hidden fixed z-50 right-[18%] md:right-[48%] top-1/2 shadow-sm bg-slate-900 rounded-lg stroke-white"
            size={32}
          />
        ) : (
          <ChevronRight
            onClick={handleSidebar}
            className="xl:hidden fixed z-50 left-0 top-1/2 bg-white rounded-lg stroke-[#1f4e5f]"
            size={32}
          />
        )}
        <div
          className={`flex flex-col w-[320px] rounded-lg shadow-md h-[90vh] sticky border-2 bg-white ${
            sidebar
              ? "h-screen w-[80%] md:w-[50%] block z-10 fixed top-0 bottom-0 left-0 right-0 "
              : "hidden xl:flex w-[320px]"
          } `}
        >
          <Link
            href="/profile"
            onClick={() => {
              setSidebar(false);
            }}
            className="px-4 py-4 bg-slate-800 rounded-t-md text-white text-base"
          >
            Profile
          </Link>

          {list.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              onClick={() => {
                setSidebar(false);
              }}
              className={`px-4 py-4 text-slate-900 border-b-2 border-slate-200 text-sm cursor-pointer  ${
                pathname === item.link
                  ? "bg-[#d9eef6]"
                  : "text-slate-900 hover:bg-white"
              }`}
            >
              {item.category}
            </Link>
          ))}
        </div>

        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default Layout;

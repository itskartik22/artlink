"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import ProfileType from "@/components/profile/ProfileType";
// import Loader from "@/components/shared/Loader";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  const user = useCurrentUser();

  console.log(user, "user");
  // console.log(pathname);
  const list = [
    { category: "Orders", link: "/profile/orders" },
    { category: "Payment Details", link: "/profile/payments" },
    { category: "Notifications", link: "/profile/notifications" },
    { category: "Settings", link: "/profile/settings" },
  ];

  const [sidebar, setSidebar] = useState(false);
  function handleSidebar() {
    setSidebar(!sidebar);
  }

  if (user && !user.role) {
    return <ProfileType />;
  }

  return (
    <div className="w-full h-screen">
      <div className="md:px-12 px-2 py-4 flex flex-row">
        {sidebar ? (
          <ChevronLeft
            onClick={handleSidebar}
            className="xl:hidden fixed z-50 right-[38%] md:right-[48%] top-4 shadow-sm bg-slate-900 rounded-lg stroke-white"
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
          className={`flex flex-col w-[320px] rounded-lg shadow-md h-[90vh] max:md-fixed border-2 bg-white ${
            sidebar
              ? "h-screen w-[60%] md:w-[50%] block z-10 fixed top-0 bottom-0 left-0 right-0 "
              : "hidden xl:flex w-[320px]"
          } `}
        >
          <Link
            href="/profile"
            onClick={() => {
              setSidebar(false);
            }}
            className={`px-4 py-3 rounded-t-md text-sm ${
              pathname === "/profile"
                ? "bg-slate-900 text-white"
                : "text-slate-900 hover:bg-white"
            }`}
          >
            Profile
          </Link>

          {list.map((item, index) => (
            <Link
              href={item.link}
              key={index}
              onClick={() => {
                setSidebar(false);
              }}
              className={`px-4 py-3 text-slate-900 border-slate-400 text-sm cursor-pointer ${
                pathname === item.link
                  ? "bg-slate-900 text-white"
                  : "text-slate-900 hover:bg-white"
              }`}
            >
              {item.category}
            </Link>
          ))}
        </div>

        <div
          className={`px-5 py-4 gap-8 h-full min-h-96 w-full flex-col rounded-lg shadow-md border-2 md:ml-4 `}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;

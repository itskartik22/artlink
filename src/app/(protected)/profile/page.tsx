"use client";
import { LogoutButton } from "@/components/_auth/logout-button";
import { useSessionContext } from "@/context/SessionContext";
import { useCurrentUser } from "@/hooks/current-user";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Profile() {
  //   const user = useCurrentUser();
  const user = useCurrentUser();
  const router = useRouter();

  // useEffect(() => {
  //   if (!session.isAuthenticated) {
  //     router.push("/login");
  //   }
  //   if (session.user && !session.user.userType) {
  //     router.push("/user/profile-type");
  //   }
  // });
  console.log(user);

  return (
    <div className="px-5 py-4 gap-8 h-full min-h-96 w-full flex flex-col rounded-lg shadow-md border-2 xl:ml-4">
      <div className="relative w-full flex flex-col gap-4">
        <h2 className="text-xl font-bold text-[#1f4e5f]">Profile</h2>
      </div>
      {}
      {/* <h1>Profile</h1>
      <p className="flex">
        Name: {JSON.stringify(session.user?.name)}{" "}
        <span className="flex">
          image: {JSON.stringify(session.user?.image)}
        </span>
      </p>
      <p className="flex">email: {JSON.stringify(session.user?.email)}</p>
      <p className="flex">userType: {JSON.stringify(session.user?.userType)}</p>
      <LogoutButton /> */}
    </div>
  );
}

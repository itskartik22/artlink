"use client";
import { LogoutButton } from "@/components/_auth/logout-button";
import { useSessionContext } from "@/context/SessionContext";
import { useCurrentUser } from "@/hooks/current-user";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Profile() {
  //   const user = useCurrentUser();
  const { session } = useSessionContext();
  const router = useRouter();

  useEffect(() => {
    if (!session.isAuthenticated) {
      router.push("/auth/login");
    }
    if (session.user && !session.user.userType) {
      router.push("/user/profile-type");
    }
  });

  return (
    <div className="w-[100%]">
      <h1>Profile</h1>
      <p className="flex">
        Name: {JSON.stringify(session.user?.name)}{" "}
        <span className="flex">
          image: {JSON.stringify(session.user?.image)}
        </span>
      </p>
      <p className="flex">email: {JSON.stringify(session.user?.email)}</p>
      <p className="flex">userType: {JSON.stringify(session.user?.userType)}</p>
      <LogoutButton />
    </div>
  );
}

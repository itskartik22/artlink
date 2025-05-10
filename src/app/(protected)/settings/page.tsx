"use client"
import { auth, signOut } from "@/auth";
import { LogoutButton } from "@/components/_auth/logout-button";
import { useSessionContext } from "@/context/SessionContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Setting() {
  const {session} = useSessionContext()
  const router = useRouter();
  useEffect(() => {
    if (!session.isAuthenticated) {
      router.push("/login");
    }
  });
  
  return (
    <div className="container">
      <div>{JSON.stringify(session)}</div>
      <LogoutButton /> 
    </div>
  );
}

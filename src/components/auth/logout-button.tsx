"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
// import { logout } from "@/actions/logout";
// import { useRouter } from "next/navigation";
// import { useTransition } from "react";
// import { toast } from "sonner";

interface LogoutButtonProps {
  className?: string;
}

export const LogoutButton = ({ className }: LogoutButtonProps) => {
  // const router = useRouter();
  // const { updateSession } = useSessionContext();
  // const [isPending, setTransition] = useTransition();

  // const handleLogout = async () => {
  // logout()
  // setTransition(() => {
  //   logout().then(async (res) => {
  //     if (res?.error) {
  //       toast.error(res.error);
  //     } else {
  //       toast.success(res?.success);
  //     }
  //     // await updateSession();
  //     router.push("/login");
  //   });
  // });
  // };
  return (
    <Button className={className} onClick={() => signOut()}>
      Sign Out
    </Button>
  );
};

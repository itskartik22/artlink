"use client";

import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
  const { data: session } = useSession();
  console.log(session);
  return session?.user ?? null;
};

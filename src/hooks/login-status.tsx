"use client"

import { useSession } from "next-auth/react";

export const useLoggedInStatus = () => {
    const {data: session} = useSession();
    console.log(session, "session")
    return !!session;
}
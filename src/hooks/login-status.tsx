"use client"
import { useSessionContext } from "@/context/SessionContext"

export const useLoggedInStatus = () => {
    const {session} = useSessionContext()
    return !!session.user;
}
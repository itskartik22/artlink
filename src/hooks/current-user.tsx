"use client"
import { useSessionContext } from "@/context/SessionContext"

export const useCurrentUser = () => {
    const {session} = useSessionContext()
    return session.user;
}
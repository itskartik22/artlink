"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { auth } from "@/auth";
import { getSession } from "next-auth/react";
import { UserType } from "@prisma/client";
import { User } from "next-auth";

interface Session {
  user: User & { userType: UserType } | null;
  isAuthenticated: boolean;
}

interface SessionContextProps {
  session: Session;
  updateSession: () => Promise<void>;
}

const SessionContext = createContext<SessionContextProps | undefined>(undefined);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session>({
    user: null,
    isAuthenticated: false,
  });

  const updateSession = async () => {
    const sessionData = await getSession()
    setSession({
      user: sessionData?.user || null,
      isAuthenticated: !!sessionData,
    });
  };

  useEffect(() => {
    updateSession();
  }, []);

  return (
    <SessionContext.Provider value={{ session, updateSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSessionContext must be used within a SessionProvider");
  }
  return context;
};

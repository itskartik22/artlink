import type { Metadata } from "next";
import { Inter, Merriweather_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import { SessionProvider} from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/components/AuthProvider";
// const inter = Inter({ subsets: ["latin"] });
const merriWeather = Merriweather_Sans({
  weight: ["400", "700", "800"],
  subsets: ["vietnamese"],
});

export const metadata: Metadata = {
  title: "ArtLink",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  // console.log(session, "session")

  return (
    <html lang="en">
      <body
        className={merriWeather.className}
        suppressHydrationWarning={true}
      >
        <SessionProvider>
          <Navbar session={session} />
          {children}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}

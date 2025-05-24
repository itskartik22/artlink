import type { Metadata } from "next";
import { Inter, Merriweather_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/components/AuthProvider";
import { CartProvider } from "@/context/CartContext";
import { Footer } from "@/components/shared/Footer";
// const inter = Inter({ subsets: ["latin"] });
const merriWeather = Merriweather_Sans({
  weight: ["400", "700", "800"],
  subsets: ["vietnamese"],
});

export const metadata: Metadata = {
  title: "ArtLink",
  description: "Connect with art and artists",
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
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar session={session} />
              <main className="flex-1">{children}</main>
              {/* <Footer /> */}
            </div>
            <Toaster />
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
 title: "Tech Tools",
 description: "Generated by create next app",
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <html lang="en">
   <body
    className={cn(
     "dark relative h-full antialiased font-sans",
     inter.className
    )}
   >
    <Providers>
     <main className="relative flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex-1">{children}</div>
     </main>
    </Providers>
   </body>
  </html>
 );
}

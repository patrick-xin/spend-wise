import type { Metadata } from "next";

import "./globals.css";
import { DM_Sans, Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import RootProvider from "@/components/providers/root-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const dmSans = DM_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Spend Wise",
  description: "Keep track your budget",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html style={{ colorScheme: "dark" }} lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            inter.variable,
            dmSans.variable
          )}
        >
          <RootProvider>
            <Toaster richColors />
            {children}
          </RootProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

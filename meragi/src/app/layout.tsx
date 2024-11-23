import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/store/StoreProvider";
import { Toaster } from "@/components/ui/toaster"
import '../css/style.css'
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dineo | Streamline your restaurant flow",
  description: "Best dine solution for resturants",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={inter.className}>
        <link rel="icon" href="/dineo.svg" sizes="any" />
          <main>{children}</main>
          <Toaster />
        </body>
      </html>
    </StoreProvider>
  );
}

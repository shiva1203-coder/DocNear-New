import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DocNear - Find Care Nearby",
  description: "Book appointments with local doctors online or offline.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen flex flex-col bg-background antialiased`}>
        <Providers>
          <NavBar />
          <main className="flex-1 flex flex-col pt-4">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

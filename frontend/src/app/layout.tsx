import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/shared/Navbar";
import { AuthProvider } from "@/app/components/shared/AuthProviderMock";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog Management System",
  description:
    "A comprehensive blog management platform with role-based access control",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen bg-background">
            <Navbar />
            <main className="container mx-auto px-4 py-8">{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

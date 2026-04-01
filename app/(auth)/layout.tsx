import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sign in | Manager Dashboard",
  description: "Challenges Dashboard",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Solo un contenedor, sin <html> ni <body>
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      {children}
    </main>
  );
}
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Manager Dashboard",
  description: "Challenges Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-gray-50">
        <nav className="bg-gray-200 shadow-sm border-b border-gray-200 max-w-screen mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <a
              href="/dashboard"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Challenges
            </a>
            <button className="bg-indigo-500 hover:bg-indigo-300 text-white px-4 py-2 rounded-md text-sm font-medium transition-all shadow-sm hover:shadow-md">
              Logout
            </button>
          </div>
        </nav>
        <main className="w-screen p-6">
          {children}
        </main>
      </body>
    </html>
  );
}
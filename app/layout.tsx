import './globals.css'
import { Inter, Geist } from 'next/font/google'
import { Navbar } from '../app/components/Navbar'
import { Toaster } from '../app/components/'
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={cn("font-sans", geist.variable)}>
      <body className={inter.className}>
        <Navbar />
        <main className="container mx-auto p-6">{children}</main>
        <Toaster />
      </body>
    </html>
  )
}

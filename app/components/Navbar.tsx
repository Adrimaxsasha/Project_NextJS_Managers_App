'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-14 items-center">
        <Link href="/dashboard" className="font-bold">Manager Dashboard</Link>
        <div className="ml-auto flex items-center space-x-2">
          <Link href="/dashboard">
            <Button variant="ghost">Challenges</Button>
          </Link>
          <Button>Logout</Button>
        </div>
      </div>
    </nav>
  )
}

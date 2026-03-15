'use client'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Plus, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'

interface Challenge {
  id: number
  title: string
  category: string
  level: string
  createdAt: string
  cost: number
}

export default function DashboardPage() {
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchChallenges()
  }, [])

  const fetchChallenges = async () => {
    try {
      const res = await fetch('http://localhost:8080/challenges')
      const data = await res.json()
      setChallenges(data)
    } catch (error) {
      console.error('Error fetching challenges:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteChallenge = async (id: number) => {
    try {
      await fetch(`http://localhost:8080/challenges/${id}`, {
        method: 'DELETE'
      })
      fetchChallenges()
    } catch (error) {
      console.error('Error deleting challenge:', error)
    }
  }

  if (loading) return <div>Cargando...</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Challenges</h1>
        <Link href="/dashboard/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Challenge
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Challenges</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Costo</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {challenges.map((challenge) => (
                <TableRow key={challenge.id}>
                  <TableCell>{challenge.title}</TableCell>
                  <TableCell>{challenge.category}</TableCell>
                  <TableCell className="capitalize">{challenge.level}</TableCell>
                  <TableCell>{new Date(challenge.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>${challenge.cost}</TableCell>
                  <TableCell className="flex space-x-2">
                    <Link href={`/dashboard/${challenge.id}/edit`}>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteChallenge(challenge.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { toast } from '@/components/ui/use-toast'
import Link from 'next/link'

const signinSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres')
})

const signupSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword']
})

type SigninForm = z.infer<typeof signinSchema>
type SignupForm = z.infer<typeof signupSchema>

interface AuthFormProps {
  type: 'signin' | 'signup'
}

export function AuthForm({ type }: AuthFormProps) {
  const isSignin = type === 'signin'
  const form = useForm<SigninForm | SignupForm>({
    resolver: zodResolver(isSignin ? signinSchema : signupSchema),
    defaultValues: { email: '', password: '', confirmPassword: '' }
  })

  const onSubmit = async (data: any) => {
    try {
      // Simular login/signup
      console.log('Auth data:', data)
      toast({
        title: `¡${isSignin ? 'Bienvenido' : 'Usuario creado'}!`,
        description: 'Redirigiendo al dashboard...'
      })
      window.location.href = '/dashboard'
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Email o contraseña incorrectos'
      })
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle>{isSignin ? 'Iniciar Sesión' : 'Registrarse'}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="tu@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!isSignin && (
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmar Contraseña</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="********" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <Button type="submit" className="w-full">
                {isSignin ? 'Iniciar Sesión' : 'Registrarse'}
              </Button>
            </form>
          </Form>
          <div className="mt-6 text-center text-sm">
            {isSignin ? 
              '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
            <Link href={isSignin ? '/signup' : '/signin'} className="text-blue-600 hover:underline">
              {isSignin ? 'Regístrate' : 'Inicia sesión'}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

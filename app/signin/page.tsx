import { AuthForm } from '../components/AuthForm'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'

export default function SigninPage() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <AuthForm type="signin" />
      </div>
    </>
  )
}

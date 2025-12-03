// login UI — src/app/login/page.tsx

'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import GoogleIcon from '@/components/GoogleIcon'
import { signIn } from 'next-auth/react'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({ email: '', password: '' })

  const handleLogin = async () => {
    if (!data.email || !data.password) {
      return toast.error('Please enter email and password')
    }

    setLoading(true)

    const res = await signIn('credentials', {
      ...data,
      redirect: false,
    })

    setLoading(false)

    if (res?.error) {
      return toast.error('Invalid email or password')
    }

    toast.success('Logged in successfully!')
    router.push('/dashboard')
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Welcome Back</h1>

        <input
          className="border p-3 w-full rounded mt-2"
          placeholder="Email"
          type='email'
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <input
          className="border p-3 w-full rounded mt-2"
          placeholder="Password"
          type='password'
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="bg-blue-600 text-white w-full p-3 rounded mt-5 hover:bg-blue-700 transition"
        >
          {loading ? 'Logining in...' : 'Login'}
        </button>

        <div className="flex items-center gap-3 mt-6">
          <div className="h-px bg-gray-300 w-full"></div>
          <span className="text-gray-400 text-sm">OR</span>
          <div className="h-px bg-gray-300 w-full"></div>
        </div>

        <button
          onClick={() => signIn('google', { callbackUrl: "/dashboard" })}
          className="border flex items-center justify-center text-gray-700 w-full p-3 rounded mt-5 hover:bg-gray-100 transition"
        >
          <GoogleIcon /> Continue with Google
        </button>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{' '}
          <a
            href="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  )
}

// login UI — src/app/signup/page.tsx

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import GoogleIcon from '@/components/GoogleIcon'
import { signIn } from 'next-auth/react'

export default function SignupPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleSignup = async () => {
    if (!form.name || !form.email || !form.password) {
      return toast.error('All fields are required')
    }

    setLoading(true)

    const res = await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    setLoading(false)

    if (res.ok) {
      toast.success('Account created successfully!')
      router.push('/login')
    } else {
      const data = await res.json()
      toast.error(data.error || 'Signup failed')
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Create Account</h1>

        <input
          className="border p-3 w-full rounded mt-2"
          placeholder="Name"
          type='text'
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="border p-3 w-full rounded mt-2"
          placeholder="Email"
          type='email'
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="border p-3 w-full rounded mt-2"
          placeholder="Password"
          type='password'
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={handleSignup}
          disabled={loading}
          className="bg-blue-600 text-white w-full p-3 rounded mt-5 hover:bg-blue-700 transition"
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
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
          Already have an account?{' '}
          <a
            href="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  )
}

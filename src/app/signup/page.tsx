// login UI — src/app/signup/page.tsx

'use client'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter();

  const handleSignup = async () => {
    await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    })

    router.push('/login')
  }

  return (
    <div className="p-6 max-w-sm mx-auto mt-20">
      <h1 className="text-2xl font-bold">Create an Account</h1>

      <input
        className="border p-2 mt-4 w-full"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="border p-2 mt-2 w-full"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="border p-2 mt-2 w-full"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
        onClick={handleSignup}
      >
        Sign Up
      </button>

    </div>
  )
}

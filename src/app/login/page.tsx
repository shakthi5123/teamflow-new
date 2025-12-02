// login UI — src/app/login/page.tsx

'use client'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

export default function LoginPage() {
   const [ email, setEmail ] = useState("");
   const [ password, setPassword ] = useState("")

   const handleLogin = async () => {
      await signIn("credentials", {
         email,
         password,
         callbackUrl: "/dashboard",
      });
   };

   return (
      <div className='p-6 max-w-sm mx-auto mt-20'>
         <h1 className="text-2xl font-bold">Login</h1>

         <input className='border p-2 mt-4 w-full' 
         placeholder='Email'
         onChange={(e) => setEmail(e.target.value)}
         />

         <input className='border p-2 mt-2 w-full' 
         placeholder='Password'
         onChange={(e) => setPassword(e.target.value)}
         />

         <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
         onClick={handleLogin}
         >
            Login
         </button>

          <button className="bg-red-600 text-white px-4 py-2 rounded mt-4 w-full"
         onClick={() => signIn("google")}
         >
            Sign in with Google
         </button>
      </div>
   )
}

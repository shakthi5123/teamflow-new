// "use client";

// import { useTheme } from "next-themes";
// import { Sun, Moon } from "lucide-react";
// import { signOut } from "next-auth/react";
// import { useEffect, useState } from "react";

// export default function Topbar() {
//   const { theme, setTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);
//   const [open, setOpen] = useState(false); // avatar dropdown

//   // Prevent hydration mismatch
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) {
//     return (
//       <header className="flex justify-between items-center px-6 py-3 border-b bg-white dark:bg-gray-900"></header>
//     );
//   }

//   return (
//     <header className="flex justify-between items-center px-6 py-3 border-b bg-white dark:bg-gray-900">
//       <h2 className="font-semibold text-gray-800 dark:text-gray-100">
//         Dashboard
//       </h2>

//       <div className="flex items-center gap-4 relative">
//         <button
//           onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//           className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
//         >
//           {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
//         </button>

//         <button
//           onClick={() => signOut({ callbackUrl: "/login" })}
//           className="px-3 py-1 text-sm bg-blue-600 text-white rounded"
//         >
//           Logout
//         </button>
//       </div>
//     </header>
//   );
// }

'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { User } from 'lucide-react'

export default function Topbar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false) // avatar dropdown

  useEffect(() => setMounted(true), [])

  if (!mounted)
    return (
      <header className="flex justify-between items-center px-6 py-3 border-b bg-white dark:bg-gray-900"></header>
    )

  return (
    <header className="flex justify-between items-center px-6 py-3 border-b bg-white dark:bg-gray-900">
      <h2 className="font-semibold text-gray-800 dark:text-gray-100">
        Dashboard
      </h2>

      <div className="flex items-center gap-4 relative">
        {/* Theme toggle */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Avatar button */}
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <div className="p-2 rounded-full bg-gray-200 dark:bg-gray-800">
            <User size={22} className="text-gray-700 dark:text-gray-200" />
          </div>
        </button>

        {/* Dropdown */}
        {menuOpen && (
          <div className="absolute right-0 top-12 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-md py-2">
            <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
              Profile
            </button>
            <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
              Settings
            </button>
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Logout
            </button>
          </div>
        )}

        {/* Logout button (unchanged) */}
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded"
        >
          Logout
        </button>
      </div>
    </header>
  )
}

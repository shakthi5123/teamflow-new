'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Sidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(true) // desktop at start the sidebar is open
  const [mobile, setMobile] = useState(false) // mobile drawer

  const navItems = [
    { name: 'Home', href: '/dashboard' },
    { name: 'Boards', href: '/dashboard/boards' },
    { name: 'Analytics', href: '/dashboard/analytics' },
    { name: 'Settings', href: '/dashboard/settings' },
  ]

  return (
    <>
      {/* Desktop Sidebar  */}
      <aside
        className={`hidden md:flex flex-col border-r bg-white dark:bg-gray-900  border-gray-200 dark:border-gray-700 transition-all ${
          open ? 'w-64' : 'w-16'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-700">
          <h1
            className={`text-xl font-bold text-blue-600 dark:text-blue-400 ${!open && 'hidden'}`}
          >
            TeamFlow
          </h1>

          <button className="text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded" onClick={() => setOpen(!open)}>
            <Menu size={20} />
          </button>
        </div>

        <nav className="p-3 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-lg px-3 py-2 text-sm ${
                pathname === item.href
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile Drawer Button (Top Left) */}
      <button
        onClick={() => setMobile(true)}
        className="md:hidden fixed top-4 left-4 bg-white p-2 rounded shadow"
      >
        <Menu size={20} />
      </button>

      {/* Mobile Drawer  */}

      {mobile && (
        <>
          {/* overlay */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setMobile(false)}
          />

          {/* drawer */}
          <aside className="fixed top-0 left-0 w-64 h-full bg-white dark:bg-gray-900 shadow-md p-4 z-50">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-bold text-blue-600">TeamFlow</h1>
              <button onClick={() => setMobile(false)}>
                <X size={20} />
              </button>
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobile(false)}
                  className={`block rounded-lg px-3 py-2 text-sm ${
                    pathname === item.href
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </aside>
        </>
      )}
    </>
  )
}

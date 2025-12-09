"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Topbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <header className="flex justify-between items-center px-6 py-3 border-b bg-white dark:bg-gray-900"></header>
    );
  }

  return (
    <header className="flex justify-between items-center px-6 py-3 border-b bg-white dark:bg-gray-900">
      <h2 className="font-semibold text-gray-800 dark:text-gray-100">
        Dashboard
      </h2>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
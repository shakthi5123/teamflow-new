import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex h-screen items-center justify-center bg-gray-50 px-6">
      <div className="text-center max-w-xl">
        <h1 className="text-5xl font-bold text-gray-900 tracking-tight">
          TeamFlow
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          A clean and modern way to manage your team's tasks and workflow.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/signup"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 transition font-medium"
          >
            Get Started
          </Link>

          <Link
            href="/login"
            className="px-6 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition font-medium"
          >
            Login
          </Link>
        </div>

        <p className="mt-6 text-sm text-gray-400">
          Built for simplicity • Designed for productivity
        </p>
      </div>
    </main>
  );
}
import { getServerSession } from "next-auth";

export default async function DashboardPage() {
  const session = await getServerSession();

  if (!session) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-xl">You must be logged in</h1>
        <a href="/login" className="text-blue-600 underline">Go to login</a>
      </div>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">
        Welcome, {session.user?.name || "User"} 
      </h1>
      <p className="mt-2 text-sm text-slate-600">Dashboard is ready.</p>
    </main>
  );
}
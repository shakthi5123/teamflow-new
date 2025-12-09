// // src/app/dashboard/layout.tsx

// import Sidebar from "@/components/Sidebar";
// import Topbar from "@/components/Topbar";

// export default function DashboardLayout({
//    children,
// } : {
//    children: React.ReactNode;
// }) {
//    return (
//       <div className="flex h-screen bg-gray-50 text-gray-900">
//          {/* Sidebar  */}
//          <Sidebar />

//          {/* Main content area  */}
//          <div className="flex flex-col flex-1">
//             <Topbar />
//             <main className="p-6 overflow-y-auto">{children}</main>
//          </div>
//       </div>
//    )
// }



import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default async function DashboardLayout({ children }) {
  const session = await getServerSession();
  if (!session) redirect("/login");

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        {children}
      </div>
    </div>
  );
}
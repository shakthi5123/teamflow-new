"use client";

// swr = stale while revalidate means we can use cached data and revalidate it in the background everyhting happens automatically

import useSWR from "swr";
import CreateBoardForm from "@/components/CreateBoardForm";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function BoardsPage() {
   const { data: boards, mutate } = useSWR("/api/boards", fetcher);

   return (
      <div className="p-6">
         <h1 className="text-2xl font-semibold mb-4">Boards</h1>

         {/* create board form  */}
         <CreateBoardForm onCreate={mutate}/>

         {/* Boards List  */}
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            {!boards && <p>Loading boards...</p>}

            {boards?.boards?.map((b: any) => (
               <div key={b.id} className="p-4 bg-white dark:bg-gray-800 border rounded shadow">
                  <h2 className="font-semibold">{b.title}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{b.description || "No description"}</p>
               </div>
            ))}
         </div>

      </div>
   )
}
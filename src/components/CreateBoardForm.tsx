"use client";

import { useState } from "react";
import toast from "react-hot-toast";



export default function CreateBoardForm({ onCreated } : { onCreated: () => void}) { 
   const [title, setTitle] = useState("");
   const [desc, setDesc] = useState(""); // desc for description
   const [loading, setLoading] = useState(false);

   async function submit(e: any) {
      e.preventDefault();
      if (!title) return toast.error("Title is required");

      setLoading(true);

      const res = await fetch("/api/boards", {
         method: "POST",
         body: JSON.stringify({ title, description: desc }),
      });

      setLoading(false);

      if (!res.ok) return toast.error("Failed to create board");

      toast.success("Board created successfully");
      setTitle("");
      setDesc("");
      onCreated(); // notify parent to refresh the boards list
   }


   return (
      <form onSubmit={submit} className="space-y-3 bg-white dark:bg-gray-800 p-4 rounded shadow max-w-md">
         <input
         className="w-full p-2 border rounded"
         placeholder="Board title"
         value={title}
         onChange={(e) => setTitle(e.target.value)}
         />

         <input
         className="w-full p-2 border rounded"
         placeholder="Description (optional)"
         value={desc}
         onChange={(e) => setDesc(e.target.value)}
         />

         <button
         type="submit"
         disabled={loading}
         className="px-4 py-2 bg-blue-600 text-white rounded"
         >
         {loading ? "Creating..." : "Create Board"}
         </button>


      </form>
   )
}
// src/app/api/boards/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function GET() {
   const boards = await prisma.board.findMany({
      orderBy: { createdAt: "desc" },
   });

   return NextResponse.json({ boards });
}

export async function POST(req: Request) {
   try {
      const session = await getServerSession();
      console.log("SESSION --->", session);
      if (!session) {
         return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const { title, description } = await req.json();

      if(!title) {
         return NextResponse.json({ error: "Title is required" }, { status: 400 });
      }

      const board = await prisma.board.create({
         data: {
            title,
            description,
            ownerId: session.user.id, // logged in user becomes the owner
            members: [session.user.id], //  owner is also members list
         },

      });
      return NextResponse.json({ board }, { status: 201 });
   } catch (err) {
      console.error(err);
      return NextResponse.json({ error: "Failed to create board" }, { status: 500 });
   }
}
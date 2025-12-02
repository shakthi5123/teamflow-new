// app/api/boards/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { describe } from "node:test";


export async function GET() {
 try {
  const boards = await prisma.board.findMany();
  return NextResponse.json({ boards })
 } catch (error) {
  console.error(error)
  return NextResponse.json({ error: "Failed to fetch boards"}, { status: 500 })
 }
}

export async function POST(request: Request) {
 try {
  const data = await request.json();
  const board = await prisma.board.create({
   data: {
    title: data.title,
    description: data.description || "",
    ownerId: data.ownerId,
   },
  });
  return NextResponse.json({ board }, { status: 201 });
 } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create board" }, { status: 500 });
 }
}
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, name, message } = await req.json();
    const Message = await db.message.create({
      data: {
        email,
        name,
        message,
      },
    });
    return NextResponse.json(Message, {status:200});
  } catch (error) {
    console.log("ERROR WHILE SENDING MESSAGE", error)
  }
}

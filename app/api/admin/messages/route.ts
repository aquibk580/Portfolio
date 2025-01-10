import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface Message {
  email: string;
  name: string;
  message: string;
}

// Get All Messages
export async function GET(req: Request) {
  try {
    const messages: Array<Message> = await db.message.findMany();

    if (messages.length === 0) {
      return NextResponse.json({ error: "No messages found" }, { status: 404 });
    }

    return NextResponse.json({ messages }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error while getting messages", details: error.message },
      { status: 500 }
    );
  }
}

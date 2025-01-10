import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface Message {
  email: string;
  name: string;
  message: string;
}

// Send A Message
export async function POST(req: Request) {
  try {
    const body: Message = await req.json();
    const { email, name, message } = body;
    const Message = await db.message.create({
      data: {
        email,
        name,
        message,
      },
    });
    return NextResponse.json(Message, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "ERROR_WHILE_SENDING_MESSAGE",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
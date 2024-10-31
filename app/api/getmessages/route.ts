import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    if (password === process.env.PASSWORD) {
      const messages = await db.message.findMany();
      return NextResponse.json(messages, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Password is incorrect" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log("Error while getting message", error);
    return new NextResponse("Error while getting messages", { status: 500 });
  }
}

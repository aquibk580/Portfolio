import { db } from "@/lib/db"; // Assuming you have a DB connection utility
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { messageId: string } }
) {
  try {
    const { messageId } = await params;

    if (!messageId) {
      return NextResponse.json(
        { error: "Message ID is required" },
        { status: 400 }
      );
    }

    const message = await db.message.delete({
      where: {
        id: messageId,
      },
    });

    if (!message) return new NextResponse("Not found", { status: 404 });

    return new NextResponse("Message Deleted Successfully", { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting message" },
      { status: 500 }
    );
  }
}

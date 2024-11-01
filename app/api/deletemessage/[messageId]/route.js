import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
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

    if (!message) {
      return NextResponse.json(
        { error: "Message not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Message Deleted Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting message:", error);
    return NextResponse.json(
      { error: error.message || "Error deleting message" },
      { status: 500 }
    );
  }
}

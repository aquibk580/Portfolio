  import { db } from "@/lib/db";
  import { NextRequest, NextResponse } from "next/server";

  // Delete A Message

  interface Context {
    params: Promise<{ messageId: string }>;
  }

  export async function DELETE(request: NextRequest, context: Context) {
    try {
      const { messageId } = await context.params;

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
        return NextResponse.json({ error: "Message not found" }, { status: 404 });
      }

      return NextResponse.json(
        { message: "Message Deleted Successfully" },
        { status: 200 }
      );
    } catch (error: any) {
      console.error("Error deleting message:", error);
      return NextResponse.json(
        { error: error.message || "Error deleting message" },
        { status: 500 }
      );
    }
  }

import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface Skill {
    id: string;
    name: string;
    image: string;
    createdAt?: Date;
  }

// Get All Skills
export async function GET(req: NextRequest) {
    try {
      const skills: Array<Skill> = await db.skill.findMany({});
  
      if (skills.length === 0) {
        return NextResponse.json(
          { skills, message: "Skills Not Found" },
          { status: 200 }
        );
      }
  
      return NextResponse.json({ skills }, { status: 200 });
    } catch (error: any) {
      return NextResponse.json(
        {
          error: "Internal Server Error",
          details: error.message,
        },
        { status: 500 }
      );
    }
  }
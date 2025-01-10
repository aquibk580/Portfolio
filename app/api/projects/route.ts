import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface Project {
  id:string
  image: string;
  name: string;
  description: string;
  liveUrl: string;
  githubUrl: string;
}
// Get All Projects
export async function GET() {
  try {
    const projects: Array<Project> = await db.project.findMany({});

    if (projects.length === 0) {
      return NextResponse.json(
        { projects, message: "Projects not found" },
        { status: 200 }
      );
    }

    return NextResponse.json({ projects }, { status: 200 });
  } catch (error: any) {
    console.log("ERROR_WHILE_GETTING_PROJECTS", error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";

interface Project {
  id: string;
  image: string;
  name: string;
  description: string;
  liveUrl: string;
  githubUrl: string;
}

// Create A Project
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const liveUrl = formData.get("liveUrl") as string;
    const githubUrl = formData.get("githubUrl") as string;
    const imageFile = formData.get("image") as File | null;

    if (!name || !description || !liveUrl || !githubUrl || !imageFile) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const allowedMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/gif",
      "image/webp",
    ];
    if (!allowedMimeTypes.includes(imageFile.type)) {
      return NextResponse.json(
        { error: "Unsupported file type" },
        { status: 400 }
      );
    }

    const buffer = await imageFile.arrayBuffer();
    const imageUrl = await uploadToCloudinary(
      Buffer.from(buffer),
      process.env.PROJECT_FOLDER!
    );

    const project: Project = await db.project.create({
      data: {
        name,
        image: imageUrl,
        description,
        liveUrl,
        githubUrl,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error: any) {
    console.error("PROJECT_CREATION_ERROR", error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};

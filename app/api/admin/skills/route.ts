import { uploadToCloudinary } from "@/lib/cloudinary";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface Skill {
  id: string;
  name: string;
  image: string;
  createdAt?: Date;
}

// Add Skill
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  try {
    const name = formData.get("name") as string;
    const image = formData.get("image") as File;

    if (!name || !image) {
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
    if (!allowedMimeTypes.includes(image.type)) {
      return NextResponse.json(
        { error: "Unsupported file type" },
        { status: 400 }
      );
    }

    const buffer = await image.arrayBuffer();
    const imageUrl = await uploadToCloudinary(
      Buffer.from(buffer),
      process.env.SKILL_FOLDER!
    );

    const skill: Skill = await db.skill.create({
      data: {
        name,
        image: imageUrl,
      },
    });

    return NextResponse.json(skill, { status: 201 });
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



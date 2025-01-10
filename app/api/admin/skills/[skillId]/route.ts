import cloudinary, { uploadToCloudinary } from "@/lib/cloudinary";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface Context {
  params: Promise<{ skillId: string }>;
}

interface Skill {
  id?: string;
  name: string;
  image: string;
  createdAt?: Date;
}

// Get Single Skill
export async function GET(req: NextRequest, context: Context) {
  const { skillId } = await context.params;

  if (!skillId) {
    return NextResponse.json({ error: "Skilld is required" }, { status: 400 });
  }

  try {
    const skill: Skill | null = await db.skill.findUnique({
      where: {
        id: skillId,
      },
    });

    if (!skill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    return NextResponse.json(skill, { status: 200 });
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

// Edit Skill
export async function PATCH(req: NextRequest, context: Context) {
  const { skillId } = await context.params;

  if (!skillId) {
    return NextResponse.json({ error: "Skilld is required" }, { status: 400 });
  }

  try {
    const formData = await req.formData();
    const skill: Skill | null = await db.skill.findUnique({
      where: {
        id: skillId,
      },
    });

    if (!skill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    const updatedData: Partial<Skill> = {};
    const image = formData.get("image") as File;

    if (image instanceof File) {
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

      if (skill.image) {
        const extractPublicId = (url: string): string => {
          const parts = url.split("/");
          const publicIdWithExt = parts[parts.length - 1];
          return publicIdWithExt.split(".")[0];
        };

        const imagePublicId = extractPublicId(skill.image);

        if (imagePublicId) {
          await cloudinary.uploader.destroy(
            `${process.env.SKILL_FOLDER}/${imagePublicId}`
          );
        }
      }

      const buffer = await image.arrayBuffer();
      const updatedimageUrl = await uploadToCloudinary(
        Buffer.from(buffer),
        process.env.SKILL_FOLDER!
      );

      updatedData.image = updatedimageUrl;
    }

    if (formData.has("name")) {
      updatedData.name = formData.get("name") as string;
    }

    const updatedSkill = await db.skill.update({
      where: {
        id: skillId,
      },
      data: updatedData,
    });

    return NextResponse.json(
      { skill: updatedSkill, message: "Skill updated successfully" },
      { status: 200 }
    );
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

// Delete Skill
export async function DELETE(req: NextRequest, context: Context) {
  const { skillId } = await context.params;

  if (!skillId) {
    return NextResponse.json({ error: "Skilld is required" }, { status: 400 });
  }

  try {
    const skill = await db.skill.delete({
      where: {
        id: skillId,
      },
    });

    if (!skill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    return NextResponse.json(skill, { status: 200 });
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

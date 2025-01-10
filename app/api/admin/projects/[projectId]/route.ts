import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import cloudinary, { uploadToCloudinary } from "@/lib/cloudinary";

interface Context {
  params: Promise<{ projectId: string }>;
}

interface Project {
  id: string;
  image: string;
  name: string;
  description: string;
  liveUrl: string;
  githubUrl: string;
}

// Get Single Project
export async function GET(req: NextRequest, context: Context) {
  const { projectId } = await context.params;

  if (!projectId) {
    return NextResponse.json(
      { error: "Project Id is required" },
      { status: 400 }
    );
  }

  try {
    const project = await db.project.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!project) {
      return NextResponse.json({ error: "Project Not Found" }, { status: 404 });
    }

    return NextResponse.json(project, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

// Delete a project
export async function DELETE(req: NextRequest, context: Context) {
  const { projectId } = await context.params;

  if (!projectId) {
    return NextResponse.json(
      { error: "Project Id is required" },
      { status: 400 }
    );
  }

  try {
    const project: Project = await db.project.delete({
      where: {
        id: projectId,
      },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    if (!project.image) {
      return NextResponse.json(
        { error: "Image does not exist for this project" },
        { status: 404 }
      );
    }

    const imageUrl = project.image;

    const extractPublicId = (url: string) => {
      const parts = url.split("/");
      const publicIdWithExt = parts[parts.length - 1];
      return publicIdWithExt.split(".")[0];
    };

    const imagePublicId = extractPublicId(imageUrl);

    if (imagePublicId) {
      await cloudinary.uploader.destroy(
        `${process.env.PROJECT_FOLDER}/${imagePublicId}`
      );
    }

    return NextResponse.json(
      {
        message: "Project Deleted Successfully",
        project,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("ERROR_WHILE_DELETING_PROJECT", error.message);
    return NextResponse.json(
      { error: "ERROR_WHILE_DELETING_PROJECT", details: error.message },
      { status: 500 }
    );
  }
}

// Updating a project
export async function PATCH(req: NextRequest, context: Context) {
  const { projectId } = await context.params;

  if (!projectId) {
    return NextResponse.json(
      { error: "Project ID is required" },
      { status: 400 }
    );
  }

  try {
    const formData = await req.formData();
    const project = await db.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const updateData: Partial<Project> = {};
    const image = formData.get("image");

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

      if (project.image) {
        const extractPublicId = (url: string) => {
          const parts = url.split("/");
          const publicIdWithExt = parts[parts.length - 1];
          return publicIdWithExt.split(".")[0];
        };

        const imagePublicId = extractPublicId(project.image);
        await cloudinary.uploader.destroy(
          `${process.env.PROJECT_FOLDER}/${imagePublicId}`
        );
      }

      const buffer = await image.arrayBuffer();
      const updatedImageUrl = await uploadToCloudinary(
        Buffer.from(buffer),
        process.env.PROJECT_FOLDER!
      );

      updateData.image = updatedImageUrl;
    }

    if (formData.has("name")) {
      updateData.name = formData.get("name") as string;
    }

    if (formData.has("description")) {
      updateData.description = formData.get("description") as string;
    }

    if (formData.has("liveUrl")) {
      updateData.liveUrl = formData.get("liveUrl") as string;
    }

    if (formData.has("githubUrl")) {
      updateData.githubUrl = formData.get("githubUrl") as string;
    }

    const updatedProject = await db.project.update({
      where: { id: projectId },
      data: updateData,
    });

    return NextResponse.json(
      { project: updatedProject, message: "Project updated successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("ERROR_WHILE_UPDATING_PROJECT", error.message);
    return NextResponse.json(
      { error: "ERROR_WHILE_UPDATING_PROJECT", details: error.message },
      { status: 500 }
    );
  }
}

"use client";

import { useState, useEffect } from "react";
import { ProjectCard } from "../_components/ProjectCard";
import { AddProjectCard } from "../_components/AddProjectCard";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import { ProjectSkeleton } from "../_components/ProjectSkeleton";
import { toast } from "react-toastify";

interface Project {
  id: string;
  image: string;
  name: string;
  description: string;
  githubUrl: string;
  liveUrl: string;
}

export default function Page() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState("");
  const [isEditting, setIsEditing] = useState("");

  const getAllProjects = async (): Promise<void> => {
    try {
      const response = await axios.get("/api/projects");
      if (response.status === 200) {
        setProjects(response.data?.projects);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const authValue = Cookies.get("auth");
    if (authValue !== process.env.NEXT_PUBLIC_PASSWORD) {
      router.push("/");
    } else {
      getAllProjects();
    }
  }, [router]);

  const handleDelete = async (id: string): Promise<void> => {
    setIsDeleting(id);
    try {
      const response = await axios.delete(`/api/admin/projects/${id}`);
      if (response.status === 200) {
        setProjects(projects.filter((project) => project.id !== id));
        toast.success(`${response.data?.project?.name} Project Deleted`, {
          position: "top-center",

          theme: "dark",
        });
      } else {
        toast.error(response.data?.error, {
          position: "top-center",
          theme: "dark",
        });
      }
    } catch (error: any) {
      toast.error(error.message, {
        position: "top-center",
        theme: "dark",
      });
    } finally {
      setIsDeleting("");
    }
  };

  const handleEdit = (id: string) => {
    setIsEditing(id);
    router.push(`/adminpanel/projects/${id}`);
  };

  return (
    <div className="flex flex-col items-center py-12 text-white">
      <h1 className="text-3xl font-bold mb-6">My Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-5 sm:px-10 w-full max-w-7xl">
        {isLoading ? (
          <SkeletonCards />
        ) : (
          <>
            {projects.length === 0 ? (
              <>
                <AddProjectCard
                  text="Add Project"
                  formRoute="/adminpanel/projects/addproject"
                />
              </>
            ) : (
              <>
                {projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    {...project}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    isDeleting={isDeleting}
                  />
                ))}
                <AddProjectCard
                  text="Add Project"
                  formRoute="/adminpanel/projects/addproject"
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

const SkeletonCards: React.FC = () => (
  <>
    {[...Array(3)].map((_, index) => (
      <ProjectSkeleton key={index} />
    ))}
  </>
);

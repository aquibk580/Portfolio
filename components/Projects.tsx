"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ProjectCard from "./ProjectCard";
import ProjectCardSkeleton from "./ProjectCardSkeleton";

interface Project {
  id: string;
  image: string;
  name: string;
  description: string;
  githubUrl: string;
  liveUrl: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAllProjects = async (): Promise<void> => {
      try {
        const response = await axios.get("/api/projects");
        if (response.status === 200) {
          setProjects(response.data?.projects);
        }
      } catch (error: any) {
        toast.error("Error fetching projects", {
          position: "top-center",
          theme: "dark",
        });
      } finally {
        setIsLoading(false);
      }
    };
    getAllProjects();
  }, []);
  return (
    <section id="projects" className="flex flex-col items-center mb-12">
      <h2 className="text-2xl font-semibold mb-6 text-center">Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
        {isLoading ? (
          <ProjectCardSkeleton />
        ) : projects.length === 0 ? (
          <h1 className="text-4xl text-center">Projects not available</h1>
        ) : (
          projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              name={project.name}
              description={project.description}
              image={project.image}
              githubUrl={project.githubUrl}
              liveUrl={project.liveUrl}
            />
          ))
        )}
      </div>
    </section>
  );
}

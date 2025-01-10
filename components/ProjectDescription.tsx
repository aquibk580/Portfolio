"use client";
import React, { useState, useEffect } from "react";

interface ProjectDescriptionProps {
  description: string;
  id: string;
}

const ProjectDescription = ({ description, id }: ProjectDescriptionProps) => {
  const [isMobileView, setIsMobileView] = useState(false);
  const [expandedProjects, setExpandedProjects] = useState<string[]>([]);

  useEffect(() => {
    const updateView = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    updateView();
    window.addEventListener("resize", updateView);

    return () => window.removeEventListener("resize", updateView);
  }, []);

  const toggleExpandProject = (id: string) => {
    setExpandedProjects((prev) => {
      if (prev.includes(id)) {
        return prev.filter((i) => i !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <>
      <p className="text-gray-300 mt-2">
        {isMobileView
          ? expandedProjects.includes(id)
            ? description
            : description.substring(0, 100) + "..."
          : expandedProjects.includes(id)
          ? description
          : description.substring(0, 200) + "..."}
      </p>
      <button
        onClick={() => toggleExpandProject(id)}
        className="text-blue-500 mt-2 underline"
      >
        {expandedProjects.includes(id) ? "Read Less" : "Read More"}
      </button>
    </>
  );
};

export default ProjectDescription;

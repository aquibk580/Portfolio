"use client";

import { useEffect, useState } from "react";
import { TvMinimalPlay, Github } from "lucide-react";

export default function Projects() {
  const projects = [
    {
      title: "Shark Electronics",
      description:
        "Shark Electronics is an innovative project focused on delivering high-quality electronic products that blend functionality with sleek design. This project aims to cater to both tech enthusiasts and everyday users by offering reliable and user-friendly devices that meet modern needs.",
      imageUrl: "/Shark-electronics.png",
      liveLink: "https://shark-electronics.vercel.app",
      githubLink: "https://github.com/aquibk580/Shark-Electronics",
    },
    {
      title: "Sunshine Travels",
      description:
        "Sunshine Travels is designed as a modern travel platform, aiming to provide seamless travel planning, booking, and itinerary management for users. The project integrates user-friendly design elements to enhance the travel experience, from choosing destinations to managing reservations.",
      imageUrl: "/Sunshine.png",
      liveLink: "https://sunshine-frontend-nine.vercel.app",
      githubLink: "https://github.com/aquibk580/Sunshine-Frontend",
    },
    {
      title: "Sitarabucks",
      description:
        "This website is made in collaboration with my friends. Sitarabucks is a unique café concept that combines a traditional coffee shop experience with a local twist, aiming to bring authentic flavors to the forefront while catering to a modern, global clientele. Inspired by the heritage and charm of its surroundings, Sitarabucks serves a range of beverages and snacks.",
      imageUrl: "/Sitarabucks.png",
      liveLink: "https://aquibk500.infinityfreeapp.com/Sitarabucks/index.php",
      githubLink: "https://github.com/aquibk580/Sitarabucks",
    },
    {
      title: "TaskMaster",
      description:
        "TaskMaster is a user-friendly to-do list application designed to help users organize tasks efficiently. It allows users to create, manage, and prioritize tasks with ease, providing a straightforward interface for adding, editing, and deleting tasks as needed.",
      imageUrl: "/TaskMaster.png",
      liveLink: "https://tournamax-assignment-1.vercel.app",
      githubLink: "https://github.com/aquibk580/TaskMaster",
    },
    {
      title: "KnowledgeVerse",
      description:
        "KnowledgeVerse is a comprehensive Learning Management System (LMS) platform aimed at delivering an enriched and structured online learning experience. It offers educators, trainers, and organizations the tools to create, manage, and distribute courses effectively.",
      imageUrl: "/KnowledgeVerse.png",
      liveLink: "https://knowledgeverse-beta.vercel.app",
      githubLink: "https://github.com/aquibk580/KnowlegeVerse",
    },
    {
      title: "AKTECH",
      description:
        "AKTECH is a React-based e-commerce website focused on selling PC components. Designed to offer a seamless shopping experience, it allows users to browse, compare, and purchase a variety of computer hardware.",
      imageUrl: "/AKTech.png",
      liveLink: "https://aktech.vercel.app",
      githubLink: "https://github.com/aquibk580/AKTech",
    },
  ];
  const [isMobileView, setIsMobileView] = useState(false);
  const [expandedProjects, setExpandedProjects] = useState<Number[]>([]);

  useEffect(() => {
    const updateView = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    updateView();
    window.addEventListener("resize", updateView);

    return () => window.removeEventListener("resize", updateView);
  }, []);

  const toggleExpandProject = (index: Number) => {
    setExpandedProjects((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index); 
      } else {
        return [...prev, index];
      }
    });
  };
  return (
    <section id="projects" className="mb-12">
      <h2 className="text-2xl font-semibold mb-6 text-center">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div key={index} className="bg-gray-300/20 rounded-lg shadow-lg">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="rounded-t-lg"
            />
            <div className="p-6">
              <h3 className="font-semibold text-lg">{project.title}</h3>
              <p className="text-gray-300 mt-2">
                {isMobileView
                  ? expandedProjects.includes(index)
                    ? project.description
                    : project.description.substring(0, 100) + "..."
                  : expandedProjects.includes(index)
                  ? project.description
                  : project.description.substring(0, 200) + "..."}
              </p>
              <button
                onClick={() => toggleExpandProject(index)}
                className="text-blue-500 mt-2 underline"
              >
                {expandedProjects.includes(index) ? "Read Less" : "Read More"}
              </button>
              <div className="flex justify-between mt-4">
                <a
                  href={project.liveLink}
                  className="flex flex-row space-x-2 items-center bg-blue-500 text-white font-semibold py-2 px-[22px] rounded-full transition duration-300 ease-in-out hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <TvMinimalPlay className="text-red-500" size={20} />
                  <span>Live</span>
                </a>
                <a
                  href={project.githubLink}
                  className="flex flex-row space-x-2 items-center bg-gray-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out hover:bg-gray-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  <Github size={20} />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

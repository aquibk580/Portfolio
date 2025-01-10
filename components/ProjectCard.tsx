import { Github, TvMinimalPlay } from "lucide-react";
import React from "react";
import ProjectDescription from "./ProjectDescription";

interface ProjectProps {
  id: string;
  name: string;
  description: string;
  image: string;
  githubUrl: string;
  liveUrl: string;
}

const ProjectCard = ({
  id,
  name,
  description,
  image,
  githubUrl,
  liveUrl,
}: ProjectProps) => {
  return (
    <div className="bg-gray-300/20 rounded-lg shadow-lg">
      <img
        src={image}
        alt={name}
        className="object-contain w-full rounded-t-lg"
      />
      <div className="p-6">
        <h3 className="font-semibold text-lg">{name}</h3>
        <ProjectDescription description={description} id={id} />
        <div className="flex justify-between mt-4">
          <a
            href={liveUrl}
            className="flex flex-row space-x-2 items-center bg-blue-500 text-white font-semibold py-2 px-[22px] rounded-full transition duration-300 ease-in-out hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <TvMinimalPlay className="text-red-500" size={20} />
            <span>Live</span>
          </a>
          <a
            href={githubUrl}
            className="flex flex-row space-x-2 items-center bg-gray-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out hover:bg-gray-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            <Github size={20} />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

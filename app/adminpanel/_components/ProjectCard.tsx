import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Github, ExternalLink, Trash2, Edit } from "lucide-react";
import ProjectDescription from '@/components/ProjectDescription';

interface ProjectCardProps {
  id: string;
  image: string;
  name: string;
  description: string;
  githubUrl: string;
  liveUrl: string;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  isDeleting: string;
}

export function ProjectCard({
  id,
  image,
  name,
  description,
  githubUrl,
  liveUrl,
  onDelete,
  onEdit,
  isDeleting,
}: ProjectCardProps) {
  return (
    <Card className="flex flex-col h-full bg-[#3a365f] border-[#4a4675] text-white">
      <CardHeader className="p-0">
        <div className="relative w-full pt-[56.25%]">
          <Image
            src={image}
            alt={name}
            layout="fill"
            objectFit="fill"
            className="rounded-t-lg"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <h3 className="text-xl font-semibold mb-2 text-[#e0e0ff]">{name}</h3>
        <ProjectDescription description={description} id={id}/>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-2 p-4">
        <div className="col-span-2 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="flex-1 bg-[#4a4675] text-[#e0e0ff] hover:bg-[#5a5685] hover:text-white border-[#6a6695]"
          >
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </a>
          </Button>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="flex-1 bg-[#4a4675] text-[#e0e0ff] hover:bg-[#5a5685] hover:text-white border-[#6a6695]"
          >
            <a href={liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Live
            </a>
          </Button>
        </div>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(id)}
          className="bg-[#ff4d4f] hover:bg-[#ff7875] text-white"
        >
          {isDeleting === id ? (
            <>Deleting...</>
          ) : (
            <>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </>
          )}
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onEdit(id)}
          className="bg-[#7a7a9d] hover:bg-[#8a8aad] text-white"
        >
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </CardFooter>
    </Card>
  );
}

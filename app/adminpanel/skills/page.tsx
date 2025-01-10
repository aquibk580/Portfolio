"use client";

import { useState, useEffect } from "react";
import { AddProjectCard } from "../_components/AddProjectCard";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import { SkillCardSkeleton } from "../_components/SkillSkeletonCard";
import { toast } from "react-toastify";
import { SkillCard } from "../_components/SkillCard";

interface Skill {
  id: string;
  name: string;
  image: string;
  createdAt: Date;
}

export default function Page() {
  const router = useRouter();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState("");

  const getAllSkills = async (): Promise<void> => {
    try {
      const response = await axios.get("/api/skills");
      if (response.status === 200) {
        setSkills(response.data?.skills);
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
      getAllSkills();
    }
  }, [router]);

  const handleDelete = async (id: string): Promise<void> => {
    setIsDeleting(id);
    try {
      const response = await axios.delete(`/api/admin/skills/${id}`);
      if (response.status === 200) {
        setSkills(skills.filter((skill) => skill.id !== id));
        toast.success(`${response.data?.name} Skill Deleted`, {
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
    router.push(`/adminpanel/skills/${id}`);
  };

  return (
    <div className="flex flex-col items-center py-12 text-white">
      <h1 className="text-3xl font-bold mb-6">My Skills</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-5 sm:px-10 w-full max-w-7xl">
        {isLoading ? (
          <SkeletonCards />
        ) : (
          <>
            {skills.length === 0 ? (
              <>
                <AddProjectCard
                  text="Add Skill"
                  formRoute="/adminpanel/skills/addskill"
                />
              </>
            ) : (
              <>
                {skills.map((skill) => (
                  <SkillCard
                    key={skill.id}
                    {...skill}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    isDeleting={isDeleting}
                  />
                ))}
                <AddProjectCard
                  text="Add Skill"
                  formRoute="/adminpanel/skills/addskill"
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
      <SkillCardSkeleton key={index} />
    ))}
  </>
);

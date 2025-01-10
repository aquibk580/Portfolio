"use client";

import React, { useState, useEffect } from "react";
import SkillCard from "./SkillCard";
import { toast } from "react-toastify";
import axios from "axios";
import SkillSkeleton from "./SkillCardSkeleton";

interface Skill {
  id: string;
  name: string;
  image: string;
}

export default function Skills() {
  const [skills, setSkills] = useState<Array<Skill>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getAllSkills = async () => {
      console.log("running");
      try {
        const response = await axios.get("/api/skills");
        if (response.status === 200) {
          setSkills(response.data?.skills);
        }
      } catch (error: any) {
        toast.error("error fetching skills" + error.message, {
          position: "top-center",
          theme: "dark",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    getAllSkills();
  }, []);

  return (
    <section id="skills" className="mb-12">
      <h2 className="text-2xl font-semibold mb-6 text-center">Skills</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 md:gap-5 gap-4 w-full mx-w-7xl ">
        {isLoading ? (
          <>
            <SkillSkeleton />
          </>
        ) : skills.length === 0 ? (
          <h1 className="text-4xl text-center">Skills not available</h1>
        ) : (
          skills.map((skill) => (
            <SkillCard key={skill.id} name={skill.name} image={skill.image} />
          ))
        )}
      </div>
    </section>
  );
}

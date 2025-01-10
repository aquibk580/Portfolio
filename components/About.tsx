"use client";

import { useRouter } from "next/navigation";
import { Github, Linkedin, Twitter } from "lucide-react";

export default function About() {
  const router = useRouter();
  return (
    <section
      id="about"
      className="flex flex-col items-center md:flex-row gap-8 justify-center md:text-left md:mb-60 mb-20"
    >
      <div className="w-[310px] h-[280px] md:w-[320px] md:h-[320px] overflow-hidden flex items-center justify-center">
        <img
          src="/Profile.jpg"
          alt="Profile"
          className="max-w-full max-h-full object-contain rounded-lg"
        />
      </div>
      <div className="flex flex-col md:space-y-10 space-y-5 md:mx-5 text-center md:text-left">
        <h1 className="md:text-5xl text-3xl font-semibold">
          Hey I am{" "}
          <span
            className="text-blue-400"
            onClick={() => {
              router.push("/adminpanel");
            }}
          >
            Aquib Khan
          </span>
        </h1>
        <p className="text-gray-300 mt-4 max-w-lg">
          As a Full Stack Developer, I create responsive, efficient, and
          user-centric web applications, handling both front-end and back-end
          development. From seamless interfaces to robust server-side logic, I
          leverage a versatile tech stack to build dynamic solutions. Skilled in
          tools like React, Nextjs, nodejs, mongoDB, PHP, and MySQL, I ensure
          each project is scalable, secure, and optimized for performance.
        </p>
        <div className="flex justify-center gap-8">
          <a
            href="https://github.com/aquibk580"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="w-8 h-8 hover:text-blue-400 transition duration-300" />
          </a>
          <a
            href="https://www.linkedin.com/in/aquib-khan-42966b292/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="w-8 h-8 hover:text-blue-400 transition duration-300" />
          </a>
          <a
            href="https://x.com/Aquib_K_"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter className="w-8 h-8 hover:text-blue-400 transition duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
}

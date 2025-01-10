"use client";
import { MobileSidebar } from "./MobileSideBar";

export default function Header() {
  return (
    <header className="flex md:justify-around md:pt-20 bg-Mytheme z-10">
      <nav className=" md:flex hidden bg-gray-300/30 rounded-lg py-3 px-6 mx-auto justify-around fixed top-8 items-center place-self-center backdrop-blur-md w-full max-w-md">
        <a
          href="#about"
          className="text-white hover:text-gray-800 font-semibold"
        >
          About
        </a>
        <a
          href="#projects"
          className="text-white hover:text-gray-800 font-semibold"
        >
          Projects
        </a>
        <a
          href="#skills"
          className="text-white hover:text-gray-800 font-semibold"
        >
          Skills
        </a>
        <a
          href="#contact"
          className="text-gray-white hover:text-gray-800 font-semibold"
        >
          Contact
        </a>
      </nav>
      <nav className="md:hidden block">
        <div className="flex items-center px-5 py-[14px] shadow-lg bg-Mytheme fixed w-full">
          <MobileSidebar />
        </div>
      </nav>
    </header>
  );
}

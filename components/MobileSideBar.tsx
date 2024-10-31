import { Menu, CircleHelp, FolderGit, BadgeCheck, Contact } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription
} from "@/components/ui/sheet";
import { useRouter } from "next/navigation";

interface MobileSidebarProps {}

export const MobileSidebar = ({}: MobileSidebarProps) => {
  const router = useRouter();
  return (
    <Sheet>
      <SheetTrigger className="hover:opacity-75 transition">
        <Menu className="w-9 h-9" />
      </SheetTrigger>
      <SheetContent side="left" className="text-white bg-Mytheme p-0">
        <div className="flex flex-col text-lg mt-14">
          <SheetTitle className="hidden" />
          <SheetDescription className="hidden" />
          <SheetTrigger>
            <a
              href="#about"
              className="flex flex-row items-center w-full py-4 px-14 border-b border-t border-white hover:bg-white hover:text-black transition"
            >
              <div className="flex justify-center items-center w-12">
                <CircleHelp size={30} />
              </div>
              <span className="flex-grow text-left pl-4">About</span>
            </a>
            <a
              href="#projects"
              className="flex flex-row items-center w-full py-4 px-14 border-b border-white hover:bg-white hover:text-black transition"
            >
              <div className="flex justify-center items-center w-12">
                <FolderGit size={30} />
              </div>
              <span className="flex-grow text-left pl-4">Projects</span>
            </a>
            <a
              href="#skills"
              className="flex flex-row items-center w-full py-4 px-14 border-b border-white hover:bg-white hover:text-black transition"
            >
              <div className="flex justify-center items-center w-12">
                <BadgeCheck size={30} />
              </div>
              <span className="flex-grow text-left pl-4">Skills</span>
            </a>
            <a
              href="#contact"
              className="flex flex-row items-center w-full py-4 px-14 border-b border-white hover:bg-white hover:text-black transition"
            >
              <div className="flex justify-center items-center w-12">
                <Contact size={30} />
              </div>
              <span className="flex-grow text-left pl-4">Contact</span>
            </a>
          </SheetTrigger>
        </div>
      </SheetContent>
    </Sheet>
  );
};

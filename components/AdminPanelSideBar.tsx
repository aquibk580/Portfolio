import { Menu, HomeIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useRouter } from "next/navigation";

interface MobileSidebarProps {}

export const AdminPanelSideBar = ({}: MobileSidebarProps) => {
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
          <button
            onClick={() => {
              router.push("/");
            }}
            className="flex items-center justify-center w-full py-4 border-b border-t border-white hover:bg-white hover:text-black transition"
          >
            <div className="flex items-center space-x-2">
              <HomeIcon size={30} />
              <span>Home</span>
            </div>
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

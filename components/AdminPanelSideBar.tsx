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
            <button onClick={() => {router.push("/")}} className="flex flex-row items-center w-full py-4 px-14 border-b border-t border-white hover:bg-white hover:text-black transition">
              <div className="flex justify-center items-center w-12">
                <HomeIcon size={30} />
              </div>
              <span className="flex-grow text-left pl-4">Home</span>
            </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

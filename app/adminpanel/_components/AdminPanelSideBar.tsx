"use client";

import {
  Menu,
  HomeIcon,
  FolderGit,
  BadgeCheck,
  MessageSquareText,
  ShieldCheck,
  LogOut,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

interface MobileSidebarProps {}

export const AdminPanelSideBar = ({}: MobileSidebarProps) => {
  const router = useRouter();

  const menuItems = [
    {
      icon: HomeIcon,
      label: "Home",
      onClick: () => {
        router.push("/");
      },
    },
    {
      icon: BadgeCheck,
      label: "Skills",
      onClick: () => router.push("/adminpanel/skills"),
    },
    {
      icon: FolderGit,
      label: "Projects",
      onClick: () => router.push("/adminpanel/projects"),
    },
    {
      icon: MessageSquareText,
      label: "Messages",
      onClick: () => router.push("/adminpanel/messages"),
    },
    {
      icon: ShieldCheck,
      label: "Admin Panel",
      onClick: () => router.push("/adminpanel"),
    },
    {
      icon: LogOut,
      label: "LogOut",
      onClick: async () => {
        try {
          await axios.post("/api/auth/logout");
        } catch (error: any) {
          toast.error(error.message, {
            position: "top-center",
            theme: "dark",
          });
        } finally {
          router.push("/");
          toast.success("Logged Out Successfully", {
            position: "top-center",
            theme: "dark",
          });
        }
      },
    },
  ];

  return (
    <Sheet>
      <SheetTrigger className="hover:opacity-75 transition">
        <Menu className="w-9 h-9 text-white" />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="text-white bg-Mytheme p-0 flex flex-col"
      >
        <SheetTitle className="sr-only">Admin Panel Sidebar</SheetTitle>
        <SheetDescription className="sr-only">
          Navigation menu for admin panel
        </SheetDescription>
        <nav className="flex flex-col text-lg mt-14 flex-grow ">
          {menuItems.map((item, index) => (
            <SheetTrigger
              key={index}
              onClick={item.onClick}
              className="flex items-center w-full py-4 px-6 sm:pl-28 border-b border-white hover:bg-white hover:text-black transition"
            >
              <item.icon size={24} className="mr-4" />
              <span>{item.label}</span>
            </SheetTrigger>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

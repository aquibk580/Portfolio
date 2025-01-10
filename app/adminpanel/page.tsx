"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function AdminPanel() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showDialog, setShowDialog] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const authvalue = Cookies.get("auth");
    if (authvalue === process.env.NEXT_PUBLIC_PASSWORD) {
      setIsAuthenticated(true);
    }
  }, []);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", {
        password,
      });

      if (response.status === 200) {
        toast.success("Logged in successfully", {
          position: "top-center",
          theme: "dark",
        });
        setShowDialog(false);
        setIsAuthenticated(true);
      } else {
        setError("Invalid password");
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        toast.error("Invalid Password", {
          position: "top-center",
          theme: "dark",
        });
        setError("Invalid Password");
      } else {
        toast.error(error.message, {
          position: "top-center",
          theme: "dark",
        });
        setError(error.message);
      }
    }
  };

  return (
    <div className="min-h-screen text-white">
      {isAuthenticated ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pt-20 px-6 sm:px-8 md:px-10">
          <Card className="w-full bg-[#3a365f] border-[#4a4675] text-white">
            <CardHeader>
              <div className="relative w-full h-48 mb-4">
                <Image
                  src="/Project.jpg"
                  alt="Projects"
                  layout="fill"
                  objectFit="fill"
                  className="rounded-t-lg"
                />
              </div>
              <CardTitle className="text-2xl font-bold text-indigo-200">
                Projects
              </CardTitle>
              <CardDescription className="text-indigo-100">
                Manage your ongoing projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                View, edit, or delete all your current projects.
              </p>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => router.push("/adminpanel/projects")}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white"
              >
                Manage Projects
              </Button>
            </CardFooter>
          </Card>

          <Card className="w-full bg-[#3a365f] border-[#4a4675] text-white">
            <CardHeader>
              <div className="relative w-full h-48 mb-4">
                <Image
                  src="/Message.jpg"
                  alt="Messages"
                  layout="fill"
                  objectFit="fill"
                  className="rounded-t-lg"
                />
              </div>
              <CardTitle className="text-2xl font-bold text-indigo-200">
                Messages
              </CardTitle>
              <CardDescription className="text-indigo-100">
                Get the feedback from users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                See all the messages from the users
              </p>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => router.push("/adminpanel/messages")}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white"
              >
                Manage Messages
              </Button>
            </CardFooter>
          </Card>

          <Card className="w-full bg-[#3a365f] border-[#4a4675] text-white">
            <CardHeader>
              <div className="relative w-full h-48 mb-4">
                <Image
                  src="/Skills.jpg"
                  alt="Messages"
                  layout="fill"
                  objectFit="fill"
                  className="rounded-t-lg"
                />
              </div>
              <CardTitle className="text-2xl font-bold text-indigo-200">
                Skills
              </CardTitle>
              <CardDescription className="text-indigo-100">
                Manage all of your skills
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                View, add and delete all of your skills
              </p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => router.push("/adminpanel/skills")} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white">
                Manage Skills
              </Button>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="bg-[#2e2a5b] text-white shadow-lg border border-gray-700 rounded-lg p-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center text-indigo-200">
                Enter Admin Password
              </DialogTitle>
              <DialogDescription className="text-center text-gray-400 mt-2">
                Please enter the admin password to access the messages.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="grid gap-4">
                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <Label
                    htmlFor="password"
                    className="w-full sm:w-1/4 text-left sm:text-right text-gray-200"
                  >
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    className="w-full sm:w-3/4 p-2 text-gray-200 bg-[#3A3E66] rounded-md focus:ring-2 focus:ring-indigo-500"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
              <DialogFooter className="flex justify-center items-center mt-4">
                <Button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-md"
                >
                  Submit
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

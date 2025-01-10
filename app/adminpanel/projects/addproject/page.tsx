"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Controller,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Image, Link, Github } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { showConfetti } from "@/redux/slices/ConfettiSlice";
import Spinner from "@/components/Spinner";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name is required and must be at least 2 characters long",
  }),
  description: z.string().min(10, {
    message: "Description is required must be at least 10 characters long",
  }),
  image: z
    .instanceof(File)
    .refine(
      (file) =>
        file &&
        [
          "image/jpeg",
          "image/png",
          "image/jpg",
          "image/gif",
          "image/webp",
        ].includes(file.type) &&
        file.size <= 5 * 1024 * 1024,
      {
        message:
          "Image is required and must be a valid file (JPEG, PNG, JPG, GIF, or WebP) under 5MB",
      }
    )
    .nullable(),
  liveUrl: z
    .string()
    .url({ message: "Live URL is required and must be a valid URL" }),
  githubUrl: z
    .string()
    .url({ message: "Github URL is required and must be a valid URL" }),
});

const AddProject = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      image: null,
      liveUrl: "",
      githubUrl: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof formSchema>
  ): Promise<void> => {
    if (!values.image) {
      toast.error("Image is required", {
        position: "top-center",
        theme: "dark",
      });
      return;
    }
    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.set("name", values.name);
      formData.set("description", values.description);
      formData.set("image", values.image);
      formData.set("liveUrl", values.liveUrl);
      formData.set("githubUrl", values.githubUrl);

      const response = await axios.post("/api/admin/projects", formData);
      if (response.status === 201) {
        dispatch(showConfetti());
        router.push("/adminpanel/projects");
        toast.success(`${response.data?.name} Project Added `, {
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
      setIsProcessing(false);
    }
  };

  return (
    <main className="flex justify-center items-center bg-[#2e2a5b] p-4 py-12">
      <Card className="w-full max-w-2xl bg-white/10 backdrop-blur-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-white">
            Add New Project
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              encType="multipart/form-data"
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Project Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <FileText
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={18}
                          />
                          <Input
                            placeholder="Enter project name"
                            {...field}
                            className="pl-10 bg-white/20 text-white placeholder:text-white border-gray-600"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Project Image
                      </FormLabel>
                      <FormControl>
                        <div className="relative flex items-center">
                          <Image
                            className="absolute left-3 text-gray-400 pointer-events-none"
                            size={18}
                          />
                          {/* The hidden file input */}
                          <Input
                            type="file"
                            accept="image/*"
                            id="file-input"
                            onChange={(e) => {
                              const file = e.target.files?.[0] || null;
                              field.onChange(file);
                            }}
                            className="hidden"
                          />
                          {/* Custom "Choose File" button */}
                          <label
                            htmlFor="file-input"
                            className="cursor-pointer pl-10 bg-white/20 text-white placeholder:text-white border-gray-600 py-2 px-4 rounded-md"
                          >
                            {field.value ? (
                              <>
                                {field.value ? (
                                  <>{(field.value as File)?.name}</>
                                ) : (
                                  <>Choose File</>
                                )}
                              </>
                            ) : (
                              <>Choose File</>
                            )}
                          </label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      Project Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter project description"
                        {...field}
                        className="bg-white/20 text-white placeholder:text-white border-gray-600 min-h-[100px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="liveUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Live URL</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Link
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={18}
                          />
                          <Input
                            placeholder="Enter live URL"
                            {...field}
                            className="pl-10 bg-white/20 text-white placeholder:text-white border-gray-600"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="githubUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Github URL</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Github
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={18}
                          />
                          <Input
                            placeholder="Enter Github URL"
                            {...field}
                            className="pl-10 bg-white/20 text-white placeholder:text-white border-gray-600"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {isProcessing ? (
                <Button
                  type="button"
                  className="w-full bg-violet-600 hover:bg-violet-700 text-white"
                >
                  <Spinner />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full bg-violet-600 hover:bg-violet-700 text-white"
                >
                  Add Project
                </Button>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
};

export default AddProject;

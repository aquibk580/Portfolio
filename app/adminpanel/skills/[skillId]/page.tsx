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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Image, Link, Github } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters long",
    })
    .nullable(),
  image: z
    .custom<File>((file) => {
      if (file instanceof File) {
        const validateImageTypes = [
          "image/jpeg",
          "image/png",
          "image/jpg",
          "image/gif",
          "image/webp",
        ];
        const maxSizeInBytes = 5 * 1024 * 1024;
        return (
          validateImageTypes.includes(file.type) && file.size <= maxSizeInBytes
        );
      }
      return false;
    }, "Image must be a valid file (JPEG, PNG, JPG, GIF, or WebP) under 5MB")
    .nullable(),
});

interface Skill {
  id?: string;
  image: string;
  name: string;
  createdAt?: Date;
}

const EditProject = () => {
  const { skillId } = useParams();
  const router = useRouter();

  const [isUpdating, setIsUpdating] = useState(false);

  const { reset } = useForm();
  const [skill, setSkills] = useState<Skill>({
    image: "",
    name: "",
  });

  useEffect(() => {
    const getProject = async () => {
      try {
        const response = await axios.get(`/api/admin/skills/${skillId}`);
        if (response.status === 200) {
          setSkills(response.data);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    };

    getProject();
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: skill?.name,
      image: null,
    },
  });

  useEffect(() => {
    form.reset({
      name: skill?.name || "",
      image: null,
    });
  }, [skill, reset]);

  const onSubmit = async (
    values: z.infer<typeof formSchema>
  ): Promise<void> => {
    try {
      setIsUpdating(true);
      const formData = new FormData();
      if (values?.name) {
        formData.set("name", values.name);
      }
      if (values?.image) {
        formData.set("image", values.image);
      }

      const response = await axios.patch(
        `/api/admin/skills/${skillId}`,
        formData
      );
      if (response.status === 200) {
        router.push("/adminpanel/skills");
        toast.success(`${response.data?.skill?.name} Skills Updated `, {
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
      setIsUpdating(false);
    }
  };

  return (
    <main className="flex justify-center items-center bg-[#2e2a5b] p-4 py-12">
      <Card className="w-full max-w-2xl bg-white/10 backdrop-blur-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-white">
            Edit {skill?.name} Skill
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              encType="multipart/form-data"
              className="space-y-6"
            >
              {skill.image && (
                <div className="relative border p-5 border-gray-600 rounded overflow-hidden justify-self-center w-full max-w-md mx-auto">
                  <div className="relative pt-[56.25%]">
                    <img
                      src={skill.image}
                      alt="Current Skill"
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  </div>
                  <span className="absolute top-1 right-1 bg-purple-700 text-white font-semibold text-xs px-2 py-1 rounded">
                    Current
                  </span>
                </div>
              )}
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
                        <div className="space-y-4">
                          {/* File input */}
                          <div className="relative flex items-center">
                            <Image
                              className="absolute left-3 text-gray-400 pointer-events-none"
                              size={18}
                            />
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
                            <label
                              htmlFor="file-input"
                              className="cursor-pointer pl-10 bg-white/20 text-white placeholder:text-white border-gray-600 py-2 px-4 rounded-md"
                            >
                              {field.value ? (
                                <> {field.value ? <>{(field.value as File)?.name}</> : <>Choose File</>}</>
                              ) : (
                                <>Choose File</>
                              )}
                            </label>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-violet-600 hover:bg-violet-700 text-white"
              >
                {!isUpdating ? <>Submit</> : <>Updating...</>}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
};

export default EditProject;

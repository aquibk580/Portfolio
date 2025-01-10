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
import { FileText, Image, Link, Github } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { showConfetti } from "@/redux/slices/ConfettiSlice";
import Spinner from "@/components/Spinner";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name is required and must be at least 2 characters long",
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
});

const AddProject = () => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      image: null,
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
    try {
      setIsProcessing(true);
      const formData = new FormData();
      formData.set("name", values.name);
      formData.set("image", values.image);

      const response = await axios.post("/api/admin/skills", formData);
      if (response.status === 201) {
        dispatch(showConfetti());
        router.push("/adminpanel/skills");
        toast.success(`${response.data?.name} Skill Added `, {
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
            Add New Skill
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              encType="multipart/form-data"
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Skill Name</FormLabel>
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
                    <FormLabel className="text-white">Skill Image</FormLabel>
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
                              {" "}
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
              {isProcessing ? (
                <Button
                  type="button"
                  className="w-full bg-white/20 hover:bg-white/50 text-white"
                >
                  <Spinner />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full bg-violet-600 hover:bg-violet-700 text-white"
                >
                  Add Skill
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

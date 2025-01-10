"use client";

import React, { useEffect, useState, Suspense } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Message from "../_components/Message";
import { MessageSkeletonCard } from "../_components/MessageSkeletonCard";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
}

const page: React.FC = () => {
  const router = useRouter();

  const [messages, setMessages] = useState<Message[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authValue = Cookies.get("auth");
    if (authValue !== process.env.NEXT_PUBLIC_PASSWORD) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    const getAllMessages = async () => {
      try {
        const response = await axios.get("/api/admin/messages");
        if (response.status === 200) {
          setMessages(response?.data?.messages);
        } else {
          console.log(response?.data?.error);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getAllMessages();
  }, []);

  const handleDeleteMessage = async (id: string) => {
    try {
      const response = await axios.delete(`/api/admin/messages/${id}`);
      if (response.status === 200) {
        setMessages((prevMessages) =>
          prevMessages.filter((message) => message.id !== id)
        );
        toast.success("Message Deleted Successfully", {
          position: "top-center",
          theme: "dark",
        });
      } else {
        toast.error("Failed To Delete Message", {
          position: "top-center",
          theme: "dark",
        });
        console.error(response.data.error);
      }
    } catch (error: any) {
      toast.error(error.message, {
        position: "top-center",
        theme: "dark",
      });
      console.error("Failed to delete message:", error);
    }
  };

  const filteredMessages = Array.isArray(messages)
    ? messages.filter(
        (message) =>
          message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          message.message.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <main className="p-5 sm:px-10 h-full w-full py-12">
      <Card className="bg-[#32365A] border-none text-white">
        <CardHeader>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search messages..."
              className="pl-10 bg-[#3A3E66] border-none w-full placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Suspense fallback={<SkeletonCards />}>
            {isLoading ? (
              <SkeletonCards />
            ) : (
              <>
                {filteredMessages.map((message) => (
                  <Message
                    key={message.id}
                    message={message}
                    handleDelete={handleDeleteMessage}
                  />
                ))}
                {filteredMessages.length === 0 && (
                  <p className="text-center text-gray-400">
                    No messages found.
                  </p>
                )}
              </>
            )}
          </Suspense>
        </CardContent>
      </Card>
    </main>
  );
};

const SkeletonCards: React.FC = () => (
  <>
    {[...Array(5)].map((_, index) => (
      <MessageSkeletonCard key={index} />
    ))}
  </>
);

export default page;

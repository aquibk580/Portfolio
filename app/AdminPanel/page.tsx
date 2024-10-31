"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import axios, { AxiosError } from "axios";
import { AdminPanelSideBar } from "@/components/AdminPanelSideBar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
}

export default function AdminPanel() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showDialog, setShowDialog] = useState(true);
  const [error, setError] = useState("");

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "") {
      setError("Please Enter a Password!");
      setMessages([]);
      setIsAuthenticated(false);
    } else {
      try {
        const response = await axios.post(`/api/getmessages`, {
          password: password,
        });

        if (response.status === 200) {
          setIsAuthenticated(true);
          setMessages(response.data);
          setError("");
          setShowDialog(false);
        }
      } catch (error) {
        const axiosError = error as AxiosError; // Cast to AxiosError
        if (axiosError.response && axiosError.response.status === 400) {
          setError("Password is incorrect!");
        } else {
          setError("An error occurred while fetching messages.");
        }
        setMessages([]);
        setIsAuthenticated(false);
      }
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
    <div className="min-h-screen bg-Mytheme text-white">
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
              <div className="flex items-center space-x-4">
                <Label
                  htmlFor="password"
                  className="w-1/4 text-right text-gray-200"
                >
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  className="flex-1 p-2 text-gray-200 bg-[#3A3E66] rounded-md focus:ring-2 focus:ring-indigo-500"
                  value={password}
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

      {isAuthenticated ? (
        <>
          <header className="bg-Mytheme pt-8 flex items-center justify-center relative">
            <div className="flex items-center px-5 py-[14px] shadow-lg bg-Mytheme backdrop-blur-sm fixed w-full">
              <div className="absolute left-5 top-3">
                <AdminPanelSideBar />
              </div>
              <h1 className="text-2xl font-bold mx-auto">Messages</h1>
            </div>
          </header>

          <main className="p-6 pt-12">
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
              <CardContent>
                <div className="space-y-4">
                  {filteredMessages.map((message) => (
                    <Card
                      key={message.id}
                      className="bg-[#3A3E66] border-none text-white"
                    >
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                          <h3 className="font-semibold">{message.name}</h3>
                          <p className="text-sm text-gray-400">
                            {message.email}
                          </p>
                        </div>
                        <p className="text-sm">{message.message}</p>
                      </CardContent>
                    </Card>
                  ))}
                  {filteredMessages.length === 0 && (
                    <p className="text-center text-gray-400">
                      No messages found.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </main>
        </>
      ) : (
        <div className="flex items-center justify-center h-screen md:mx-0 mx-5">
          <p className="text-2xl">
            Please enter the correct password to view messages.
          </p>
        </div>
      )}
    </div>
  );
}

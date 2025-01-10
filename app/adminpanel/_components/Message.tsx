import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Trash } from "lucide-react";

interface messageProps {
  message: { id: string; name: string; email: string; message: string };
  handleDelete: (id: string) => void;
}

const Message: React.FC<messageProps> = ({ message, handleDelete }) => {
  return (
    <Card className="bg-[#3A3E66] border-none text-white">
      <CardContent className="p-4 bg-[#3A3E66] text-white rounded-md">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
          <div className="flex flex-col w-full sm:w-5/6 mb-2 sm:mb-0">
            <h3 className="font-semibold">{message.name}</h3>
            <p className="text-sm text-gray-400 my-1">{message.email}</p>
            <p className="text-sm break-words">{message.message}</p>
          </div>
          <Trash
            className="h-5 w-5 text-gray-400 hover:text-red-500 cursor-pointer mt-2 sm:mt-0"
            onClick={() => handleDelete(message.id)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default Message;

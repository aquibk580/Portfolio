import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, Edit } from "lucide-react";

interface SkillCardProps {
  id: string;
  image: string;
  name: string;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  isDeleting: string;
}

export function SkillCard({
  id,
  image,
  name,
  onDelete,
  onEdit,
  isDeleting,
}: SkillCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-br from-[#2a2a4a] to-[#3a365f] border-[#4a4675] text-white">
      <div className="flex flex-col p-6">
        <h3 className="text-2xl font-bold mb-4 text-[#e0e0ff]">{name}</h3>

        <div className="relative w-full pt-[56.25%] mb-4">
          <Image
            src={image}
            alt={name}
            fill
            sizes="100vw"
            className="object-contain rounded-md"
          />
        </div>

        <div className="flex justify-between space-x-4">
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(id)}
            className="flex-1 bg-gradient-to-r from-[#ff4d4f] to-[#ff7875] hover:from-[#ff7875] hover:to-[#ff9b9b] text-white transition-all duration-300"
            disabled={isDeleting === id}
          >
            {isDeleting === id ? (
              "Deleting..."
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </>
            )}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onEdit(id)}
            className="flex-1 bg-gradient-to-r from-[#7a7a9d] to-[#8a8aad] hover:from-[#8a8aad] hover:to-[#9a9abd] text-white transition-all duration-300"
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </div>
      </div>
    </Card>
  );
}

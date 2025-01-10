import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

interface AddAttributeCardProps {
  text: string;
  formRoute: string;
}

export function AddProjectCard({ text, formRoute }: AddAttributeCardProps) {
  const router = useRouter();
  return (
    <Card
      onClick={() => router.push(formRoute)}
      className="flex flex-col h-full bg-[#3a365f] border-[#4a4675] border-dashed cursor-pointer hover:bg-[#4a4675] transition-colors group"
    >
      <div className="flex items-center justify-center h-full min-h-[300px] text-[#b8b8d0]">
        <div className="flex flex-col items-center gap-4">
          <Plus className="w-12 h-12 group-hover:scale-110 transition-transform" />
          <span className="text-lg font-medium">{text}</span>
        </div>
      </div>
    </Card>
  );
}

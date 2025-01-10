import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export function SkillCardSkeleton() {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-br from-[#2a2a4a] to-[#3a365f] border-[#4a4675] text-white">
      <div className="flex flex-col p-6">
        <Skeleton className="h-8 w-3/4 mb-4 bg-[#4a4675]" />

        <div className="relative w-full pt-[56.25%] mb-4">
          <Skeleton className="absolute inset-0 rounded-md bg-[#4a4675]" />
        </div>

        <div className="flex justify-between space-x-4">
          <Skeleton className="h-9 flex-1 bg-[#4a4675]" />
          <Skeleton className="h-9 flex-1 bg-[#4a4675]" />
        </div>
      </div>
    </Card>
  );
}

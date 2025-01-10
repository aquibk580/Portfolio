"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function SkillSkeleton() {
  return (
    <>
      {[...Array(6)].map((_, index) => (
        <SkillCardSkeleton key={index} />
      ))}
    </>
  );
}

function SkillCardSkeleton() {
  return (
    <div className="bg-gray-300/20 p-4 flex flex-col rounded-lg place-items-center space-y-4">
      <Skeleton className="md:w-[100px] md:h-[100px] w-[80px] h-[80px] rounded-lg" />
      <Skeleton className="h-6 w-24" />
    </div>
  );
}

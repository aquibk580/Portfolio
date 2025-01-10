import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export function ProjectSkeleton() {
  return (
    <Card className="flex flex-col h-full bg-[#3a365f] border-[#4a4675]">
      <CardHeader className="p-0">
        <Skeleton className="w-full pt-[56.25%] rounded-t-lg" />
      </CardHeader>
      <CardContent className="flex-grow p-4 space-y-4">
        <Skeleton className="h-6 w-3/4 bg-[#4a4675]" />
        <Skeleton className="h-4 w-full bg-[#4a4675]" />
        <Skeleton className="h-4 w-5/6 bg-[#4a4675]" />
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-2 p-4">
        <div className="col-span-2 flex gap-2">
          <Skeleton className="h-9 flex-1 bg-[#4a4675]" />
          <Skeleton className="h-9 flex-1 bg-[#4a4675]" />
        </div>
        <Skeleton className="h-9 bg-[#4a4675]" />
        <Skeleton className="h-9 bg-[#4a4675]" />
      </CardFooter>
    </Card>
  );
}



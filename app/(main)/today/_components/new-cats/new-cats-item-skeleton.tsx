import { Skeleton } from "@/components/ui/skeleton"

export const NewCatsItemSkeleton = () => {
  return (
    <li className="w-36 shrink-0">
      <div className="flex flex-col gap-y-1">
        <Skeleton className="h-48 w-full rounded-xl" />
        <Skeleton className="h-5 w-20 ml-1" />
      </div>
    </li>
  )
} 
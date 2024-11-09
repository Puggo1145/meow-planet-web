import { Skeleton } from "@/components/ui/skeleton"

export const TodayRanksItemSkeleton = () => {
    return (
        <li className="flex items-center justify-between px-4 py-3">
            <div className="flex-1 flex items-center gap-x-4">
                <Skeleton className="h-6 w-6" />
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex items-center gap-x-2">
                <Skeleton className="h-4 w-12" />
            </div>
        </li>
    )
} 
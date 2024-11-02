import { Skeleton } from "@/components/ui/skeleton"

export const CatCreatorSkeleton = () => {
    return (
        <div className="space-y-3 pt-6 border-t">
            <Skeleton className="h-6 w-24" />
            <div className="flex items-center gap-3">
                <Skeleton className="size-10 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-32" />
                </div>
            </div>
        </div>
    )
} 
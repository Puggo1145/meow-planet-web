import { Skeleton } from "@/components/ui/skeleton"

export const CatInfoSkeleton = () => {
    return (
        <div className="space-y-6">
            <div className="space-y-4">
                {/* 头部信息 */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Skeleton className="size-10 rounded-full" />
                        <Skeleton className="h-8 w-32" />
                        <Skeleton className="size-6 rounded-full" />
                    </div>
                    <div className="flex gap-2">
                        <Skeleton className="size-10" />
                        <Skeleton className="size-10" />
                    </div>
                </div>

                {/* 年龄标签 */}
                <Skeleton className="h-6 w-16" />

                {/* 描述 */}
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                    <Skeleton className="h-4 w-3/5" />
                </div>
            </div>
        </div>
    )
} 
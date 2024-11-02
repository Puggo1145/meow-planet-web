import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"

export const CatImageGallerySkeleton = () => {
    return (
        <div className="col-span-2 space-y-4">
            {/* 主图区域 */}
            <Skeleton className="aspect-square rounded-2xl" />

            {/* 缩略图区域 */}
            <ScrollArea className="w-full">
                <div className="flex gap-2 pb-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            className="size-24 shrink-0 rounded-lg"
                        />
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
} 
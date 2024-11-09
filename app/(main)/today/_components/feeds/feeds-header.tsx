"use client"

import { Button } from "@/components/ui/button"
// store
import { useFeedsStore, FeedsNavs, FeedsNavsEnums, FeedType } from "@/store/use-feeds-store"
// utils
import { cn } from "@/lib/utils"

const FeedsHeader = () => {
    const { currentFeed, setCurrentFeed } = useFeedsStore()

    return (
        <div className="flex justify-between items-center py-6">
            <h1 className="text-2xl font-black">今日</h1>
            <div className="flex">
                {FeedsNavs.map((nav, index) => (
                    <Button
                        key={index}
                        variant="ghost"
                        className={cn(
                            "text-sm text-muted-foreground hover:text-primary",
                            currentFeed === nav && "text-primary font-bold"
                        )}
                        onClick={() => setCurrentFeed(nav as FeedType)}
                    >
                        {FeedsNavsEnums[nav]}
                    </Button>
                ))}
            </div>
        </div>
    )
}

export default FeedsHeader
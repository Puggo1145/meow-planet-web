"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useFeedsStore, FeedsNavs, FeedsNavsEnums, FeedType } from "@/store/use-feeds-store"
import { useUserStore } from "@/store/use-user"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

const FeedsHeader = () => {
    const router = useRouter()
    const { currentFeed, setCurrentFeed } = useFeedsStore()
    const { status } = useUserStore()

    const handleFeedChange = (feed: FeedType) => {
        if (feed === "loved" && status === "unauthenticated") {
            toast.error("请先登录")
            router.push("/sign-in")
            return
        }
        setCurrentFeed(feed)
    }

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
                        onClick={() => handleFeedChange(nav as FeedType)}
                    >
                        {FeedsNavsEnums[nav]}
                    </Button>
                ))}
            </div>
        </div>
    )
}

export default FeedsHeader
"use client"

// components
import FeedsItem from "./feeds-item"
import { 
    ScrollArea,
    ScrollBar 
} from "@/components/ui/scroll-area"
// mock
import { mockFeeds } from "@/mock/feeds-mock"

const FeedsList = () => {
    return (
        <ScrollArea className="mt-4 w-full flex-1">
            <ul className="flex flex-col gap-y-4 pb-4">
                {mockFeeds.map((feed) => (
                    <FeedsItem
                        key={feed.id}
                        {...feed}
                    />
                ))}
            </ul>
            <ScrollBar className="opacity-75" />
        </ScrollArea>
    )
}

export default FeedsList;

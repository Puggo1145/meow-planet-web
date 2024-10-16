// components
import FeedsItem from "./feeds-item"
import { ScrollArea } from "@/components/ui/scroll-area"
// mock
import { mockFeeds } from "@/mock/feeds-mock"

const FeedsList = () => {
    return (
        <ScrollArea className="w-full flex-1">
            <ul className="flex flex-col gap-y-4 pb-4">
                {mockFeeds.map((feed) => (
                    <FeedsItem
                        key={feed.id}
                        {...feed}
                    />
                ))}
            </ul>
        </ScrollArea>
    )
}

export default FeedsList
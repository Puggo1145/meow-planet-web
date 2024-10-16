// components
import FeedsItem from "./feeds-item"
import { ScrollArea } from "@/components/ui/scroll-area"

const FeedsList = () => {
    return (
        <ScrollArea className="w-full flex-1">
            <ul className="flex flex-col gap-y-4 pb-4">
                <FeedsItem />
                <FeedsItem />
                <FeedsItem />
            </ul>
        </ScrollArea>
    )
}

export default FeedsList
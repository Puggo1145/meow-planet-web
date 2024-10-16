// icons
import {
    HeartIcon,
    EyeIcon,
    MessageSquareTextIcon,
    Share2Icon
} from "lucide-react"
// ui
import { Button } from "@/components/ui/button"


interface IFeedsItemFn {
    children: React.ReactNode,
    count?: number,
}

const FeedsItemFn = ({ children, count }: IFeedsItemFn) => {
    return (
        <Button
            variant="ghost"
            className="hover:bg-gray-200"
        >
            {children}
            {
                count &&
                <span className="ml-2 font-bold text-muted-foreground">
                    {count}
                </span>
            }
        </Button>
    )
}

const FeedsItemFns = () => {
    const iconStyle = {
        size: 24,
        className: "text-muted-foreground",
    }

    return (
        <div className="flex items-center justify-between">
            <section>
                <FeedsItemFn count={6553}>
                    <EyeIcon {...iconStyle} />
                </FeedsItemFn>
                <FeedsItemFn count={10}>
                    <HeartIcon {...iconStyle} />
                </FeedsItemFn>
                <FeedsItemFn count={30}>
                    <MessageSquareTextIcon {...iconStyle} />
                </FeedsItemFn>
            </section>
            <section>
                <FeedsItemFn>
                    <Share2Icon {...iconStyle} />
                </FeedsItemFn>
            </section>
        </div>
    )
}

export default FeedsItemFns


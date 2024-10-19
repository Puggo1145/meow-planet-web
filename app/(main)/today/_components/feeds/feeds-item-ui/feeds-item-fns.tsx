// icons
import {
    HeartIcon,
    EyeIcon,
    MessageSquareTextIcon,
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


interface IFeedsItemFnsProps {
    views: number;
    likes: number;
    comments: number;
}

export const FeedsItemFns = ({
    views,
    likes,
    comments
}: IFeedsItemFnsProps) => {
    const iconStyle = {
        size: 24,
        className: "text-muted-foreground",
    }

    return (
        <div className="flex items-center justify-between">
            <FeedsItemFn count={views}>
                <EyeIcon {...iconStyle} />
            </FeedsItemFn>
            <FeedsItemFn count={likes}>
                <HeartIcon {...iconStyle} />
            </FeedsItemFn>
            <FeedsItemFn count={comments}>
                <MessageSquareTextIcon {...iconStyle} />
            </FeedsItemFn>
        </div>
    )
}

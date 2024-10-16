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
    count: number,
}

const FeedsItemFn = ({ children, count }: IFeedsItemFn) => {
    return (
        <Button variant="ghost">
            {children}
            <span className="ml-2 font-bold text-muted-foreground">{count}</span>
        </Button>
    )
}

const FeedsItemFns = () => {
    const iconStyle = {
        size: 24,
        className: "text-muted-foreground",
    } 

    return (
        <section className="flex items-center">
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
    )
}

export default FeedsItemFns


"use client"

// ui
import {
    CatCard,
    CatCardImage,
    CatCardInfo,
    CatCardInfoName,
    CatCardInfoLoveCount,
    CatCardImageUpdates,
} from "@/app/(main)/_components/cat-card"
import {
    ScrollArea,
    ScrollBar
} from "@/components/ui/scroll-area"
import { ListEnd } from "@/components/list-end"
// mock
import { mockCats } from "@/mock/cats-mock"

const FeedsList = () => {
    return (
        <ScrollArea className="mt-4 w-full flex-1">
            <ul className="w-full grid grid-cols-3 gap-4">
                {mockCats.map((cat) => (
                    <CatCard key={cat.id}>
                        <CatCardImage src={cat.image.src} />
                        <CatCardInfo>
                            <CatCardInfoName>{cat.name}</CatCardInfoName>
                            <CatCardInfoLoveCount loveCount={cat.lovedCount} />
                            <CatCardImageUpdates>
                                {`最近新增 ${cat.updates} 张图片`}
                            </CatCardImageUpdates>
                        </CatCardInfo>
                    </CatCard>
                ))}
            </ul>
            <ListEnd />
            <ScrollBar className="opacity-50" />
        </ScrollArea>
    )
}

export default FeedsList;

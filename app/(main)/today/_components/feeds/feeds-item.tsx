// ui
import {
    ScrollArea,
    ScrollBar,
} from "@/components/ui/scroll-area";
// components
import { 
    FeedsItemHeader,
    FeedsItemContent,
    FeedsItemContentTexts,
    FeedsItemContentImage,
    FeedsItemFns,
} from "./feeds-item-ui";
// utils
import { cn } from "@/lib/utils";
// mock
import type { StaticImageData } from "next/image";
// types
import { ComponentProps } from "react";


export interface IFeedsItemProps extends Omit<ComponentProps<'li'>, 'id'> {
    id: number;
    avatar: string;
    username: string;
    postTime: string;
    content: string;
    images: StaticImageData[];
    views: number;
    likes: number;
    comments: number;
}

const FeedsItem = ({
    avatar,
    username,
    postTime,
    content,
    images,
    views,
    likes,
    comments,
    className,
}: IFeedsItemProps) => {
    return (
        <li className={cn("w-full p-6 rounded-2xl bg-secondary flex flex-col gap-y-4", className)} >
            <FeedsItemHeader
                avatar={avatar}
                username={username}
                postTime={postTime}
            />

            <FeedsItemContent>
                <FeedsItemContentTexts>
                    {content}
                </FeedsItemContentTexts>
                {
                    images.length > 0 &&
                    <ScrollArea className="w-full overflow-hidden">
                        <div className="flex items-center gap-x-2 mb-3">
                            {images.map((image, index) => (
                                <FeedsItemContentImage
                                    key={index}
                                    src={image}
                                    alt="feeds image"
                                    className="h-[280px]"
                                />
                            ))}
                        </div>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                }
            </FeedsItemContent>

            <FeedsItemFns
                views={views}
                likes={likes}
                comments={comments}
            />
        </li>
    )
}

export default FeedsItem

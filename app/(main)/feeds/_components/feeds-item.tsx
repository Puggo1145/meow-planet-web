// ui
import {
    Avatar,
    AvatarImage,
    AvatarFallback,
} from "@/components/ui/avatar";
// components
import FeedsImage from "./feeds-image";
import FeedsItemFns from "./feeds-item-fns";
// mock
import type { StaticImageData } from "next/image";


export interface IFeedsItemProps {
    id: number;
    avatar: string;
    username: string;
    time: string;
    content: string;
    images: StaticImageData[];
    views: number;
    likes: number;
    comments: number;
}

const FeedsItem = ({
    avatar,
    username,
    time,
    content,
    images,
    views,
    likes,
    comments
}: IFeedsItemProps) => {
    return (
        <li className="w-full p-6 rounded-2xl bg-secondary flex flex-col gap-y-4">
            <section className="flex items-center gap-x-4">
                <Avatar>
                    <AvatarImage
                        src={avatar}
                        alt="avatar"
                        width={40}
                        height={40}
                    />
                    <AvatarFallback className="bg-white">
                        {username.slice(0, 1).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <h6 className="text-sm font-bold leading-none">
                        {username}
                    </h6>
                    <p className="text-sm text-muted-foreground leading-none">
                        {time}
                    </p>
                </div>
            </section>

            <section className="flex flex-col gap-y-4">
                <p className="max-w-3/4 leading-relaxed">
                    {content}
                </p>
                {/* MOCK IMAGES */}
                {
                    images.length > 0 &&
                    <div className="flex items-center gap-x-2">
                        {
                            images.map((image, index) => (
                                <FeedsImage
                                    key={index}
                                    src={image}
                                    alt="feeds image"
                                    className="h-[280px]"
                                />
                            ))
                        }
                    </div>
                }
            </section>

            <FeedsItemFns
                views={views}
                likes={likes}
                comments={comments}
            />
        </li>
    )
}

export default FeedsItem

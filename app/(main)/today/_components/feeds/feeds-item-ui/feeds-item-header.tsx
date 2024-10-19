// ui
import {
    Avatar,
    AvatarImage,
    AvatarFallback,
} from "@/components/ui/avatar";
// icons
import { Share2Icon } from "lucide-react";
// utils
import { cn } from "@/lib/utils";
// types
import { ComponentProps } from "react";

interface IFeedsItemHeaderProps extends ComponentProps<'section'> {
    avatar: string;
    username: string;
    postTime: string;
}

export const FeedsItemHeader: React.FC<IFeedsItemHeaderProps> = ({
    avatar,
    username,
    postTime,
    className,
    ...props
}) => {
    return (
        <section 
            className={cn("flex items-center justify-between", className)}
            {...props}
        >
            <div className="flex items-center gap-x-4">
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
                        {postTime}
                    </p>
                </div>
            </div>
            <div>
                <Share2Icon size={24} className="text-muted-foreground" />
            </div>
        </section>
    );
};

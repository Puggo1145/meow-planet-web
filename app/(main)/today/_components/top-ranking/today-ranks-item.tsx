// icons
import { FlameIcon } from "lucide-react";
// components
import {
    Avatar,
    AvatarImage,
    AvatarFallback
} from "@/components/ui/avatar"
// utils
import { cn } from "@/lib/utils";


export interface ITodayRanksItemProps {
    id: number;
    rank: number;
    catImage: string;
    catName: string;
    hotValue: number;
}

const rankColors = [
    "text-red-500",
    "text-orange-500",
    "text-yellow-500",
]


const TodayRanksItem = ({
    catImage,
    catName,
    rank,
    hotValue
}: ITodayRanksItemProps) => {
    return (
        <li className="flex items-center justify-between cursor-pointer px-4 py-3 rounded-xl hover:bg-secondary">
            <div className="flex-1 flex items-center gap-x-4">
                <span className={cn("font-bold text-slate-700", rank <= 3 && rankColors[rank - 1])}>
                    {rank}
                </span>
                <Avatar>
                    <AvatarImage
                        src={catImage}
                        alt="cat"
                        width={40}
                        height={40}
                    />
                    <AvatarFallback className="bg-secondary">
                        {catName.slice(0, 1).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <span className="text-sm font-bold">
                    {catName}
                </span>
            </div>
            <div className="flex items-center gap-x-2">
                <span className="font-bold text-primary">
                    {hotValue}
                </span>
                <FlameIcon size={16} className="text-primary" />
            </div>
        </li>
    )
}

export default TodayRanksItem;

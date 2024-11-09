// icons
import { FlameIcon } from "lucide-react";
// components
import {
    Avatar,
    AvatarImage,
    AvatarFallback
} from "@/components/ui/avatar"
import Link from "next/link";
// utils
import { cn } from "@/lib/utils";
// types
import { RankedCat } from "@/services/cats";

const rankColors = [
    "text-red-500",
    "text-orange-500",
    "text-yellow-500",
]


export const TodayRanksItem = ({
    $id,
    name,
    avatarUrl,
    hotValue,
    rank
}: RankedCat & { rank: number }) => {
    return (
        <Link href={`/cats/${$id}`} className="flex items-center justify-between cursor-pointer px-4 py-3 rounded-xl hover:bg-secondary">
            <div className="flex-1 flex items-center gap-x-4">
                <span className={cn("font-bold text-slate-700", rank <= 3 && rankColors[rank - 1])}>
                    {rank}
                </span>
                <Avatar>
                    <AvatarImage
                        src={avatarUrl}
                        alt="cat"
                        width={40}
                        height={40}
                    />
                    <AvatarFallback className="bg-secondary">
                        {name.slice(0, 1).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <span className="text-sm font-bold">
                    {name}
                </span>
            </div>
            <div className="flex items-center gap-x-2">
                <span className="font-bold text-primary">
                    {hotValue}
                </span>
                <FlameIcon size={16} className="text-primary" />
            </div>
        </Link>
    )
}

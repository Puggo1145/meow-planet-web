import { cn } from "@/lib/utils"
import { LikeCat } from "./like-cat"
import { LoveCat } from "./love-cat"

interface CatFnsProps {
    catId: string
    initialLikesCount: number
    initialLoveCount: number
}

export const CatFns = ({ 
    catId, 
    initialLikesCount, 
    initialLoveCount 
}: CatFnsProps) => {
    return (
        <div className={cn(
            "fixed bottom-12 right-8 md:bottom-16 md:right-16",
            "flex gap-x-4 p-4 rounded-full bg-background/80 backdrop-blur-sm",
            "border border-border",
            "z-50"
        )}>
            <LikeCat
                catId={catId}
                initialLikesCount={initialLikesCount}
            />
            <LoveCat
                catId={catId}
                initialLoveCount={initialLoveCount}
            />
        </div>
    )
} 
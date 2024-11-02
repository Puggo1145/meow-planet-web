import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import type { CatDocument } from "@/types/cats"
import { cn } from "@/lib/utils"
import { ShareCat } from "./share-cat"
import { LikeCat } from "./like-cat"
import { CatCreator } from "./cat-creator"

type CatInfoProps = Pick<CatDocument, "avatarUrl" | "name" | "gender" | "age" | "description" | "$id" | "likes" | "createdBy" | "$createdAt">

const genderMap = {
    "male": {
        alias: "男猫猫",
        color: "bg-blue-500"
    },
    "female": {
        alias: "女猫猫",
        color: "bg-pink-500"
    },
    "unknown": {
        alias: "未知",
        color: "bg-gray-500"
    }
}

export const CatInfo = ({ 
    $id,
    avatarUrl, 
    name, 
    gender, 
    age, 
    description,
    likes,
    createdBy,
    $createdAt
}: CatInfoProps) => {
    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src={avatarUrl ?? ""} />
                            <AvatarFallback>{name}</AvatarFallback>
                        </Avatar>
                        <h1 className="text-3xl font-bold">{name}</h1>
                    </div>
                    <div className="flex gap-2">
                        <ShareCat />
                        <LikeCat catId={$id} initialLikes={likes} />
                    </div>
                </div>

                <section className="flex items-center gap-3">
                    <Badge variant="secondary" className={cn(genderMap[gender].color, "text-white")}>
                        {genderMap[gender].alias}
                    </Badge>
                    <Badge variant="secondary">
                        {age} 岁
                    </Badge>
                </section>

                <p className="text-muted-foreground leading-relaxed">
                    {description}
                </p>
            </div>

            <CatCreator userId={createdBy} $createdAt={$createdAt} />
        </div>
    )
} 
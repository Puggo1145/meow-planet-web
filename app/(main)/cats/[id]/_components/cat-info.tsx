import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { ShareCat } from "./share-cat"
import { LoveCat } from "./love-cat"
import { CatCreator } from "./cat-creator"
import { PawPrint, Heart, AlertCircle, Calendar } from "lucide-react"
import type { CatDocument } from "@/types/cats"

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

type CatInfoProps = Pick<CatDocument, 
    "$id" | 
    "avatarUrl" | 
    "name" | 
    "gender" | 
    "age" | 
    "character" |
    "notice" |
    "disease" |
    "sterilization" |
    "description" | 
    "lovedCount" | 
    "likes" |
    "createdBy" | 
    "$createdAt"
>

export const CatInfo = ({ 
    $id,
    avatarUrl, 
    name, 
    gender, 
    age, 
    character,
    notice,
    disease,
    sterilization,
    description,
    lovedCount,
    // likes,
    createdBy,
    $createdAt
}: CatInfoProps) => {
    return (
        <div className="space-y-8">
            {/* 基本信息 */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Avatar className="size-16 border-4 border-muted">
                            <AvatarImage src={avatarUrl ?? ""} />
                            <AvatarFallback>{name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="text-3xl font-bold">{name}</h1>
                            <div className="flex items-center gap-2 mt-1">
                                <Badge variant="secondary" className={cn(genderMap[gender].color, "text-white")}>
                                    {genderMap[gender].alias}
                                </Badge>
                                {sterilization && (
                                    <Badge variant="outline">已绝育</Badge>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <ShareCat />
                        <LoveCat catId={$id} initialLoveCount={lovedCount} />
                    </div>
                </div>

                {description && (
                    <p className="text-muted-foreground leading-relaxed">
                        {description}
                    </p>
                )}
            </div>

            <Separator />

            {/* 年龄信息 */}
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-lg font-medium">
                    <Calendar className="size-5" />
                    <h2>年龄</h2>
                </div>
                <p className="text-muted-foreground">
                    {age} 岁
                </p>
            </div>

            {/* 性格特征 */}
            {character && (
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-lg font-medium">
                        <PawPrint className="size-5" />
                        <h2>性格特征</h2>
                    </div>
                    <p className="text-muted-foreground">{character}</p>
                </div>
            )}

            {/* 撸猫注意事项 */}
            {notice && (
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-lg font-medium">
                        <AlertCircle className="size-5" />
                        <h2>撸猫注意事项</h2>
                    </div>
                    <p className="text-muted-foreground">{notice}</p>
                </div>
            )}

            {/* 病症 */}
            {disease && disease.length > 0 && (
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-lg font-medium">
                        <Heart className="size-5" />
                        <h2>病症</h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {disease.map((item, index) => (
                            <Badge key={index} variant="secondary">
                                {item}
                            </Badge>
                        ))}
                    </div>
                </div>
            )}

            <Separator />

            {/* 创建者信息 */}
            <CatCreator userId={createdBy} $createdAt={$createdAt} />
        </div>
    )
} 
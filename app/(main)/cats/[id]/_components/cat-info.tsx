import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { CatFns } from "./cat-fns"
import { ShareCat } from "./share-cat"
import { CatCreator } from "./cat-creator"
import {
    PawPrintIcon,
    AlertCircleIcon,
    CalendarIcon,
    PillIcon,
    PencilIcon,
} from "lucide-react"
import type { CatDocument } from "@/types/cats"
import { useUserStore } from "@/store/use-user"
import { Button } from "@/components/ui/button"
import Link from "next/link"

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
    likes,
    createdBy,
    $createdAt
}: CatInfoProps) => {
    const isMaintainer = useUserStore(state => state.hasLabel("catMaintainer"))

    return (
        <div className="space-y-8">
            {/* 基本信息 */}
            <section className="space-y-4">
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
                    <div className="flex items-center gap-x-2">
                        <ShareCat />
                        {isMaintainer && (
                            <Button
                                variant="outline"
                                size="icon"
                                asChild
                            >
                                <Link href={`/cats/${$id}/edit`}>
                                    <PencilIcon className="size-4" />
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>

                <CatFns
                    catId={$id}
                    initialLikesCount={likes}
                    initialLoveCount={lovedCount}
                />

                {/* 介绍 */}
                <p className="text-muted-foreground leading-relaxed">
                    {description ?? "暂无介绍"}
                </p>
            </section>

            <Separator />

            {/* 年龄信息 */}
            <section className="space-y-2">
                <div className="flex items-center gap-2 text-lg font-medium">
                    <CalendarIcon className="size-5" />
                    <h2>年龄</h2>
                </div>
                <p className="text-muted-foreground">
                    {age} 岁
                </p>
            </section>

            {/* 性格特征 */}
            <section className="space-y-2">
                <div className="flex items-center gap-2 text-lg font-medium">
                    <PawPrintIcon className="size-5" />
                    <h2>性格特征</h2>
                </div>
                <p className="text-muted-foreground">{character ?? "暂无性格特征，快去探索吧！"}</p>
            </section>

            {/* 撸猫注意事项 */}
            {notice && (
                <section className="space-y-2">
                    <div className="flex items-center gap-2 text-lg font-medium">
                        <AlertCircleIcon className="size-5" />
                        <h2>撸猫注意事项</h2>
                    </div>
                    <p className="text-muted-foreground">{notice ?? "暂无注意事项，但是撸猫有风险！"}</p>
                </section>
            )}

            {/* 病症 */}
            {disease && disease.length > 0 && (
                <section className="space-y-2">
                    <div className="flex items-center gap-2 text-lg font-medium">
                        <PillIcon className="size-5" />
                        <h2>病症</h2>
                    </div>
                    {disease.length > 0
                        ?
                        <div className="flex flex-wrap gap-2">
                            {disease.map((item, index) => (
                                <Badge
                                    key={index}
                                    variant="secondary"
                                    className="px-4 py-2"
                                >
                                    {item}
                                </Badge>
                            ))}
                        </div>
                        :
                        <p className="text-muted-foreground">暂无病症记录，猫猫很健康！</p>
                    }
                </section>
            )}

            <Separator />

            {/* 创建者信息 */}
            <CatCreator userId={createdBy} $createdAt={$createdAt} />
        </div>
    )
} 
"use client"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { format } from "date-fns"
import { useState } from "react"
import { useEffect } from "react"
// components
import { CatCreatorSkeleton } from "./skeletons/cat-creator-skeleton"
// services
import { getUserById } from "@/services/users"
// types
import type { Models } from "appwrite"
import { toast } from "sonner"

interface CatCreatorProps {
    userId: string
    $createdAt: string
}

export const CatCreator = ({ userId, $createdAt }: CatCreatorProps) => {
    const [creator, setCreator] = useState<Models.User<Models.Preferences> | null>(null)

    useEffect(() => {
        const fetchCreator = async () => {
            try {
                const creator = await getUserById(userId)
                setCreator(creator)
            } catch (error) {
                toast.error("获取创建者信息失败: " + (error as Error).message)
            }
        }
        fetchCreator()
    }, [userId])

    if (!creator) return <CatCreatorSkeleton />

    return (
        <div className="space-y-3">
            <h2 className="font-semibold">创建者</h2>
            <div className="flex items-center gap-3">
                <Avatar>
                    <AvatarImage src={creator.prefs?.avatarUrl} />
                    <AvatarFallback>{creator.name?.[0]}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-medium">{creator.name}</p>
                    <p className="text-sm text-muted-foreground">
                        最后更新于 {format(new Date($createdAt), "yyyy-MM-dd")}
                    </p>
                </div>
            </div>
        </div>
    )
} 
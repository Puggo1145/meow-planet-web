"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
// icons
import { ThumbsUp } from "lucide-react"
// components
import { Button } from "@/components/ui/button"
import { Loader } from "@/components/loader"
// services
import { updateCatLikesCount } from "@/services/cats"
// store
import { useUserStore } from "@/store/use-user"
// utils
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface LikeCatProps {
    catId: string
    initialLikesCount: number
}

export const LikeCat = ({ catId, initialLikesCount }: LikeCatProps) => {
    const { user, updateUserPrefs } = useUserStore()
    const router = useRouter()

    const [likesCount, setLikesCount] = useState(initialLikesCount)
    const [isLoading, setIsLoading] = useState(false)
    const [isLiked, setIsLiked] = useState(
        user?.prefs?.likedCats?.includes(catId) ?? false
    )

    const handleLike = async () => {
        if (!user) {
            toast.error("请先登录")
            router.push("/sign-in")
            return
        }

        try {
            setIsLoading(true)
            const newLikesCount = isLiked ? likesCount - 1 : likesCount + 1
            await updateCatLikesCount(catId, newLikesCount)
            setLikesCount(newLikesCount)

            // 更新用户偏好
            const likedCats = user.prefs?.likedCats ?? []
            const updatedLikedCats = isLiked
                ? likedCats.filter((id: string) => id !== catId)
                : [...likedCats, catId]

            await updateUserPrefs({ likedCats: updatedLikedCats })
            setIsLiked(!isLiked)
        } catch (error) {
            toast.error("操作失败: " + (error as Error).message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Button
            variant="ghost"
            onClick={handleLike}
            className="flex items-center gap-x-2 rounded-full"
            disabled={isLoading}
        >
            {isLoading 
                ? <Loader className="size-5 animate-spin" /> 
                : <ThumbsUp className={cn(
                    "size-5 transition-colors",
                    isLiked ? "fill-primary text-primary" : "text-foreground"
                )} />
            }
            <span className={cn(
                "transition-colors",
                isLiked ? "text-primary" : "text-foreground"
            )}>
                {likesCount}
            </span>
        </Button>
    )
} 
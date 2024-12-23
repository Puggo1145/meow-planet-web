"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
// icons
import { Heart } from "lucide-react"
// components
import { Button } from "@/components/ui/button"
import { Loader } from "@/components/loader"
// services
import { updateCatLovedCount } from "@/services/cats"
// store
import { useUserStore } from "@/store/use-user"
// utils
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface LoveCatProps {
    catId: string
    initialLoveCount: number
}

export const LoveCat = ({ catId, initialLoveCount }: LoveCatProps) => {
    const { user, updateUserPrefs } = useUserStore()
    const router = useRouter()

    const [lovedCount, setLovedCount] = useState(initialLoveCount)
    const [isLoading, setIsLoading] = useState(false)
    const [isLoved, setIsLoved] = useState(
        user?.prefs?.lovedCats?.includes(catId) ?? false
    )

    const handleLove = async () => {
        if (!user) {
            toast.error("请先登录")
            router.push("/sign-in")
            return
        }

        try {
            setIsLoading(true)
            const newLovedCount = isLoved ? lovedCount - 1 : lovedCount + 1
            await updateCatLovedCount(catId, newLovedCount)
            setLovedCount(newLovedCount)

            // 更新用户偏好
            const lovedCats = user.prefs?.lovedCats ?? []
            const updatedLovedCats = isLoved
                ? lovedCats.filter((id: string) => id !== catId)
                : [...lovedCats, catId]

            await updateUserPrefs({ lovedCats: updatedLovedCats })
            setIsLoved(!isLoved)
        } catch (error) {
            toast.error("操作失败: " + (error as Error).message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Button
            variant="ghost"
            onClick={handleLove}
            className="flex items-center gap-x-2 rounded-full"
            disabled={isLoading}
        >
            {isLoading 
                ? <Loader className="size-5 animate-spin" /> 
                : <Heart className={cn(
                    "size-5 transition-colors",
                    isLoved ? "fill-red-500 text-red-500" : "text-foreground"
                )} />
            }
            <span className={cn(
                "transition-colors",
                isLoved ? "text-red-500" : "text-foreground"
            )}>
                {lovedCount}
            </span>
        </Button>
    )
} 
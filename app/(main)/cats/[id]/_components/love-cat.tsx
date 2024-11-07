"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
// icons
import { Heart } from "lucide-react"
// components
import { Button } from "@/components/ui/button"
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
        }
    }

    return (
        <Button 
            size="icon"
            variant={isLoved ? "default" : "outline"}
            onClick={handleLove}
        >
            <Heart className={cn(
                "size-5",
                isLoved && "fill-current"
            )} />
        </Button>
    )
} 
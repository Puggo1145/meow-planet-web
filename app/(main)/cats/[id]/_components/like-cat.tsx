import { useState } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { updateCatLikes } from "@/services/cats"
import { useUserStore } from "@/store/use-user"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface LikeCatProps {
    catId: string
    initialLikes: number
}

export const LikeCat = ({ catId, initialLikes }: LikeCatProps) => {
    const { user, updateUserPrefs } = useUserStore()
    const [likes, setLikes] = useState(initialLikes)
    const [isLiked, setIsLiked] = useState(
        user?.prefs?.likedCats?.includes(catId) ?? false
    )

    const handleLike = async () => {
        if (!user) {
            toast.error("请先登录")
            return
        }

        try {
            const newLikes = isLiked ? likes - 1 : likes + 1
            await updateCatLikes(catId, newLikes)
            setLikes(newLikes)

            // 更新用户偏好
            const likedCats = user.prefs?.likedCats ?? []
            const updatedLikedCats = isLiked
                ? likedCats.filter((id: string) => id !== catId)
                : [...likedCats, catId]

            await updateUserPrefs({ likedCats: updatedLikedCats })
            setIsLiked(!isLiked)
        } catch (error) {
            toast.error("操作失败: " + (error as Error).message)
        }
    }

    return (
        <Button 
            size="icon"
            variant={isLiked ? "default" : "outline"}
            onClick={handleLike}
        >
            <Heart className={cn(
                "size-5",
                isLiked && "fill-current"
            )} />
        </Button>
    )
} 
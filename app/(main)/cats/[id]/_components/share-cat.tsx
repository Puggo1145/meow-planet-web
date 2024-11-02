import { Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export const ShareCat = () => {
    const handleShare = async () => {
        try {
            await navigator.share({
                title: "猫咪档案",
                url: window.location.href,
            })
        } catch (error) {
            // 用户取消分享或浏览器不支持分享 API
            console.error("分享失败:", error)
        }
    }

    return (
        <Button 
            size="icon" 
            variant="outline"
            onClick={handleShare}
        >
            <Share2 className="size-5" />
        </Button>
    )
} 
import { useRef, useState } from "react"
// ui
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader } from "@/components/loader"
// store
import { useUserStore } from "@/store/use-user"
// icons
import { Camera } from "lucide-react"
// utils
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface UploadAvatarProps {
    size?: "sm" | "lg"
}

export const UploadAvatar = ({ size = "sm" }: UploadAvatarProps) => {
    const avatarSize = size === "sm" ? "size-10" : "size-20";
    const cameraSize = size === "sm" ? "size-4" : "size-6";
    
    const { user, updateAvatar } = useUserStore()
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // 验证文件类型
        if (!file.type.startsWith('image/')) {
            toast.error('请上传图片文件')
            return
        }

        // 验证文件大小（最大 5MB）
        if (file.size > 5 * 1024 * 1024) {
            toast.error('图片大小不能超过 5MB')
            return
        }

        try {
            setIsUploading(true)
            await updateAvatar(file)
            toast.success('头像更新成功')
        } catch (error: any) {
            toast.error('头像更新失败: ' + error.message)
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <div
            className="relative cursor-pointer group"
            onClick={() => fileInputRef.current?.click()}
        >
            <Avatar className={avatarSize}>
                <AvatarImage src={user?.prefs?.avatarUrl} />
                <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
            </Avatar>

            {/* 遮罩层和相机图标 */}
            <div className={cn(
                "absolute inset-0 rounded-full",
                "flex items-center justify-center",
                "bg-black/20 opacity-0 group-hover:opacity-100",
                "transition-opacity duration-200"
            )}>
                {isUploading
                    ? <Loader size="sm" className="text-white" />
                    : <Camera className={cn(cameraSize, 'text-white')} />
                }
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
            />
        </div>
    )
} 
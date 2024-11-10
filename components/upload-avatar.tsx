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
        } catch (error) {
            toast.error('头像更新失败: ' + (error as Error).message)
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <div
            className="relative cursor-pointer group"
            onClick={() => !isUploading && fileInputRef.current?.click()}
        >
            <Avatar className={cn(
                avatarSize,
                isUploading && "opacity-50"
            )}>
                <AvatarImage src={user?.prefs?.avatarUrl} />
                <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
            </Avatar>

            {/* 遮罩层和图标 */}
            <div className={cn(
                "absolute inset-0 rounded-full",
                "flex items-center justify-center",
                isUploading 
                    ? "bg-black/20" 
                    : "bg-black/20 opacity-0 group-hover:opacity-100",
                "transition-opacity duration-200"
            )}>
                {isUploading && (
                    <Loader className="text-white" />
                )}
                {!isUploading && (
                    <Camera className={cn(cameraSize, 'text-white')} />
                )}
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                disabled={isUploading}
            />
        </div>
    )
} 
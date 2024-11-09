"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
// ui
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
// components
import { Loader } from "@/components/loader"
import Image from "next/image"
// hooks
import { useImages } from "@/hooks/use-images"
// icons
import { PlusIcon, X } from "lucide-react"
// utils
import { toast } from "sonner"
import { cn } from "@/lib/utils"
// constants
import { BUCKETS_IDS } from "@/lib/appwrite"
// store
import { useUserStore } from "@/store/use-user"
// services
import { createCatImages } from "@/services/cats"
// types
import type { CreateCatImageData } from "@/types/cats"

interface UploadCatImagesModalProps {
    catId: string
    onUploadSuccess: () => void
}

export const UploadCatImagesModal = ({ catId, onUploadSuccess }: UploadCatImagesModalProps) => {
    const [isOpen, setIsOpen] = useState(false)
    
    // 用户需要登录后才能上传图片
    const { user } = useUserStore()
    const router = useRouter()
    useEffect(() => {
        if (isOpen && !user) {
            toast.info("请先登录")
            router.push("/sign-in")
        }
    }, [isOpen, user, router])

    const {
        images,
        isUploading,
        handleImageSelect,
        removeImage,
        uploadImages,
    } = useImages({
        bucket: BUCKETS_IDS.CATS,
        maxCount: 9,
        onUploadError: (error) => {
            toast.error(`上传图片失败: ${error.message}`)
        }
    })

    const handleUpload = async () => {
        if (images.length === 0) {
            toast.error("请至少上传一张图片")
            return
        }

        try {
            // 1. 上传所有图片到存储
            const uploadedFiles = await uploadImages()

            // 2. 创建猫咪图片记录
            const createImagesData: CreateCatImageData[] = uploadedFiles.map((file) => ({
                url: file.url,
                catId,
                createdBy: user!.$id
            }))

            await createCatImages(createImagesData)

            toast.success("上传成功！")
            onUploadSuccess()
            setIsOpen(false)
        } catch (error) {
            if (!isUploading) {
                toast.error(`上传失败: ${(error as Error).message}`)
            }
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="size-24 flex flex-col gap-y-2">
                    <PlusIcon className="size-8 text-muted-foreground" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>上传猫咪图片</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className="relative aspect-square rounded-xl overflow-hidden bg-secondary"
                            >
                                <Image
                                    src={URL.createObjectURL(image)}
                                    alt={`preview ${index}`}
                                    className="w-full h-full object-cover"
                                />
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    className="absolute top-2 right-2 size-6"
                                    onClick={() => removeImage(index)}
                                >
                                    <X className="size-4" />
                                </Button>
                            </div>
                        ))}
                        {images.length < 9 && (
                            <label className={cn(
                                "flex flex-col items-center justify-center",
                                "aspect-square rounded-xl border-2 border-dashed",
                                "cursor-pointer hover:bg-secondary transition-colors"
                            )}>
                                <PlusIcon className="size-8 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground mt-2">
                                    上传图片
                                </span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    className="hidden"
                                    onChange={(e) => handleImageSelect(e.target.files)}
                                />
                            </label>
                        )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                        最多可上传 9 张图片
                    </p>

                    <Button
                        className="w-full"
                        onClick={handleUpload}
                        disabled={isUploading}
                    >
                        {isUploading ? <Loader color="white" /> : "上传"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
} 
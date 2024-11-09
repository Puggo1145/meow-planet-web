"use client"

import { useEffect, useState } from "react"
// components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
// utils
import { cn } from "@/lib/utils"
// services
import { getUserById } from "@/services/users"
// types
import type { Models } from "appwrite"

interface ImageUploaderProps {
    userId: string
    className?: string
}

export const ImageUploader = ({ userId, className }: ImageUploaderProps) => {
    const [uploader, setUploader] = useState<Models.User<Models.Preferences> | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchUploader = async () => {
            setIsLoading(true)
            try {
                const user = await getUserById(userId)
                setUploader(user)
            } catch (error) {
                console.error("Failed to fetch uploader:", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchUploader()
    }, [userId])

    if (isLoading) {
        return (
            <div className="z-50 absolute flex items-center gap-2">
                <Skeleton className="size-6 rounded-full" />
                <Skeleton className="h-4 w-20" />
            </div>
        )
    }

    if (!uploader) return null

    return (
        <div className={cn(
            "z-50 absolute bottom-3 right-3",
            "px-3 py-2 rounded-full",
            "bg-black/50 backdrop-blur-sm",
            className
        )}>
            <div className="flex items-center gap-2">
                <Avatar className="size-6">
                    <AvatarImage src={uploader.prefs?.avatarUrl} />
                    <AvatarFallback>{uploader.name?.[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-white/90 font-medium">
                    此图片由 {uploader.name} 上传
                </span>
            </div>
        </div>
    )
}

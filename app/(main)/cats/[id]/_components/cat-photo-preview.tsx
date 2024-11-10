"use client"

import { useState, useEffect } from "react"
// ui
import { Dialog, DialogTitle, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
// components
import Image from "next/image"
import { Loader } from "@/components/loader"
import { ImageUploader } from "./image-uploader"
// icons
import { X } from "lucide-react"
// types
import type { CatImageDocument } from "@/types/cats"

interface CatPhotoPreviewProps {
    image: CatImageDocument | null
    onClose: () => void
}

export const CatPhotoPreview = ({ image, onClose }: CatPhotoPreviewProps) => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
    }, [image])

    return (
        <Dialog
            open={!!image}
            onOpenChange={onClose}
        >
            <DialogTitle></DialogTitle>
            <DialogContent className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg min-h-64 rounded-xl border-none p-0 overflow-hidden">
                {isLoading &&
                    <div className="z-50 absolute inset-0 flex items-center justify-center">
                        <Loader color="muted" />
                    </div>
                }
                {/* Close Button */}
                <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 right-2 z-50 bg-black/20 hover:bg-black/40 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <X className="size-5 text-white" />
                </Button>

                <div className="relative">
                    {/* Image */}
                    {image && (
                        <Image
                            src={image.url}
                            alt={`Cat photo ${image.$id}`}
                            width={1200}
                            height={800}
                            onLoad={() => setIsLoading(false)}
                            className="size-full object-cover"
                        />
                    )}
                    {/* Uploader */}
                    {image &&
                        <ImageUploader
                            userId={image.createdBy}
                        />
                    }
                </div>
            </DialogContent>
        </Dialog>
    )
}
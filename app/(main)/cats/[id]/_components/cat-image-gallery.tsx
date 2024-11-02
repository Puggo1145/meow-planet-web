"use client"

// components
import { ScrollArea } from "@/components/ui/scroll-area"
import { CatImageGallerySkeleton } from "./skeletons/cat-image-gallery-skeleton"
import Image from "next/image"
// utils
import { cn } from "@/lib/utils"
// icons
import { ImageIcon } from "lucide-react"
// services
import { getCatImages } from "@/services/cats"
// types
import type { CatImageDocument } from "@/types/cats"
import { useEffect, useState } from "react"

interface CatImageGalleryProps {
    id: string
}

export const CatImageGallery = ({ id }: CatImageGalleryProps) => {
    const [images, setImages] = useState<CatImageDocument[]>([])
    const [selectedImage, setSelectedImage] = useState<string | null>(null)

    useEffect(() => {
        const fetchCatImages = async () => {
            const images = await getCatImages(id)
            setImages(images)

            if (images.length > 0) {
                setSelectedImage(images[0].url)
            }

        }
        fetchCatImages()
    }, [id])

    if (images.length === 0) {
        return <CatImageGallerySkeleton />
    }

    return (
        <div className="col-span-2 space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-secondary">
                {selectedImage ? (
                    <Image
                        src={selectedImage}
                        alt="cat"
                        width={800}
                        height={800}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="size-20 text-muted-foreground" />
                    </div>
                )}
            </div>

            <ScrollArea className="w-full">
                <div className="flex gap-2 pb-4">
                    {images.map((image) => (
                        <div
                            key={image.$id}
                            className={cn("shrink-0 overflow-hidden cursor-pointer size-24 rounded-lg hover:opacity-80", 
                                selectedImage === image.url && "border-2 border-primary")}
                            onClick={() => setSelectedImage(image.url)}
                        >
                            <Image
                                src={image.url}
                                alt={`thumbnail ${image.$id}`}
                                width={100}
                                height={100}
                                className="size-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
} 
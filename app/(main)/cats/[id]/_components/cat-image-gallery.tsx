"use client"

import { useState, useEffect, useMemo, useRef } from "react"
// components
import Image from "next/image"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { CatImageGallerySkeleton } from "./skeletons/cat-image-gallery-skeleton"
import { UploadCatImagesModal } from "./upload-cat-images-modal"
import { NoImageStatus } from "@/components/status/no-image-status"
// utils
import { cn } from "@/lib/utils"
// services
import { getCatImages } from "@/services/cats"
// store
import { useUserStore } from "@/store/use-user"
// components
import { ImageUploader } from "./image-uploader"
// swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
// types
import type { Swiper as SwiperType } from 'swiper'
import type { CatImageDocument } from "@/types/cats"

import "swiper/css"

interface CatImageGalleryProps {
    id: string
}

export const CatImageGallery = ({ id }: CatImageGalleryProps) => {
    const { user } = useUserStore()
    const [images, setImages] = useState<CatImageDocument[]>([])
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0)
    const uploaderUserId = useMemo(() => images[selectedImageIndex]?.createdBy, [images, selectedImageIndex])

    const fetchCatImages = async () => {
        const images = await getCatImages(id)
        setImages(images)
    }

    useEffect(() => {
        fetchCatImages()
    }, [id])

    if (images.length === 0 && !user) {
        return <CatImageGallerySkeleton />
    }

    return (
        <div className="col-span-2 space-y-4">
            <CatImageDisplay
                images={images}
                selectedImageIndex={selectedImageIndex}
                uploaderUserId={uploaderUserId}
                onSlideChange={setSelectedImageIndex}
            />
            <ImagePreviewGallery
                images={images}
                selectedImageIndex={selectedImageIndex}
                setSelectedImageIndex={setSelectedImageIndex}
                catId={id}
                fetchCatImages={fetchCatImages}
            />
        </div>
    )
}

const ImageLoadingOverlay = () => {
    return <div className={cn(
        "-z-10 absolute inset-0 pointer-events-none",
        "bg-gradient-to-r from-black/35 to-black/40",
        "animate-breath"
    )} />
}

interface CatImageDisplayProps {
    images: CatImageDocument[]
    selectedImageIndex: number
    uploaderUserId: string | undefined
    onSlideChange: (index: number) => void
}

const CatImageDisplay = ({
    images,
    selectedImageIndex,
    uploaderUserId,
    onSlideChange
}: CatImageDisplayProps) => {
    const swiperRef = useRef<SwiperType>()

    // 当 selectedImageIndex 改变时，手动切换幻灯片
    useEffect(() => {
        if (swiperRef.current && swiperRef.current.activeIndex !== selectedImageIndex) {
            swiperRef.current.slideTo(selectedImageIndex)
        }
    }, [selectedImageIndex])

    return (
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary">
            {images.length > 0 ? (
                <Swiper
                    modules={[Navigation]}
                    initialSlide={selectedImageIndex}
                    onSlideChange={(swiper) => onSlideChange(swiper.activeIndex)}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper
                    }}
                    className="w-full h-full"
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={image.$id}>
                            <Image
                                src={image.url}
                                alt={`cat ${index + 1}`}
                                width={500}
                                height={500}
                                className={cn("w-full h-full object-cover")}
                            />
                            <ImageLoadingOverlay />
                        </SwiperSlide>
                    ))}
                    <ImageUploader userId={uploaderUserId ?? ""} />
                </Swiper>
            ) : (
                <NoImageStatus />
            )}
        </div>
    )
}

interface ImagePreviewGalleryProps {
    images: CatImageDocument[]
    selectedImageIndex: number | undefined
    setSelectedImageIndex: (index: number) => void
    catId: string
    fetchCatImages: () => void
}

const ImagePreviewGallery = ({
    images,
    selectedImageIndex,
    setSelectedImageIndex,
    catId,
    fetchCatImages
}: ImagePreviewGalleryProps) => {
    return (
        <ScrollArea className="w-full">
            <div className="flex gap-2 pb-4">
                <UploadCatImagesModal catId={catId} onUploadSuccess={fetchCatImages} />
                {images.map((image, index) => (
                    <div
                        key={image.$id}
                        className={cn(
                            "shrink-0 overflow-hidden cursor-pointer size-24 rounded-lg hover:opacity-80",
                            selectedImageIndex === index && "border-2 border-primary"
                        )}
                        onClick={() => setSelectedImageIndex(index)}
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
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    )
}
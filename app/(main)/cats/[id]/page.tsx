"use client"

import { useEffect, useState } from "react"
// components
import { CatImageGallery } from "./_components/cat-image-gallery"
import { CatInfo } from "./_components/cat-info"
import { CatImageGallerySkeleton } from "./_components/skeletons/cat-image-gallery-skeleton"
import { CatInfoSkeleton } from "./_components/skeletons/cat-info-skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CatPhotoTimeline } from "./_components/cat-photo-timeline"
// utils
import { toast } from "sonner"
// services
import { getCatById } from "@/services/cats"
// types
import type { CatDocument } from "@/types/cats"

const CatDetailPage = ({ params }: { params: { id: string } }) => {
    const [cat, setCat] = useState<CatDocument | null>(null)

    useEffect(() => {
        const fetchCat = async () => {
            try {
                const cat = await getCatById(params.id)
                setCat(cat)
            } catch (error) {
                toast.error(`获取猫咪信息失败: ${(error as Error).message}`)
            }
        }
        fetchCat()
    }, [params.id])

    return (
        <div className="w-full h-full flex flex-col">
            <ScrollArea className="flex-1">
                <div className="mt-4 grid grid-cols-3 gap-8 pr-4">
                    {cat === null
                        ?
                        <>
                            <CatImageGallerySkeleton />
                            <CatInfoSkeleton />
                        </>
                        :
                        <>
                            <CatImageGallery id={params.id} />
                            <CatInfo {...cat} />
                        </>
                    }
                </div>
                {cat && <CatPhotoTimeline catId={params.id} />}
                <div className="pb-8" />
            </ScrollArea>
        </div>
    )
}

export default CatDetailPage

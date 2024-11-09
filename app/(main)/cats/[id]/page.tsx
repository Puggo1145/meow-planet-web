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
                {/* Main content grid - responsive layout */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 px-4">
                    {cat === null
                        ?
                        <>
                            <div className="md:col-span-1 lg:col-span-2">
                                <CatImageGallerySkeleton />
                            </div>
                            <div className="md:col-span-1 lg:col-span-1">
                                <CatInfoSkeleton />
                            </div>
                        </>
                        :
                        <>
                            <div className="md:col-span-1 lg:col-span-2">
                                <CatImageGallery id={params.id} />
                            </div>
                            <div className="md:col-span-1 lg:col-span-1">
                                <CatInfo {...cat} />
                            </div>
                        </>
                    }
                </div>
                {/* Photo timeline section */}
                {cat && (
                    <div className="px-4">
                        <CatPhotoTimeline catId={params.id} />
                    </div>
                )}
                <div className="pb-8" />
            </ScrollArea>
        </div>
    )
}

export default CatDetailPage

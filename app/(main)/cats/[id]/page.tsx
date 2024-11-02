"use client"

import { useEffect, useState } from "react"
// components
import { CatImageGallery } from "./_components/cat-image-gallery"
import { CatInfo } from "./_components/cat-info"
import { CatImageGallerySkeleton } from "./_components/skeletons/cat-image-gallery-skeleton"
import { CatInfoSkeleton } from "./_components/skeletons/cat-info-skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"
// services
import { getCatById } from "@/services/cats"
// types
import type { CatDocument } from "@/types/cats"

const CatDetailPage = ({ params }: { params: { id: string } }) => {
    const [cat, setCat] = useState<CatDocument | null>(null)

    useEffect(() => {
        const fetchCat = async () => {
            const cat = await getCatById(params.id)
            setCat(cat)
        }
        fetchCat()
    }, [params.id])

    return (
        <div className="w-full h-full flex flex-col">
            <ScrollArea className="flex-1">
                <div className="mt-4 grid grid-cols-3 gap-8 pr-4 pb-8">
                    {cat === null ? (
                        <>
                            <CatImageGallerySkeleton />
                            <CatInfoSkeleton />
                        </>
                    ) : (
                        <>
                            <CatImageGallery id={params.id} />
                            <CatInfo
                                $id={cat?.$id}
                                avatarUrl={cat?.avatarUrl}
                                name={cat?.name}
                                gender={cat?.gender}
                                age={cat?.age}
                                description={cat?.description}
                                likes={cat?.likes}
                                createdBy={cat?.createdBy}
                                $createdAt={cat?.$createdAt}
                            />
                        </>
                    )}
                </div>
            </ScrollArea>
        </div>
    )
}

export default CatDetailPage
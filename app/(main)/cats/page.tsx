"use client"

import { useEffect, useState, useRef } from "react"
// ui
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
// components
import { CatsHeader } from "./_components/cats-header"
import { CatsList } from "./_components/cats-list"
import { CatsMaintainers } from "./_components/cats-maintainers"
import { CatsSearch } from "./_components/cats-search"
// utils
import { toast } from "sonner"
// services
import { getCats } from "@/services/cats"
// types
import type { CatDocument } from "@/types/cats"
// hooks
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll"
import { ListEnd } from "@/components/list-end"

const CatsPage = () => {
    const [cats, setCats] = useState<CatDocument[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const [keyword, setKeyword] = useState<string | undefined>(undefined)
    const loadMoreRef = useRef<HTMLDivElement>(null)

    const loadCats = async (cursor?: string) => {
        try {
            setIsLoading(true)
            const { cats: newCats, hasMore: more } = await getCats({
                cursor,
                keyword
            })

            if (cursor) {
                setCats(prev => [...prev, ...newCats])
            } else {
                setCats(newCats)
            }
            setHasMore(more)
        } catch (error) {
            toast.error("获取猫咪列表失败: " + (error as Error).message)
        } finally {
            setIsLoading(false)
        }
    }

    const handleSearch = (newKeyword: string) => setKeyword(newKeyword)

    const handleLoadMore = () => {
        if (isLoading || !hasMore) return
        const lastCat = cats[cats.length - 1]
        loadCats(lastCat.$id)
    }

    useInfiniteScroll(loadMoreRef, {
        onLoadMore: handleLoadMore,
        hasMore,
        isLoading
    })

    useEffect(() => {
        loadCats()
    }, [keyword])

    return (
        <div className="flex-1 overflow-hidden flex flex-col gap-y-4">
            <CatsHeader />
            <CatsSearch onSearch={handleSearch} isSearching={isLoading} />
            <ScrollArea className="px-4 flex-1">
                <CatsMaintainers />
                {!isLoading && <CatsList cats={cats} />}
                <ListEnd isLoading={isLoading} hasMore={hasMore} />
                <div
                    ref={loadMoreRef}
                    className="h-4 w-full"
                />
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    )
}

export default CatsPage
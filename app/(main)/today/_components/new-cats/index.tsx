"use client"

import { useEffect, useState } from "react"
// ui
import {
    ScrollArea,
    ScrollBar
} from "@/components/ui/scroll-area"
// components
import { NewCatsItem } from "./new-cats-item"
import { NewCatsItemSkeleton } from "./new-cats-item-skeleton"
// services
import { getNewCats } from "@/services/cats"
// utils
import { toast } from "sonner"
// types
import { CatDocument } from "@/types/cats"

export const NewCatsHeader: React.FC = () => {
    return (
        <header className="py-6">
            <h1 className="text-2xl font-black">新猫猫</h1>
            <p className="text-sm text-slate-500">最近7天新加入的猫咪</p>
        </header>
    );
};

const NewCats = () => {
    const [cats, setCats] = useState<CatDocument[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchNewCats = async () => {
            try {
                const newCats = await getNewCats(5)
                setCats(newCats)
            } catch (error) {
                toast.error((error as Error).message)
            } finally {
                setLoading(false)
            }
        }

        fetchNewCats()
    }, [])

    return (
        <div className="flex flex-col">
            <NewCatsHeader />
            <ScrollArea className="w-full">
                <ul className="flex items-center gap-x-3">
                    {loading ? (
                        Array.from({ length: 5 }).map((_, index) => (
                            <NewCatsItemSkeleton key={index} />
                        ))
                    ) : (
                        cats.map((cat) => (
                            <NewCatsItem
                                key={cat.$id}
                                id={cat.$id}
                                image={cat.avatarUrl}
                                name={cat.name}
                            />
                        ))
                    )}
                </ul>
                <ScrollBar
                    orientation="horizontal"
                    className="hidden"
                />
            </ScrollArea>
        </div>
    )
}

export default NewCats
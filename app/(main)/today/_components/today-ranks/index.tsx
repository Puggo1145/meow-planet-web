"use client"

import { useEffect, useState } from "react"
// components
import { TodayRanksHeader } from "./today-ranks-header"
import { TodayRanksItem } from "./today-ranks-item"
import { TodayRanksItemSkeleton } from "./today-ranks-item-skeleton"
// services
import { getTopRankedCats, RankedCat } from "@/services/cats"
// utils
import { toast } from "sonner"

const TodayRanks = () => {
    const [ranks, setRanks] = useState<RankedCat[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchRanks = async () => {
            try {
                const rankedCats = await getTopRankedCats(5)
                setRanks(rankedCats)
            } catch (error) {
                toast.error((error as Error).message)
            } finally {
                setLoading(false)
            }
        }

        fetchRanks()
    }, [])

    return (
        <section className="flex flex-col gap-y-2">
            <TodayRanksHeader />
            <ul className="flex flex-col">
                {loading ? (
                    Array.from({ length: 5 }).map((_, index) => (
                        <TodayRanksItemSkeleton key={index} />
                    ))
                ) : (
                    ranks.map((rank, index) => (
                        <TodayRanksItem
                            key={rank.$id}
                            rank={index + 1}
                            {...rank}
                        />
                    ))
                )}
            </ul>
        </section>
    )
}

export default TodayRanks
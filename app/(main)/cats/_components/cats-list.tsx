"use client"

import { useEffect, useState } from 'react'
// components
import {
    CatCard,
    CatCardImage,
    CatCardInfo,
    CatCardInfoName,
    CatCardInfoLikes
} from '../../_components/cat-card'
import { ListEnd } from "@/components/list-end"
// services
import { getCats } from "@/services/cats"
// types
import type { Cat } from "@/types/cats"

export const CatsList = () => {
    const [cats, setCats] = useState<Cat[]>([])

    useEffect(() => {
        const fetchCats = async () => {
            const cats = await getCats()
            setCats(cats)
        }

        fetchCats()
    }, [])
    return (
        <>
            <ul className="mt-4 w-fit grid grid-cols-5 gap-4">
                {cats.map((cat) => (
                    <CatCard key={cat.$id}>
                        <CatCardImage src={cat.avatarUrl ?? ""} />
                        <CatCardInfo>
                            <CatCardInfoName>{cat.name}</CatCardInfoName>
                            <CatCardInfoLikes likes={cat.likes} />
                        </CatCardInfo>
                    </CatCard>
                ))}
            </ul>
            <ListEnd />
        </>
    )
}

"use client"

import Link from 'next/link'
// components
import {
    CatCard,
    CatCardImage,
    CatCardInfo,
    CatCardInfoName,
    CatCardInfoLikes
} from '../../_components/cat-card'
// types
import type { CatDocument } from "@/types/cats"

interface CatsListProps {
    cats: CatDocument[]
    isLoading?: boolean
    hasMore?: boolean
}

export const CatsList = ({ cats, isLoading, hasMore }: CatsListProps) => {
    return (
        <>
            <ul className="mt-4 w-fit grid grid-cols-5 gap-4">
                {cats.map((cat) => (
                    <Link href={`/cats/${cat.$id}`} key={cat.$id}>
                        <CatCard>
                            <CatCardImage src={cat.avatarUrl ?? ""} />
                            <CatCardInfo>
                                <CatCardInfoName>{cat.name}</CatCardInfoName>
                                <CatCardInfoLikes likes={cat.likes} />
                            </CatCardInfo>
                        </CatCard>
                    </Link>
                ))}
            </ul>
        </>
    )
}

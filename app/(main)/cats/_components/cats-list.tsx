"use client"

import Link from 'next/link'
// components
import {
    CatCard,
    CatCardImage,
    CatCardInfo,
    CatCardInfoName,
    CatCardInfoNumbers,
    CatCardInfoLoveCount,
    CatCardInfoLikeCount
} from '../../_components/cat-card'
import { EmptyStatus } from '@/components/status/empty-status'
// types
import type { CatDocument } from "@/types/cats"

interface CatsListProps {
    cats: CatDocument[]
}

export const CatsList = ({ cats }: CatsListProps) => {
    if (cats.length === 0) {
        return <EmptyStatus title="猫咪好像都回家了" description="没有找到你想要的的猫咪" />
    }

    return (
        <>
            <ul className="mt-4 w-fit grid grid-cols-5 gap-4">
                {cats.map((cat) => (
                    <Link href={`/cats/${cat.$id}`} key={cat.$id}>
                        <CatCard>
                            <CatCardImage src={cat.avatarUrl ?? ""} />
                            <CatCardInfo>
                                <CatCardInfoName>
                                    {cat.name}
                                </CatCardInfoName>
                                <CatCardInfoNumbers>
                                    <CatCardInfoLoveCount loveCount={cat.lovedCount} />
                                    <CatCardInfoLikeCount likeCount={cat.likes} />
                                </CatCardInfoNumbers>
                            </CatCardInfo>
                        </CatCard>
                    </Link>
                ))}
            </ul>
        </>
    )
}

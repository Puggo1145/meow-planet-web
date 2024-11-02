import type { Document } from "@/types/common"

export type Gender = "male" | "female" | "unknown"

export interface Cat {
    name: string
    gender: Gender
    age?: number
    description: string
    avatarUrl: string | null
    likes: number
    createdBy: string
}
export type CatDocument = Document<Cat>

// 创建猫咪时的数据类型
export interface CreateCatData {
    name: string
    gender: Gender
    age?: number
    description: string
    avatarUrl: string
    createdBy: string
}

// 猫咪图片的数据类型
export interface CatImage {
    url: string
    catId: string
}
export type CatImageDocument = Document<CatImage>

// 创建猫咪图片的数据类型
export interface CreateCatImageData {
    url: string
    catId: string
}

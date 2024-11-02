import type { Models } from "appwrite"

export type Gender = "male" | "female" | "unknown"

export interface Cat extends Models.Document {
    name: string
    gender: Gender
    age?: string
    description: string
    avatarUrl: string | null
    likes: number
}

// 创建猫咪时的数据类型
export interface CreateCatData {
    name: string
    gender: Gender
    age?: number
    description: string
    avatarUrl: string
}

// 猫咪图片的数据类型
export interface CatImage extends Models.Document {
    url: string
    catId: string
}

// 创建猫咪图片的数据类型
export interface CreateCatImageData {
    url: string
    catId: string
}

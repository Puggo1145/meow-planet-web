import type { Document } from "@/types/common"

export type Gender = "male" | "female" | "unknown"

export interface Cat {
    name: string // 名字
    avatarUrl: string // 头像
    gender: Gender // 性别
    age?: number// 年龄
    character?: string // 性格
    notice?: string // 撸猫注意事项
    disease?: string[] // 病症
    sterilization?: boolean // 是否绝育
    description?: string // 补充描述
    lovedCount: number // 喜爱数
    likes: number // 点赞数
    createdBy: string // 创建者ID
}
export type CatDocument = Document<Cat>

// 创建猫咪时的数据类型
export interface CreateCatData {
    name: string
    gender: Gender
    age?: number
    character?: string
    notice?: string
    disease?: string[]
    sterilization?: boolean
    description?: string
    avatarUrl: string
    createdBy: string
}

// 猫咪图片的数据类型
export interface CatImage {
    url: string
    catId: string
    createdBy: string
}
export type CatImageDocument = Document<CatImage>

// 创建猫咪图片的数据类型
export interface CreateCatImageData {
    url: string
    catId: string
    createdBy: string
}

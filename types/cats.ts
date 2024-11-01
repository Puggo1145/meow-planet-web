export type Gender = "male" | "female" | "unknown"

export interface Cat {
    id: string
    name: string
    gender: Gender
    age?: string
    description: string
    avatarUrl: string | null
    likes: number
    createdAt: string
    updatedAt: string
}

export interface CatImage {
    id: string
    url: string
    catId: string
    createdAt: string
}

// 创建猫咪时的数据类型
export interface CreateCatData {
    name: string
    gender: Gender
    age?: number
    description: string
    avatarUrl: string
}

// 创建猫咪图片的数据类型
export interface CreateCatImageData {
    url: string
    catId: string
}

// API 响应的猫咪详情类型
export interface CatWithImages extends Cat {
    images: CatImage[]
}

import { databases } from "@/lib/appwrite"
import { DATABASES_IDS } from "@/lib/appwrite"
import { ID, Query } from "appwrite"
// types
import type { Document } from "@/types/common"
import type { CreateCatData, CreateCatImageData, Cat, CatImage } from "@/types/cats"

/**
 * @description 在图鉴内创建一只猫咪
 * @param data 猫咪数据
 * @returns 被创建的猫咪
 */
export const createCat = async (data: CreateCatData): Promise<Document<Cat>> => {
  try {
    const response = await databases.createDocument(
      DATABASES_IDS.MAIN,
      DATABASES_IDS.COLLECTIONS.CATS,
      ID.unique(),
      {
        name: data.name,
        gender: data.gender,
        age: data.age,
        description: data.description,
        avatarUrl: data.avatarUrl,
        likes: 0,
        createdBy: data.createdBy,
      }
    )

    return response as Document<Cat>
  } catch (error) {
    throw new Error("创建猫咪档案失败: " + (error as Error).message)
  }
}

/**
 * @description 批量创建猫咪图片
 * @param data 猫咪图片
 * @returns 猫咪图片
 */
export const createCatImages = async (data: CreateCatImageData[]): Promise<Document<CatImage>[]> => {
  try {
    const createPromises = data.map(image => 
      databases.createDocument(
        DATABASES_IDS.MAIN,
        DATABASES_IDS.COLLECTIONS.CAT_IMAGES,
        ID.unique(),
        {
          url: image.url,
          catId: image.catId,
        }
      )
    )

    const responses = await Promise.all(createPromises)

    return responses as Document<CatImage>[]
  } catch (error) {
    throw new Error("创建猫咪图片失败: " + (error as Error).message)
  }
}

/**
 * @description 获取猫咪图鉴内的所有猫咪
 * @returns 猫咪图鉴内的所有猫咪
 */
export const getCats = async (): Promise<Document<Cat>[]> => {
  try {
    const response = await databases.listDocuments(
      DATABASES_IDS.MAIN,
      DATABASES_IDS.COLLECTIONS.CATS
    )

    return response.documents as Document<Cat>[]
  } catch (error) {
    throw new Error("获取猫咪图鉴失败: " + (error as Error).message)
  }
}

/**
 * @description 获取猫咪图鉴内的猫咪数量
 * @returns 猫咪图鉴内的猫咪数量
 */
export const getCatsNumber = async (): Promise<number> => {
  try {
    const response = await databases.listDocuments(DATABASES_IDS.MAIN, DATABASES_IDS.COLLECTIONS.CATS)
    return response.total
  } catch (error) {
    throw new Error("获取猫咪图鉴数量失败: " + (error as Error).message)
  }
}

/**
 * @description 获取猫咪图鉴内的猫咪
 * @param id 猫咪的ID
 * @returns 猫咪
 */
export const getCatById = async (id: string): Promise<Document<Cat>> => {
  try {
    const response = await databases.getDocument(DATABASES_IDS.MAIN, DATABASES_IDS.COLLECTIONS.CATS, id)
    
    return response as Document<Cat>
  } catch (error) {
    throw new Error("获取猫咪失败: " + (error as Error).message)
  }
}

/**
 * @description 获取猫咪的图片
 * @param id 猫咪的ID
 * @returns 猫咪的图片
 */
export const getCatImages = async (id: string): Promise<Document<CatImage>[]> => {
  try {
    const response = await databases.listDocuments(DATABASES_IDS.MAIN, DATABASES_IDS.COLLECTIONS.CAT_IMAGES, [Query.equal("catId", id)])
    return response.documents as Document<CatImage>[]
  } catch (error) {
    throw new Error("获取猫咪图片失败: " + (error as Error).message)
  }
}

/**
 * @description 更新猫咪的点赞数
 * @param id 猫咪的ID
 * @param likes 点赞数
 * @returns 更新后的猫咪
 */
export const updateCatLikes = async (id: string, likes: number): Promise<Document<Cat>> => {
  try {
    const response = await databases.updateDocument(DATABASES_IDS.MAIN, DATABASES_IDS.COLLECTIONS.CATS, id, { likes })
    return response as Document<Cat>
  } catch (error) {
    throw new Error("更新猫咪点赞数失败: " + (error as Error).message)
  }
}

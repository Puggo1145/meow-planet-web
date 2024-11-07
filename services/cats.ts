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
      data
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

const CATS_PER_PAGE = 10

interface GetCatsOptions {
  cursor?: string
  limit?: number
  keyword?: string
}

/**
 * @description 获取猫咪图鉴内的所有猫咪
 * @returns 猫咪图鉴内的所有猫咪
 */
export const getCats = async ({ cursor, limit = CATS_PER_PAGE, keyword }: GetCatsOptions = {}): Promise<{
  cats: Document<Cat>[]
  hasMore: boolean
}> => {
  console.log(keyword);
  try {
    const queries = [Query.limit(limit)]
    if (cursor) {
      queries.push(Query.cursorAfter(cursor))
    }
    if (keyword) {
      queries.push(Query.contains("name", keyword))
    }

    const response = await databases.listDocuments(
      DATABASES_IDS.MAIN,
      DATABASES_IDS.COLLECTIONS.CATS,
      queries
    )

    return {
      cats: response.documents as Document<Cat>[],
      hasMore: response.documents.length === limit
    }
  } catch (error) {
    throw new Error("获取猫咪图鉴失败: " + (error as Error).message)
  }
}

/**
 * @description 获取猫咪图鉴内的猫咪数量
 * @returns 猫咪图鉴内的猫咪数量
 */
export const getCatsCount = async (): Promise<number> => {
  try {
    const response = await databases.listDocuments(DATABASES_IDS.MAIN, DATABASES_IDS.COLLECTIONS.CATS)
    return response.total
  } catch (error) {
    throw new Error("获取猫咪图鉴内的猫咪数量失败: " + (error as Error).message)
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
 * @param lovedCount 喜爱数
 * @returns 更新后的猫咪
 */
export const updateCatLovedCount = async (id: string, lovedCount: number): Promise<Document<Cat>> => {
  try {
    const response = await databases.updateDocument(DATABASES_IDS.MAIN, DATABASES_IDS.COLLECTIONS.CATS, id, { lovedCount })
    return response as Document<Cat>
  } catch (error) {
    throw new Error("更新猫咪点赞数失败: " + (error as Error).message)
  }
}

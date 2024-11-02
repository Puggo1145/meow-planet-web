import { databases } from "@/lib/appwrite"
import { DATABASES_IDS } from "@/lib/appwrite"
import { ID } from "appwrite"
import type { CreateCatData, CreateCatImageData, Cat, CatImage } from "@/types/cats"
import type { Document } from "@/types/common"

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

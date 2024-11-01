import { databases } from "@/lib/appwrite"
import { DATABASES_IDS } from "@/lib/appwrite"
import { ID } from "appwrite"
import type { CreateCatData, CreateCatImageData, Cat, CatImage } from "@/types/cats"

// 创建猫咪档案
export const createCat = async (data: CreateCatData): Promise<Cat> => {
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

    return {
      id: response.$id,
      name: response.name,
      gender: response.gender,
      age: response.age,
      description: response.description,
      avatarUrl: response.avatarUrl,
      likes: response.likes,
      createdAt: response.$createdAt,
      updatedAt: response.$updatedAt,
    }
  } catch (error) {
    throw new Error("创建猫咪档案失败: " + (error as Error).message)
  }
}

// 批量创建猫咪图片记录
export const createCatImages = async (data: CreateCatImageData[]): Promise<CatImage[]> => {
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

    return responses.map(response => ({
      id: response.$id,
      url: response.url,
      catId: response.catId,
      createdAt: response.$createdAt,
    }))
  } catch (error) {
    throw new Error("创建猫咪图片记录失败: " + (error as Error).message)
  }
} 
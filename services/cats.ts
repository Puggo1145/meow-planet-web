import { databases } from "@/lib/appwrite"
import { DATABASES_IDS } from "@/lib/appwrite"
import { ID, Query } from "appwrite"
// types
import type { 
  CreateCatData, 
  CreateCatImageData, 
  CatDocument,
  CatImageDocument 
} from "@/types/cats"

/**
 * @description 在图鉴内创建一只猫咪
 * @param data 猫咪数据
 * @returns 被创建的猫咪
 */
export const createCat = async (data: CreateCatData): Promise<CatDocument> => {
  try {
    const response = await databases.createDocument(
      DATABASES_IDS.MAIN,
      DATABASES_IDS.COLLECTIONS.CATS,
      ID.unique(),
      data
    )

    return response as CatDocument
  } catch (error) {
    throw new Error("创建猫咪档案失败: " + (error as Error).message)
  }
}

/**
 * @description 批量创建猫咪图片
 * @param data 猫咪图片
 * @returns 猫咪图片
 */
export const createCatImages = async (data: CreateCatImageData[]): Promise<CatImageDocument[]> => {
  try {
    const createPromises = data.map(image => 
      databases.createDocument(
        DATABASES_IDS.MAIN,
        DATABASES_IDS.COLLECTIONS.CAT_IMAGES,
        ID.unique(),
        image
      )
    )

    const responses = await Promise.all(createPromises)

    return responses as CatImageDocument[]
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
  cats: CatDocument[]
  hasMore: boolean
}> => {
  try {
    const queries = [
      Query.limit(limit),
      Query.select(['$id', 'name', 'likes', 'lovedCount', 'avatarUrl'])
    ]
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
      cats: response.documents as CatDocument[],
      hasMore: response.documents.length === limit
    }
  } catch (error) {
    throw new Error("获取猫咪图鉴失败: " + (error as Error).message)
  }
}

interface GetCatImagesOptions {
  cursor?: string
  limit?: number
}

export const getCatImageByTime = async (
  catId: string,
  { cursor, limit = 20 }: GetCatImagesOptions = {}
): Promise<{
  images: CatImageDocument[]
  hasMore: boolean
}> => {
  try {
    const queries = [
      Query.equal('catId', catId),
      Query.orderDesc('$createdAt'),
      Query.limit(limit)
    ]

    if (cursor) {
      queries.push(Query.cursorAfter(cursor))
    }

    const response = await databases.listDocuments(
      DATABASES_IDS.MAIN,
      DATABASES_IDS.COLLECTIONS.CAT_IMAGES,
      queries
    )

    return {
      images: response.documents as CatImageDocument[],
      hasMore: response.documents.length === limit
    }
  } catch (error) {
    throw new Error("获取猫咪照片失败: " + (error as Error).message)
  }
}

/**
 * @description 获取猫咪图鉴内的猫咪数量
 * @returns 猫咪图鉴内的猫咪数量
 */
export const getCatsCount = async (): Promise<number> => {
  try {
    const response = await databases.listDocuments(
      DATABASES_IDS.MAIN, 
      DATABASES_IDS.COLLECTIONS.CATS,
      [Query.select(['$id'])]
    )
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
export const getCatById = async (id: string): Promise<CatDocument> => {
  try {
    const response = await databases.getDocument(DATABASES_IDS.MAIN, DATABASES_IDS.COLLECTIONS.CATS, id)
    
    return response as CatDocument
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

/**
 * @description 获取猫咪的图片
 * @param id 猫咪的ID
 * @returns 猫咪的图片
 */
export const getCatImages = async (id: string): Promise<CatImageDocument[]> => {
  try {
    const response = await databases.listDocuments(DATABASES_IDS.MAIN, DATABASES_IDS.COLLECTIONS.CAT_IMAGES, [Query.equal("catId", id)])
    return response.documents as CatImageDocument[]
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
export const updateCatLovedCount = async (id: string, lovedCount: number): Promise<CatDocument> => {
  try {
    const response = await databases.updateDocument(DATABASES_IDS.MAIN, DATABASES_IDS.COLLECTIONS.CATS, id, { lovedCount })
    return response as CatDocument
  } catch (error) {
    throw new Error("更新猫咪点赞数失败: " + (error as Error).message)
  }
}

/**
 * @description 更新猫咪的点赞数
 * @param id 猫咪的ID
 * @param likes 点赞数
 * @returns 更新后的猫咪
 */
export const updateCatLikesCount = async (id: string, likes: number): Promise<CatDocument> => {
  try {
    const response = await databases.updateDocument(DATABASES_IDS.MAIN, DATABASES_IDS.COLLECTIONS.CATS, id, { likes })
    return response as CatDocument
  } catch (error) {
    throw new Error("更新猫咪点赞数失败: " + (error as Error).message)
  }
}

interface GetRecentCatsOptions {
  cursor?: string;
  limit?: number;
  catIds?: string[];
}

export const getRecentCats = async ({ cursor, limit = 10, catIds }: GetRecentCatsOptions = {}) => {
  try {
    const queries = [
      Query.orderDesc('$updatedAt'),
      Query.limit(limit),
      Query.select(['$id', 'name', 'likes', 'lovedCount', 'avatarUrl', '$updatedAt'])
    ];

    if (cursor) {
      queries.push(Query.cursorAfter(cursor));
    }

    if (catIds) {
      queries.push(Query.equal('$id', catIds));
    }

    const response = await databases.listDocuments(
      DATABASES_IDS.MAIN,
      DATABASES_IDS.COLLECTIONS.CATS,
      queries
    );

    // Get recent image counts for each cat
    const catsWithImageCounts = await Promise.all(
      response.documents.map(async (cat) => {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const imageResponse = await databases.listDocuments(
          DATABASES_IDS.MAIN,
          DATABASES_IDS.COLLECTIONS.CAT_IMAGES,
          [
            Query.equal('catId', cat.$id),
            Query.greaterThan('$createdAt', sevenDaysAgo.toISOString()),
            Query.select(['$id'])
          ]
        );

        return {
          ...cat as CatDocument,
          recentImageCount: imageResponse.total
        };
      })
    );

    return {
      cats: catsWithImageCounts,
      hasMore: response.documents.length === limit,
      lastId: response.documents[response.documents.length - 1]?.$id
    };
  } catch (error) {
    throw new Error("获取最近更新猫咪失败: " + (error as Error).message);
  }
};

export interface RankedCat {
  $id: string;
  name: string;
  avatarUrl: string;
  likes: number;
  lovedCount: number;
  hotValue: number;
}

export const getTopRankedCats = async (limit: number = 5): Promise<RankedCat[]> => {
  try {
    const response = await databases.listDocuments(
      DATABASES_IDS.MAIN,
      DATABASES_IDS.COLLECTIONS.CATS,
      [
        Query.select(['$id', 'name', 'likes', 'lovedCount', 'avatarUrl']),
        Query.limit(limit),
      ]
    );

    const rankedCats = response.documents.map(cat => ({
      ...cat as CatDocument,
      // Calculate hot value: likes count 3 point, loved counts 10 points
      hotValue: cat.likes * 3 + (cat.lovedCount * 10)
    }));

    // Sort by hot value in descending order
    return rankedCats.sort((a, b) => b.hotValue - a.hotValue);
  } catch (error) {
    throw new Error("获取排行榜失败: " + (error as Error).message);
  }
};

export const getNewCats = async (limit: number = 5): Promise<CatDocument[]> => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const response = await databases.listDocuments(
      DATABASES_IDS.MAIN,
      DATABASES_IDS.COLLECTIONS.CATS,
      [
        Query.select(['$id', 'name', 'avatarUrl', '$createdAt']),
        Query.greaterThan('$createdAt', sevenDaysAgo.toISOString()),
        Query.orderDesc('$createdAt'),
        Query.limit(limit),
      ]
    );

    return response.documents as CatDocument[];
  } catch (error) {
    throw new Error("获取新猫咪失败: " + (error as Error).message);
  }
};

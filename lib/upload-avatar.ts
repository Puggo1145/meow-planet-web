import { storage, BUCKETS_IDS } from './appwrite'
import { toast } from 'sonner'

export const uploadAvatar = async (file: File, userId: string) => {
  try {
    // 上传新头像
    const result = await storage.createFile(
      BUCKETS_IDS.AVATARS,
      userId + '-' + Date.now(), // 使用用户ID和当前时间戳作为文件ID
      file
    )

    // 获取头像的访问URL
    const avatarUrl = storage.getFileView(
      BUCKETS_IDS.AVATARS,
      result.$id
    )

    return avatarUrl
  } catch (error: any) {
    toast.error('上传头像失败', { description: error.message })
    throw new Error(error.message)
  }
} 
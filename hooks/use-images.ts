import { useState, useCallback } from "react"
import { storage } from "@/lib/appwrite"
import { toast } from "sonner"
import type { UploadedFile } from "@/types/common"

interface UseImagesOptions {
  maxCount?: number
  bucket: string
  onUploadSuccess?: (files: UploadedFile[]) => void
  onUploadError?: (error: Error) => void
}

export const useImages = ({
  maxCount = 9,
  bucket,
  onUploadSuccess,
  onUploadError
}: UseImagesOptions) => {
  const [images, setImages] = useState<File[]>([])
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [isUploading, setIsUploading] = useState(false)

  const handleImageSelect = useCallback((files: FileList | null) => {
    if (!files) return

    const newFiles = Array.from(files)
    
    // 验证文件类型
    const invalidFile = newFiles.find(file => !file.type.startsWith('image/'))
    if (invalidFile) {
      toast.error('格式错误，请上传图片文件')
      return
    }

    // 验证文件大小（10MB）
    const oversizeFile = newFiles.find(file => file.size > 10 * 1024 * 1024)
    if (oversizeFile) {
      toast.error('图片大小不能超过 10MB')
      return
    }

    // 验证总数量
    if (newFiles.length + images.length > maxCount) {
      toast.error(`最多只能上传 ${maxCount} 张图片`)
      return
    }

    setImages(prev => [...prev, ...newFiles])
  }, [images.length, maxCount])

  const removeImage = useCallback((index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
    // 处理选中索引
    if (index === selectedIndex) {
      setSelectedIndex(0)
    } else if (index < selectedIndex) {
      setSelectedIndex(prev => prev - 1)
    }
  }, [selectedIndex])

  const uploadImages = useCallback(async (): Promise<UploadedFile[]> => {
    if (images.length === 0) {
      throw new Error('请至少上传一张图片')
    }

    setIsUploading(true)
    
    try {
      const uploadPromises = images.map(async (file, index) => {
        const result = await storage.createFile(
          bucket,
          `${Date.now()}-${index}`,
          file
        )

        return {
          id: result.$id,
          url: storage.getFileView(bucket, result.$id),
        }
      })

      const uploadedFiles = await Promise.all(uploadPromises)
      onUploadSuccess?.(uploadedFiles)
      return uploadedFiles
    } catch (error) {
      const err = error as Error
      onUploadError?.(err)
      throw err
    } finally {
      setIsUploading(false)
    }
  }, [bucket, images, onUploadSuccess, onUploadError])

  return {
    images,
    selectedIndex,
    isUploading,
    setSelectedIndex,
    handleImageSelect,
    removeImage,
    uploadImages,
  }
} 
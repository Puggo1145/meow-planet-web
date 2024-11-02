import { Models } from "appwrite"

export interface UploadedFile {
  id: string
  url: string
}

// 映射 Appwrite 的 Document 类型，用于标注请求返回的文档类型
export type Document<T> = Models.Document & T

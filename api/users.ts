"use server"

import { users } from "@/lib/appwrite-server"
import { Query } from "node-appwrite"

interface Maintainer {
  id: string
  name: string
  email: string
  avatarUrl?: string
}

export const getCatMaintainers = async (): Promise<Maintainer[]> => {
  try {
    const maintainers = await users.list([Query.contains('labels', 'catMaintainer')])
    const formattedMaintainers = maintainers.users.map(user => ({
      id: user.$id,
      name: user.name,
      email: user.email,
      avatarUrl: user.prefs?.avatarUrl,
    }))

    return formattedMaintainers
  } catch (error) {
    throw new Error("获取管理员列表失败: " + (error as Error).message)
  }
}

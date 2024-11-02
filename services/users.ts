"use server"

import { createAdminClient } from "@/lib/appwrite-server"
import { Query } from "node-appwrite"

export interface Maintainer {
  $id: string
  name: string
  avatarUrl?: string
}

export const getCatMaintainers = async (): Promise<Maintainer[]> => {
  try {
    const { users } = await createAdminClient()
    const maintainers = await users.list([Query.contains('labels', 'catMaintainer')])
    const formattedMaintainers = maintainers.users.map(user => ({
      $id: user.$id,
      name: user.name,
      avatarUrl: user.prefs?.avatarUrl,
    }))

    return formattedMaintainers
  } catch (error) {
    throw new Error("获取管理员列表失败: " + (error as Error).message)
  }
}

export const getUserById = async (id: string) => {
  try {
    const { users } = await createAdminClient()
    return await users.get(id)
  } catch (error) {
    throw new Error("获取用户信息失败: " + (error as Error).message)
  }
}

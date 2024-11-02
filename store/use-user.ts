import { create } from 'zustand'
import { Models } from 'appwrite'
import { account } from '@/lib/appwrite'
import { uploadAvatar } from '@/lib/upload-avatar'
import { teams } from '@/lib/appwrite'

export type AuthStatus = "loading" | "authenticated" | "unauthenticated"

interface UserState {
  user: Models.User<Models.Preferences> | null
  status: AuthStatus
  teams: Models.Team<Models.Preferences>[] | null
  error: Error | null

  initialize: () => Promise<void>
  fetchUser: () => Promise<void>
  fetchTeams: () => Promise<void>
  setUser: (user: Models.User<Models.Preferences> | null) => void
  logout: () => Promise<void>
  updateAvatar: (file: File) => Promise<void>
  updateUserPrefs: (prefs: Partial<Models.Preferences>) => Promise<void>
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  teams: null,
  status: "loading",
  error: null,

  /**
   * @description 在应用初始化时获取用户信息
   */
  initialize: async () => {
    try {
      const user = await account.get()
      const teamsResponse = await teams.list()
      
      set({
        user,
        teams: teamsResponse.teams,
        status: "authenticated"
      })
    } catch (error) {
      set({
        user: null,
        teams: null,
        status: "unauthenticated",
        error: error as Error
      })
    }
  },

  /**
   * @description 获取用户信息，通常用于登录和注册认证后
   */
  fetchUser: async () => {
    try {
      set({ status: "loading", error: null })
      const user = await account.get()
      set({
        user,
        status: "authenticated"
      })
    } catch (error) {
      set({
        user: null,
        status: "unauthenticated",
        error: error as Error
      })
    }
  },

  /**
   * @description 设置用户信息
   */
  setUser: (user) => set({
    user,
    status: user ? "authenticated" : "unauthenticated"
  }),

  /**
   * @description 登出用户
   */
  logout: async () => {
    try {
      await account.deleteSession('current')
      set({
        user: null,
        status: "unauthenticated"
      })
    } catch (error) {
      set({ error: error as Error })
    }
  },

  /**
   * @description 更新用户头像
   */
  updateAvatar: async (file: File) => {
    try {
      const user = get().user
      if (!user) throw new Error('用户不存在')

      // 上传头像
      const avatarUrl = await uploadAvatar(file, user.$id)

      // 更新用户偏好设置中的头像URL
      await account.updatePrefs({
        ...user.prefs,
        avatarUrl
      })

      // 更新本地状态
      const updatedUser = await account.get()
      set({ user: updatedUser })
    } catch (error) {
      throw new Error('更新头像失败: ' + (error as Error).message)
    }
  },

  updateUserPrefs: async (prefs) => {
    try {
      const updatedPrefs = {
        ...get().user?.prefs,
        ...prefs
      }

      const response = await account.updatePrefs(updatedPrefs)

      set(state => ({
        user: state.user
          ? {
            ...state.user,
            prefs: response.prefs
          }
          : null
      }))
    } catch (error) {
      throw new Error("更新用户偏好失败: " + (error as Error).message)
    }
  },

  fetchTeams: async () => {
    try {
      const response = await teams.list()
      set({ teams: response.teams })
    } catch (error) {
      set({ error: error as Error })
    }
  }
}))

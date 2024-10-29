import { create } from 'zustand'
import { Account, Models } from 'appwrite'
import { client } from '@/lib/appwrite'

type AuthStatus = "loading" | "authenticated" | "unauthenticated"

interface UserState {
  user: Models.User<Models.Preferences> | null
  status: AuthStatus
  error: Error | null
  
  initialize: () => Promise<void>
  fetchUser: () => Promise<void>
  setUser: (user: Models.User<Models.Preferences> | null) => void
  logout: () => Promise<void>
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  status: "loading",
  error: null,

  /**
   * @description 在应用初始化时获取用户信息
   */
  initialize: async () => {
    try {
      const account = new Account(client)
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
   * @description 获取用户信息，通常用于登录和注册认证后
   */
  fetchUser: async () => {
    try {
      set({ status: "loading", error: null })
      const account = new Account(client)
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
      const account = new Account(client)
      await account.deleteSession('current')
      set({
        user: null,
        status: "unauthenticated" 
      })
    } catch (error) {
      set({ error: error as Error })
    }
  }
})) 
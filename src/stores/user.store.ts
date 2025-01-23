import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface UserInfo {
  id: string
  email: string
  name: string
  isAdmin: boolean
  team: {
    name: string
    plan_status: string
  }
  permissions: Array<{
    name: string
    module: string
  }>
}

interface UserState {
  userInfo: UserInfo | null
  setUserInfo: (userInfo: UserInfo) => void
  clearUserInfo: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userInfo: null,
      setUserInfo: (userInfo) => 
        set({ 
          userInfo, 
        }),
      clearUserInfo: () =>
        set({ 
          userInfo: null, 
        }),
    }),
    {
      name: 'user-storage'
    }
  )
)

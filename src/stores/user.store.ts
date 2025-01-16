import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserInfo {
  id: string
  email: string
  name: string
  permissions: object[]
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
      setUserInfo: userInfo =>
        set({ userInfo }),
      clearUserInfo: () =>
        set({ userInfo: null }),
    }),
    {
      name: 'user-storage'
    }
  )
)

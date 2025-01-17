import api from '@/app/api'
import { getToken } from '@/utils/storage'

export interface User {
  id: string
  email: string
  name: string
  permissions: object[]
}

export const getUserInfo = async (): Promise<User | null> => {
  try {
    if (!getToken()) {
      return null;
    }

    const { data } = await api.get<User>('/user/info');

    return data;
  } catch {
    return null;
  }
}
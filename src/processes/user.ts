import api from '@/app/api'

export interface User {
  id: string
  email: string
  name: string
  permissions: object[]
}

export const getUserInfo = async (): Promise<User | null> => {
  try {
    const { data } = await api.get<User>('/user/info');

    return data;
  } catch {
    return null;
  }
}
import api from '@/app/api'

interface LoginCredentials {
  email: string
  password: string
}

interface SignupCredentials extends LoginCredentials {
  name: string
}

interface User {
  id: string
  email: string
  name: string
}

interface AuthResponse {
  token: string
  user: User
}

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/auth/login', credentials)
    return data
};

export const signup = async (credentials: SignupCredentials): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/auth/signup', credentials)
    return data
};

export const resetPassword = async (email: string): Promise<void> => {
    await api.post('/auth/reset-password', { email })
};

export const verifyEmail = async (token: string): Promise<void> => {
    await api.post('/auth/verify-email', { token })
};

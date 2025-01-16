import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, signup, resetPassword, verifyEmail } from '@/processes/auth'
import { useAuthStore } from '@/stores/auth.store'

export const useAuth = () => {
  const navigate = useNavigate();
  const { setAuth, clearAuth } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setAuth(data.token)
      toast.success('Login successful!')
      navigate('/tasks')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Login failed')
    },
  });

  const signupMutation = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      setAuth(data.token)
      toast.success('Signup successful!')
      navigate('/login')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Signup failed')
    },
  })

  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success('Password reset email sent!');
      navigate('/login');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Password reset failed')
    },
  })

  const verifyEmailMutation = useMutation({
    mutationFn: verifyEmail,
    onSuccess: () => {
      toast.success('Email verified successfully!');
      navigate('/login');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Email verification failed')
    },
  })

  const logout = () => {
    clearAuth();
    toast.success('Logged out successfully');
    navigate('/login');
  }

  return {
    login: loginMutation.mutate,
    signup: signupMutation.mutate,
    resetPassword: resetPasswordMutation.mutate,
    verifyEmail: verifyEmailMutation.mutate,
    logout,
    isLoading: 
      loginMutation.isPending || 
      signupMutation.isPending || 
      resetPasswordMutation.isPending || 
      verifyEmailMutation.isPending,
  }
}
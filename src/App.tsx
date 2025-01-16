import { Navigate, Outlet } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getUserInfo } from '@/processes/user'

export const App = () => {
  const { data: userInfo, isLoading } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
    retry: false,
  })

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-primary">Loading...</div>
      </div>
    )
  }

  if (!userInfo) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="min-h-screen bg-purple-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  )
}

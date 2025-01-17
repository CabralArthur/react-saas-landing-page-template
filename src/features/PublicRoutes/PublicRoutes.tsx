import { Navigate, Outlet } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getUserInfo } from '@/processes/user'

export const PublicRoutes = () => {
    const { data: userInfo, isLoading } = useQuery({
        queryKey: ['userInfo'],
        queryFn: getUserInfo,
        retry: false,
        staleTime: Infinity
    })

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-primary">Loading...</div>
            </div>
        )
    }

    // If user is logged in, redirect to tasks
    if (userInfo) {
        return <Navigate to="/tasks" replace />
    }

    return <Outlet />
}

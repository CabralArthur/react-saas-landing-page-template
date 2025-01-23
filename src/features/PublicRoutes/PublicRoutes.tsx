import { Navigate, Outlet } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getUserInfo } from '@/processes/user'
import { Loader2 } from 'lucide-react'
import useIsLogged from '@/hooks/use-is-logged'

export default function PublicRoutes() {
    const { data: userInfo, isLoading } = useQuery({
        queryKey: ['userInfo'],
        queryFn: getUserInfo,
        retry: false,
        staleTime: Infinity
    })

    const isLogged = useIsLogged()

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="w-4 h-4 animate-spin" />
            </div>
        )
    }

    if (userInfo) {
        return <Navigate to="/home" replace />
    }

    if (isLogged) {
        return <Navigate to="/home" />
    }

    return <Outlet />
}

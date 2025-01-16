import { Navigate, Outlet } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getUserInfo } from '@/processes/user'
import { useUserStore } from '@/stores/user.store'
import { useEffect } from 'react'

export const RouteProtection = () => {
    const { userInfo, setUserInfo } = useUserStore()
    
    const { data, isLoading } = useQuery({
        queryKey: ['userInfo'],
        queryFn: getUserInfo,
        retry: false,
        staleTime: Infinity,
        refetchOnWindowFocus: false
    })

    useEffect(() => {
        if (data) {
            setUserInfo(data)
        }
    }, [data, setUserInfo])

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-primary">Loading...</div>
            </div>
        )
    }

    if (!data || !userInfo) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
} 
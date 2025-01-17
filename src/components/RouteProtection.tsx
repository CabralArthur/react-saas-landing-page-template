import { Navigate, Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '@/processes/user';
import { useUserStore } from '@/stores/user.store';
import { useEffect } from 'react';
import useIsLogged from '@/hooks/use-is-logged';

export const RouteProtection = () => {
    const isLogged = useIsLogged();
    const { setUserInfo } = useUserStore();
    
    const { data, isLoading } = useQuery({
        queryKey: ['userInfo'],
        queryFn: getUserInfo,
        retry: false
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

    return isLogged ? <Outlet /> : <Navigate to="/login" />
} 
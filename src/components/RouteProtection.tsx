import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '@/processes/user';
import { UserInfo, useUserStore } from '@/stores/user.store';
import { useEffect } from 'react';
import useIsLogged from '@/hooks/use-is-logged';
import { Loader2 } from 'lucide-react';

export const RouteProtection = () => {
    const isLogged = useIsLogged();
    const { setUserInfo } = useUserStore();
    const location = useLocation();
    
    const { data, isLoading } = useQuery({
        queryKey: ['userInfo'],
        queryFn: getUserInfo,
        retry: false
    })

    useEffect(() => {
        if (data) {
            setUserInfo(data as UserInfo)
        }
    }, [data, setUserInfo])

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="w-4 h-4 animate-spin" />
            </div>
        )
    }

    if (!isLogged) {
        return <Navigate to="/login" />
    }

    const status = data?.team?.plan_status;

    const isValidStatus = !status || (status === 'ACTIVE' || status === 'TRIAL');
    const isAdmin = data?.isAdmin;

    // Prevent non-admins from accessing team settings
    if (location.pathname.startsWith('/team/settings') && !isAdmin && !isValidStatus) {
        return <Navigate to="/contact-admin" />
    }

    // Allow access to these routes even with invalid status
    const allowedPaths = isAdmin 
        ? ['/team/settings', '/subscribe', '/contact-admin']
        : ['/subscribe', '/contact-admin'];
    const isAllowedPath = allowedPaths.some(path => location.pathname.startsWith(path));

    if (!isValidStatus && !isAllowedPath) {
        if (isAdmin) {
            return <Navigate to="/team/settings" />
        } else {
            return <Navigate to="/contact-admin" />
        }
    }

    return <Outlet />;
} 
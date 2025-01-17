import { Navigate, Outlet } from 'react-router-dom'
import { useUserStore } from '../stores/user.store'

export const ProtectedRoute = () => {
  const userInfo = useUserStore((state) => state.userInfo);

  if (!userInfo) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

import { useEffect } from 'react';
import { Outlet } from 'react-router-dom'
import usePublicRoutesContainer from './PublicRoutes.container';

export default function PublicRoutes() {
    const { validateToken } = usePublicRoutesContainer();

    useEffect(() => {
        validateToken();
    }, [validateToken]);

  return (
    <div>
      <Outlet />
    </div>
  )
};

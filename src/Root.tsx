import './index.css';
import { createRouter } from '@/app/router';
import { RouterProvider } from 'react-router-dom';

const Root = () => {
    const router = createRouter();

	return (
        <RouterProvider router={router} />
	);
};

export default Root;

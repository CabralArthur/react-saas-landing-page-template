import { useNavigate } from 'react-router-dom';

const PublicRoutesContainer = () => {
    const navigate = useNavigate();

    const validateToken = () => {
        const token = localStorage.getItem('token');

        if (token) {
            navigate('/tasks');
        }
    }

    return {
        validateToken
    };
}

export default PublicRoutesContainer;
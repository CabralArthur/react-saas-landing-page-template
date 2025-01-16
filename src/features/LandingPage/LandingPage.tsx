import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import NavBar from './components/NavBar';

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/auth.store'

export default function LandingPage() {
    const { isAuthenticated } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className='bg-white dark:text-white dark:bg-slate-900 sm:px-6 lg:px-8'>
            <NavBar/>
            <Hero />
            <Features/>
            <Pricing/>
            <Footer/>
        </div>
    );
}

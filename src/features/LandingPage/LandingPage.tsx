import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import NavBar from './components/NavBar';

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../../stores/user.store'

export default function LandingPage() {
    const userInfo = useUserStore((state) => state.userInfo);
    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo) {
            navigate('/tasks');
        }
    }, [userInfo, navigate]);

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

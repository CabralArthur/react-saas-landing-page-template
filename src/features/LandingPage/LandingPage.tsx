import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import NavBar from './components/NavBar';

export default function LandingPage() {
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

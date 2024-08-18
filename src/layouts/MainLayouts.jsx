import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import MaterialNavbar from '../components/navbar/MaterialNavbar';

const MainLayouts = () => {
    return (
        <>
            <nav className='fixed w-full z-50'>
                <MaterialNavbar />
            </nav>

            <section className='min-h-[calc(100vh-240px)]'>
                <Outlet />
            </section>

            <footer>
                <Footer />
            </footer>
        </>
    );
};

export default MainLayouts;
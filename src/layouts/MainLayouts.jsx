import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import App from '../App';
import MaterialNavbar from '../components/navbar/MaterialNavbar';

const MainLayouts = () => {
    return (
        <>
            <nav>
                {/* <Navbar /> */}
                <MaterialNavbar />
            </nav>

            <section className='min-h-[calc(100vh-240px)]'>
                <Outlet />
            </section>

            <footer>
                <Footer/>
            </footer>
        </>
    );
};

export default MainLayouts;
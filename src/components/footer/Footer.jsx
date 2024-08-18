import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <>
            <footer className="bg-outlet-accent/10 dark:bg-gray-900">
                <div className="w-11/12 flex flex-col items-center justify-between px-6 py-8 mx-auto lg:flex-row">
                    <div className='z-10 relative'>
                        <h2 className='font-robotoCondensed text-2xl font-bold text-outlet-secondary flex gap-1'><span className='text-white'>O</span><span>utlet</span></h2>
                        <img src="favicon.svg" className='w-7 absolute -top-0.5 -left-1.5 -z-10' alt="" />
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-4 mt-6 lg:gap-6 lg:mt-0">
                        <Link to={'/'} className="text-sm text-gray-600 transition-colors duration-300 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400">
                            All Products
                        </Link>

                        <Link to={'/login'} className="text-sm text-gray-600 transition-colors duration-300 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400">
                            Login
                        </Link>
                        <Link to={'/'} className="text-sm text-gray-600 transition-colors duration-300 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400">
                            About
                        </Link>

                        <Link to={'/'} className="text-sm text-gray-600 transition-colors duration-300 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400">
                            Contact
                        </Link>

                        <Link to={'/'} className="text-sm text-gray-600 transition-colors duration-300 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400">
                            FAQ
                        </Link>
                    </div>

                    <p className="mt-6 text-sm text-gray-500 lg:mt-0 dark:text-gray-400">© Copyright 2024 Outlet Inc. </p>
                </div>
            </footer>
        </>
    );
};

export default Footer;
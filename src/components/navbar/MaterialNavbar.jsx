import React, { useContext, useState, useEffect } from "react";
import {
    Navbar,
    Collapse,
    Button,
    IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import NavItem from "./NavItem";
import { AiFillProduct, AiOutlineProduct } from "react-icons/ai";
import { BiCart } from "react-icons/bi";
import { MdReviews } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { AuthContext } from "../../provider/AuthProvider";

const MaterialNavbar = () => {
    const [open, setOpen] = useState(false);
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleOpen = () => setOpen((cur) => !cur);

    const handleLogout = async () => {
        try {
            await logOut();
            toast.success('Successfully logged out!');
            navigate('/');
        } catch (err) {
            toast.error('Logout failed. Please try again.');
        }
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 960) {
                setOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <Navbar shadow={true} fullWidth className="border-0 bg-white/90 z-40 backdrop-blur-sm">
            <div className="lg:w-11/12 mx-auto flex items-center justify-between">
                <Link to={'/'} variant="filled" className="px-3 shadow-none hover:shadow-none py-1 bg-transparent">
                    <div className='z-10 relative'>
                        <h2 className='font-robotoCondensed text-2xl md:text-5xl font-bold text-outlet-secondary flex gap-1'>
                            <span className='text-white'>O</span><span>utlet</span>
                        </h2>
                        <img src="favicon.svg" className='w-7 md:w-12 absolute -top-0.5 md:-top-1 md:-left-2.5 -left-1.5 -z-10' alt="" />
                    </div>
                </Link>
                <ul className="ml-10 hidden items-center gap-6 lg:flex">
                    <NavItem link={() => document.getElementById('productSection').scrollIntoView({ behavior: 'smooth' })} icon={AiFillProduct} label="All Products" />
                    <NavItem link={() => document.getElementById('review').scrollIntoView({ behavior: 'smooth' })} icon={MdReviews} label="Review" />
                </ul>
                <div className="hidden items-center gap-5 lg:flex">
                    <Button variant="text" className="rounded-full px-3 border shadow-md py-3">
                        <BiCart className="text-3xl" />
                    </Button>
                    {user ? (
                        <>
                            <Button
                                variant="text"
                                className="rounded-full p-1"
                                title={user?.displayName || 'Profile'}
                            >
                                {user.photoURL ? (
                                    <Link to={'/user'}><img
                                        src={user?.photoURL}
                                        alt="User"
                                        className="w-12 h-12 shadow-md rounded-full object-cover"
                                    /></Link>
                                ) : (
                                    <UserCircleIcon className="text-3xl text-gray-700" />
                                )}
                            </Button>
                            <Button variant="gradient" color="amber" onClick={handleLogout}>Log out</Button>
                        </>
                    ) : (
                        <Link to={'/login'} className="bg-outlet-primary px-6 py-3 rounded-md font-bold uppercase hover:shadow-md text-black">
                            Log in
                        </Link>
                    )}
                </div>
                <IconButton
                    variant="text"
                    color="gray"
                    onClick={handleOpen}
                    className="ml-auto inline-block lg:hidden"
                >
                    {open ? (
                        <XMarkIcon strokeWidth={2} className="h-6 w-6" />
                    ) : (
                        <Bars3Icon strokeWidth={2} className="h-6 w-6" />
                    )}
                </IconButton>
            </div>
            <Collapse open={open}>
                <div className="container mx-auto mt-3 border-t border-blue-gray-50 px-2 pt-4">
                    <ul className="flex flex-col gap-4">
                        <NavItem link={() => document.getElementById('productSection').scrollIntoView({ behavior: 'smooth' })} icon={AiFillProduct} label="All Products" />
                        <NavItem link={() => document.getElementById('review').scrollIntoView({ behavior: 'smooth' })} icon={MdReviews} label="Review" />
                    </ul>
                    <div className="mt-6 mb-4 flex items-center gap-4">
                        <Button variant="text" className="rounded-full px-2 border shadow-md py-2">
                            <BiCart className="text-3xl" />
                        </Button>
                        {user ? (
                            <>
                                <Button
                                    variant="text"
                                    className="rounded-full p-1"
                                    title={user.displayName || 'Profile'}
                                >
                                    {user?.photoURL ? (
                                        <Link to={'/user'}><img
                                            src={user?.photoURL}
                                            alt="User"
                                            className="w-10 h-10 rounded-full object-cover"
                                        /></Link>
                                    ) : (
                                        <UserCircleIcon className="text-3xl text-gray-700" />
                                    )}
                                </Button>
                                <Button variant="gradient" color="amber" onClick={handleLogout}>Log out</Button>
                            </>
                        ) : (
                            <Button variant="gradient" color="amber">
                                <Link to='/login'>Log in</Link>
                            </Button>
                        )}
                    </div>
                </div>
            </Collapse>
        </Navbar>
    );
};

export default MaterialNavbar;
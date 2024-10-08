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
                        <h2 className='font-robotoCondensed text-2xl md:text-4xl font-bold text-outlet-secondary flex gap-1'>
                            <span className='text-white'>O</span><span>utlet</span>
                        </h2>
                        <img src="favicon.svg" className='w-7 md:w-9 absolute -top-0.5 md:-top-.5 md:-left-2 -left-1.5 -z-10' alt="" />
                    </div>
                </Link>
                <ul className="ml-10 hidden items-center gap-6 lg:flex">
                    <NavItem link={() => document.getElementById('productSection').scrollIntoView({ behavior: 'smooth' })} icon={AiFillProduct} label="All Products" />
                    <NavItem link={() => document.getElementById('review').scrollIntoView({ behavior: 'smooth' })} icon={MdReviews} label="Review" />
                </ul>
                <div className="hidden items-center gap-2 lg:flex">
                    <Button variant="text" className="rounded-full w-10 h-10 shadow-md flex items-center justify-center bg-outlet-primary/10 border border-outlet-accent p-1">
                        <span><BiCart className="text-xl text-outlet-primary " /></span>
                    </Button>
                    {user ? (
                        <>
                            <Button
                                variant="text"
                                className="rounded-full p-1"
                                title={user?.displayName || 'Profile'}
                            >
                                {user.photoURL ? (
                                    <Link to={'/user'} className="flex items-center justify-center w-10 h-10 rounded-full"><img
                                        src={user?.photoURL}
                                        alt="User"
                                        className="p-1 h-10 shadow-md rounded-full object-cover bg-outlet-primary/10 border border-outlet-accent"
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
                    <div className="mt-6 mb-4 flex items-center gap-2">
                        <div className="rounded-md border border-orange-400 p-1 border-l-0 rounded-l-none">
                        <Button variant="text" className="rounded-full w-10 h-10 shadow-md flex items-center justify-center bg-outlet-primary/10 border border-outlet-accent p-1">
                            <span><BiCart className="text-xl text-outlet-primary " /></span>
                        </Button>
                        </div>
                       <div className="rounded-md border border-orange-400 pr-1 border-r-0 rounded-r-none">
                       {user ? (
                            <>
                                <Button
                                    variant="text"
                                    className="rounded-full p-1"
                                    title={user.displayName || 'Profile'}
                                >
                                    {user?.photoURL ? (
                                        <Link to={'/user'} className="flex items-center justify-center w-10 h-10 rounded-full"><img
                                            src={user?.photoURL}
                                            alt="User"
                                            className="p-1 h-10 shadow-md rounded-full object-cover bg-outlet-primary/10 border border-outlet-accent"
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
                </div>
            </Collapse>
        </Navbar>
    );
};

export default MaterialNavbar;
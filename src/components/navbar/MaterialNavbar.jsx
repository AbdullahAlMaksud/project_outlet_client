import React, { useEffect } from "react";
import {
    Navbar,
    Collapse,
    Button,
    IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { RectangleStackIcon, UserCircleIcon, CommandLineIcon, Squares2X2Icon } from "@heroicons/react/24/solid";
import NavItem from "./NavItem";
import { FaProductHunt } from "react-icons/fa";
import { AiFillProduct, AiOutlineProduct } from "react-icons/ai";
import { BiCart } from "react-icons/bi";
import { MdReviews } from "react-icons/md";
import { Link } from "react-router-dom";

const MaterialNavbar = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen((cur) => !cur);
    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpen(false),
        );
    }, []);

    return (
        <Navbar shadow={true} fullWidth className="border-0 bg-white/10 fixed z-40 backdrop-blur-sm">

            <div className="container mx-auto flex items-center justify-between">
            <Link to={'/'} variant="filled" className="px-3 shadow-none hover:shadow-none py-1 bg-transparent">
                    <div className='z-10 relative'>
                        <h2 className='font-robotoCondensed text-2xl font-bold text-outlet-secondary flex gap-1'><span className='text-white'>O</span><span>utlet</span></h2>
                        <img src="favicon.svg" className='w-7 absolute -top-0.5 -left-1.5 -z-10' alt="" />
                    </div>
                </Link>
                
                <ul className="ml-10 hidden items-center gap-6 lg:flex">
                    <NavItem icon={AiFillProduct} label="All Products" />
                    <NavItem icon={UserCircleIcon} label="Account" />
                    <NavItem icon={MdReviews} label="Review" />
                </ul>
                <div className="hidden items-center gap-5 lg:flex">
                    <Button variant="text" className=" rounded-full px-0 py-0"><BiCart className="text-3xl"/></Button>
                    <Button variant="gradient" color="amber">Log in</Button>
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
                        <NavItem icon={AiFillProduct} label="Pages" />
                        <NavItem icon={UserCircleIcon} label="Account" />
                        <NavItem icon={MdReviews} label="Review" />
                    </ul>
                    <div className="mt-6 mb-4 flex items-center gap-4">
                    <Button variant="text" className=" rounded-full px-0 py-0"><BiCart className="text-3xl"/></Button>
                    <Button variant="gradient" color="amber">Log in</Button>
                    </div>
                </div>
            </Collapse>
        </Navbar>
    );
};

export default MaterialNavbar;

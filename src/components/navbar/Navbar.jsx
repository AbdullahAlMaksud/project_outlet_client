import { Button } from '@material-tailwind/react';
import React from 'react';
import { BiUser } from 'react-icons/bi';
import { IoMenuOutline } from 'react-icons/io5';
import { TbMenu } from 'react-icons/tb';

const Navbar = () => {
    return (
        <div className='h-14 w-full bg-white/10 shadow-md'>
            <div className='h-full flex justify-between items-center w-11/12 mx-auto'>


                <div>
                    <div className='z-10 relative'>
                        <h2 className='font-robotoCondensed text-2xl font-bold text-outlet-secondary flex gap-1'><span className='text-white'>O</span><span>utlet</span></h2>
                        <img src="favicon.svg" className='w-7 absolute -top-0.5 -left-1.5 -z-10' alt="" />
                    </div>
                </div>

                <div>
                    <div>
                        <Button className='px-1.5 py-1.5 bg-outlet-secondary'><BiUser className='text-text text-lg font-bold' /></Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
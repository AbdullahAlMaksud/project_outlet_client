import { Button, Card } from '@material-tailwind/react';
import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const ProductCard = ({ product }) => {

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5 ? true : false;
        const totalStars = halfStar ? fullStars + 1 : fullStars;

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <FaStar key={i} className="text-orange-500 text-xs" />
            );
        }

        if (halfStar) {
            stars.push(
                <FaStarHalfAlt key={fullStars} className="text-orange-500 text-xs" />
            );
        }
        for (let i = totalStars; i < 5; i++) {
            stars.push(
                <FaRegStar key={i} className="text-gray-500 text-xs" />
            );
        }

        return stars;
    };

    return (
        <Card className='rounded-md border hover:scale-105 duration-500 ease-out'>
            <div className='flex items-center justify-center w-full bg-gray-50 rounded-md'>
                <img src={product.image} className='h-32' alt="" />
            </div>
            <div className='px-2'>
                <div className='flex items-center  flex-col justify-center h-28 md:h-20 mt-4'>
                    <p className='text-[.5rem] md:text-xs text-center border border-red-500 text-red-600 px-2 rounded-md'>{product.brand}</p>
                    <h2 className='font-semibold font-poppins text-center'>{product.name}</h2>
                <div>
                    <p className='text-xs text-center'>{product.description}</p>
                </div>
                </div>
            </div>

            <div className='px-3 my-2 flex items-stretch justify-between'>
                <div className='flex flex-col justify-between'>
                    <div>
                        <p className=' w-fit text-[.5rem] md:text-xs text-center border bg-outlet-primary/40 text-outlet-secondary px-2 rounded-md'>{product.category}</p>
                    </div>
                    <div className="flex items-center">
                        <div className="flex space-x-1" title={`Rating: ${product.rating}`}>
                            {renderStars(product.rating)}
                        </div>
                    </div>
                </div>
                <div className='font-inter font-bold text-lg md:text-xl text-green-800'>৳ {product.price}</div>
            </div>
            <Button variant='gradient' color='deep-orange' className='font-normal font-poppins py-2 rounded-md'>Add to cart</Button>
        </Card>
    );
};

export default ProductCard;

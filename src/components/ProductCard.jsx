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
                <FaStar key={i} className="text-yellow-500" />
            );
        }

        if (halfStar) {
            stars.push(
                <FaStarHalfAlt key={fullStars} className="text-yellow-500" />
            );
        }
        for (let i = totalStars; i < 5; i++) {
            stars.push(
                <FaRegStar key={i} className="text-yellow-500" />
            );
        }

        return stars;
    };

    return (
        <div>
            <div className="flex max-w-md overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
                <div className="w-1/3 bg-cover">
                    <img src={product.image} className='h-full object-cover' alt="" />
                </div>

                <div className="w-2/3 p-4 md:p-4">
                    <h1 className="text-xl font-bold text-gray-800 dark:text-white">{product.name}</h1>

                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{product.description}</p>

                    <div className="flex mt-2 items-center">
                        <div className="flex space-x-1" title={`Rating: ${product.rating}`}>
                            {renderStars(product.rating)}
                        </div>
                    </div>

                    <div className="flex justify-between mt-3 items-center">
                        <h1 className="text-lg font-bold text-gray-700 dark:text-gray-200 md:text-xl">৳ {product.price}</h1>
                        <button className="px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;

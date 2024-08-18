import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div>
            <div className="flex max-w-md overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
                <div className="w-1/3 bg-cover">
                <img src={product.image} className='h-full object-cover' alt="" /></div>

                <div className="w-2/3 p-4 md:p-4">
                    <h1 className="text-xl font-bold text-gray-800 dark:text-white">{product.name}</h1>

                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{product.description}</p>

                    <div className="flex mt-2 item-center">
                      {product.rating}
                    </div>

                    <div className="flex justify-between mt-3 item-center">
                        <h1 className="text-lg font-bold text-gray-700 dark:text-gray-200 md:text-xl">৳ {product.price}</h1>
                        <button className="px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
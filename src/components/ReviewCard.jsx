import React from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const ReviewCard = ({ review }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 m-4 max-w-sm z-0 relative">
            <div className="flex items-center mb-4">
                <img
                    src={review.profileImage}
                    alt={`${review.name}'s profile`}
                    className="w-14 h-14 rounded-full mr-4"
                />
                <div>
                    <h3 className="text-lg font-semibold">{review.name}</h3>
                    <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className={i < review.rating ? '' : 'text-gray-300'} />
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex items-start z-0">
                <FaQuoteLeft className="text-gray-300 text-7xl mr-2 absolute -z-10 rotate-180 right-5 top-10" />
                <p className="text-gray-700 text-sm italic">{review.review}</p>
            </div>
        </div>
    );
};

export default ReviewCard;
import React, { useState, useEffect } from 'react';
// import SectionHeading from '../../components/SectionHeading';
import ReviewCard from '../../components/ReviewCard';
import reviews from '../../../public/data/customerReview.json';
import Marquee from 'react-fast-marquee';

const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
};
const ReviewSection = () => {
    const [shuffledReviews, setShuffledReviews] = useState([]);
    useEffect(() => {
        setShuffledReviews(shuffleArray([...reviews]));
    }, [reviews]);

    return (
        <div id='review' className="bg-no-repeat pb-8 mt-12">
            <h2 className='text-3xl font-bold text-center mb-7 text-outlet-secondary font-poppins'>Customer Review</h2>
            <div >
                <div className="w-11/12 mx-auto">
                <Marquee pauseOnHover={true} speed={30}>
   
                    <div className="flex flex-wrap justify-center">
                        {shuffledReviews.map((review) => ( 
                            <ReviewCard key={review.id} review={review} />
                        ))}
                    </div>
                        </Marquee>
                </div>
            </div>

        </div>
    );
};

export default ReviewSection;

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import ReviewCard from '../../components/ReviewCard';
import Marquee from 'react-fast-marquee';
import SectionHeading from '../../components/SectionHeading';

const fetchReviews = async () => {
  const response = await fetch(`${import.meta.env.VITE_SERVER}/reviewData`); // Replace with your API endpoint
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const ReviewSection = () => {
  const { data: reviews = [], isLoading, isError } = useQuery({
    queryKey: ['reviews'],
    queryFn: fetchReviews,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading reviews</div>;

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
  const shuffledReviews = shuffleArray([...reviews]);

  return (
    <div id='review' className="bg-no-repeat pb-8 mt-12">
<SectionHeading Heading={'Customer Reviews'}/>
      <div>
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

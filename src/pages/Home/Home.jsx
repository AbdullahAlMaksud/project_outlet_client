import React from 'react';
import HeroSection from './HeroSection';
import ProductSection from './ProductSection';
import ReviewSection from './ReviewSection';
import CustomerReviews from './ReviewSection';

const Home = () => {
    return (
        <div>
            <section>
            <HeroSection/>
            </section>
            <section className='mt-20'>
            <ProductSection/>
            </section>
            <CustomerReviews/>
        </div>
    );
};

export default Home;
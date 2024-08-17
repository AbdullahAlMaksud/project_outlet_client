import React from 'react';
import HeroSection from './HeroSection';
import ProductSection from './ProductSection';
import ReviewSection from './ReviewSection';

const Home = () => {
    return (
        <div>
            <section>
            <HeroSection/>
            </section>
            <section className='mt-20'>
            <ProductSection/>
            </section>
            <ReviewSection/>
        </div>
    );
};

export default Home;
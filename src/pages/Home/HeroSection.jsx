import React from "react";
import { useQuery } from '@tanstack/react-query';
import {
    Button,
} from "@material-tailwind/react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { BsArrowUpRight } from 'react-icons/bs';

// Fetch banner data from API
const fetchBannerData = async () => {
    const response = await fetch(`${import.meta.env.VITE_SERVER}/bannerData`); // Replace with your API endpoint
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

const HeroSection = () => {
    const { data: bannerData = [], isLoading, isError } = useQuery({
        queryKey: ['bannerData'],
        queryFn: fetchBannerData,
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading banner data</div>;

    return (
        <div>
            <Swiper className="mySwiper"
                autoplay={{
                    delay: 5500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    dynamicBullets: true,
                    clickable: true,
                }}
                modules={[Pagination, Autoplay, Navigation]}
            >
                {
                    bannerData.map((data, idx) =>
                        <SwiperSlide key={idx}
                            style={{
                                background: `url(${data.backgroundImage}) no-repeat`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                width: '100%',
                                height: '100%',
                            }}
                        >
                            <div className='flex font-sans gap-3 w-11/12 mx-auto justify-center h-96 md:h-[400px] lg:min-h-[650px] items-center pt-16'>
                                <div className='backdrop-blur-sm  flex flex-col items-center lg:w-4/6 w-11/12 md:py-10 md:px-10 p-5 rounded-xl text-center border border-border shadow-md max-w-'>
                                    <h2 className='text-xl text-outlet-secondary lg:text-4xl font-bold'>{data.headline}</h2>
                                    <h2 className='lg:text-xl hidden md:flex text-xs mt-2 text-outlet-primary '>{data.subheadline}</h2>
                                    <Button onClick={() => document.getElementById('productSection').scrollIntoView({ behavior: 'smooth' })} className='w-fit bg-outlet-primary/80 mt-4 flex items-center gap-2 font-semibold'>{data.ctaButton} <BsArrowUpRight className='font-bold' /></Button>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                }
            </Swiper>
        </div>
    );
};

export default HeroSection;

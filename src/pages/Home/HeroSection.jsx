import React from "react";
import {
    Button,
} from "@material-tailwind/react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import bannerData from '../../../public/data/banner-data.json'
import { BsArrowUpRight } from 'react-icons/bs';


const HeroSection = () => {
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
                            <div className='flex font-sans gap-3 w-11/12 mx-auto justify-center min-h-[650px] items-center pt-16'>
                                <div className='backdrop-blur-sm flex flex-col items-center lg:w-4/6 w-11/12 py-10 rounded-xl text-center border border-border shadow-md'>
                                    <h2 className='lg:text-4xl font-bold'>{data.headline}</h2>
                                    <h2 className='lg:text-xl text-xs mt-2 '>{data.subheadline}</h2>
                                    <Button onClick={() => document.getElementById('productShowcase').scrollIntoView({ behavior: 'smooth' })} className='w-fit text-md  bg-primary mt-4 flex items-center gap-2 font-semibold'>{data.ctaButton} <BsArrowUpRight className='font-bold' /></Button>
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
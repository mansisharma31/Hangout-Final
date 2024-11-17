import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';                // Core Swiper CSS
import 'swiper/css/navigation';     // Navigation CSS
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
//import 'swiper/swiper-bundle.min.css';
import Card from '../Components/Card';
import mumbai1 from "../Assets/Images/mumbai1.jpg";
import cat from "../Assets/Images/cat.jpg";
import mumbai2 from "../Assets/Images/mumbai2.jpg";
import mumbai3 from "../Assets/Images/mumbai3.avif";
import mumbai4 from "../Assets/Images/mumbai4.jpg";
import Navbar from '../Components/Navbar';


export const Mumbai = () => {
    const mumbai = [
        {
          image: mumbai1,
          title: 'BhaijaanZ Restaurant | A Salman Khan themed Restaurant',
          locations: ['White Rose Building, Mumbai, Maharasthra'],
          price: '500 for two(approx.)',
          rating: 4,
          reviews: 40
        },
        {
          image: cat,
          title: 'Cat Cafe Studio | Time Spent with Cats is Never Wasted ',
          locations: ['Andheri West, Mumbai'],
          price: '500 for two(approx.)',
          rating: 4.9,
          reviews: 227
        },
        {
          image: mumbai2,
          title: 'Mumbai City Tour | Experience Best places in Mumbai',
          locations: ['Gateway of India'],
          price: '6000 for two',
          rating: 4,
          reviews: 32
        },
        {
            image: mumbai3,
            title: 'Sunburn Arena Ft. Alan Walker - Mumbai',
            locations: ['R2 Grounds, MMRDA, Mumbia'],
            price: '2500 - 11800',
            rating: 'NA',
            reviews: 0
          },
        {
            image: mumbai4,
            title: 'Imagica Theme & Water Park | Feel the adrenaline rush',
            locations: ['Devnhave, Mumbai'],
            price: '664 - 2477',
            rating: '4.6',
            reviews: 125
          },
        ];
  return (
    <div>
        <Navbar />
    <div className="mt-20 ml-20 mr-20 p-3 bg-[#ebe7de] border-white shadow-md rounded-lg overflow-hidden">
      <h1 className="text-2xl font-bold mb-4">Mumbai</h1>
      <Swiper spaceBetween={20}        
        slidesPerView={3}        
        navigation={true}             
        loop={true}
        pagination={{ clickable: true }} 
        modules={[Navigation, Pagination]}
        >
        {mumbai.map((tour, index) => (
          <SwiperSlide key={index}>
            <Card {...tour} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    </div>
  )
}

export default Mumbai;



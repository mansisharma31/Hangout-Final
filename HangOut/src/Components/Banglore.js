import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';                // Core Swiper CSS
import 'swiper/css/navigation';     // Navigation CSS
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
//import 'swiper/swiper-bundle.min.css';
import Card from '../Components/Card';
import gufa from "../Assets/Images/gufha.webp";
import dyu from "../Assets/Images/dyu.webp";
import bang1 from "../Assets/Images/bang1.jpg";
import bang2 from "../Assets/Images/bang2.jpg";
import bang3 from "../Assets/Images/bang3.webp";
import Navbar from '../Components/Navbar';

export const Banglore = () => {
    const banglore = [
        {
          image: gufa,
          title: 'Gufha Restuarant | Culinary adventure in a Cave',
          locations: ['New Diagonal Rd, 4th Block, Jayanagar, Bengaluru'],
          price: '501 - 801',
          rating: 4,
          reviews: 40
        },
        {
          image: dyu,
          title: 'Dyu Art Cafe | Perfect Blend of Good Food and Great Art ',
          locations: ['Koramangala 8th Block, Adugodi, Bengaluru, Karnataka 560030'],
          price: '850 for two',
          rating: 4.2,
          reviews: 113
        },
        {
          image: bang1,
          title: 'Wonderla Amusement Park | Feel the adrenaline rush',
          locations: ['Wonderla Amusement Park, Bengaluru, 28th km, Mysore Rd, Bengaluru'],
          price: 1469,
          rating: 4.6,
          reviews: 220
        },
        {
            image: bang2,
            title: 'Skandagiri Trek | Witness an enchanting sunrise',
            locations: ['Jadalathimmanahalli, Karnataka 562103, India'],
            price: '1000 - 2000',
            rating: '4.6',
            reviews: 51
          },
        {
            image: bang3,
            title: ' Karan Aujla - It Was All A Dream',
            locations: ['To be announced soon'],
            price: '3999 - 14999',
            rating: 'NA',
            reviews: 0
          },
        ];
  return (
    <div>
        <Navbar />
    <div className="mt-20 ml-20 mr-20 p-3 bg-[#ebe7de] border-white shadow-md rounded-lg overflow-hidden">
      <h1 className="text-2xl font-bold mb-4">Banglore</h1>
      <Swiper spaceBetween={20}       
        slidesPerView={3}      
        navigation={true}          
        loop={true}
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        >
        {banglore.map((tour, index) => (
          <SwiperSlide key={index}>
            <Card {...tour} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    </div>
  )
}

export default Banglore;



import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';                
import 'swiper/css/navigation';     
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import Card from '../Components/Card';
import runway from "../Assets/Images/runway.jpg";
import orient from "../Assets/Images/orient.jpg";
import trip from "../Assets/Images/delhi1.jpg";
import eod from "../Assets/Images/eod.jpg";
import bash from "../Assets/Images/diwali.avif";
import Navbar from '../Components/Navbar';


export const Delhi = () => {
    const delhi = [
        {
          image: runway,
          title: 'Runway1 | Airplane converted into a Dining Room',
          locations: ['Adventure Island, Metrowalk mall'],
          price: '1000 for two(approx.)',
          rating: 4,
          reviews: 40
        },
        {
          image: orient,
          title: 'Orient Express |  Inspired by a Train which ran from Paris to Istanbul ',
          locations: ['Sardar Patel Marg'],
          price: '2000 for two(approx.)',
          rating: 4.9,
          reviews: 227
        },
        {
          image: trip,
          //days: 8,
          //nights: 7,
          title: 'Delhi Darshan Trip | Full Tour of City',
          locations: ['Karol Bagh', 'Paharganj', 'Connaught Place', ' R.K. Ashram Metro Station', 'New Delhi Railway Station'],
          price: '300 - 350',
          rating: 4,
          reviews: 32
        },
        {
            image: eod,
            title: 'E-O-D Adventure Park | End of Day Combos',
            locations: ['Mayur Vihar'],
            price: '300 - 750',
            rating: 4.2,
            reviews: 32
          },
        {
            image: bash,
            title: 'Diwali Bash ft. Parmish Verma and Sunanda Sharma',
            locations: ['World Street by Omaxe'],
            price: '799 - 3499',
            rating: 'NA',
            reviews: 0
          },
      ];
  return (
    <div>
        <Navbar />
    <div className="mt-20 ml-20 mr-20 p-3 bg-[#ebe7de] border-white shadow-md rounded-lg overflow-hidden">
      <h1 className="text-2xl font-bold mb-4">Delhi</h1>
      <Swiper spaceBetween={20}       
        slidesPerView={3}        
        navigation={true}              
        loop={true}
        pagination={{ clickable: true }} 
        modules={[Navigation, Pagination]}
        >
        {delhi.map((tour, index) => (
          <SwiperSlide key={index}>
            <Card {...tour} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    </div>
  )
}

export default Delhi;



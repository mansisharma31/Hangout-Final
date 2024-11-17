import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';                // Core Swiper CSS
import './CardCarousel.css';                // Core Swiper CSS
import 'swiper/css/navigation';     // Navigation CSS
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
//import 'swiper/swiper-bundle.min.css';
import Card from '../Components/Card';
// import runway from "../Assets/Images/runway.jpg";
// import orient from "../Assets/Images/orient.jpg";
// import trip from "../Assets/Images/delhi1.jpg";
// import eod from "../Assets/Images/eod.jpg";
// import bash from "../Assets/Images/diwali.avif";
// import mumbai1 from "../Assets/Images/mumbai1.jpg";
// import cat from "../Assets/Images/cat.jpg";
// import mumbai2 from "../Assets/Images/mumbai2.jpg";
// import mumbai3 from "../Assets/Images/mumbai3.avif";
// import mumbai4 from "../Assets/Images/mumbai4.jpg";
// import gufa from "../Assets/Images/gufha.webp";
// import dyu from "../Assets/Images/dyu.webp";
// import bang1 from "../Assets/Images/bang1.jpg";
// import bang2 from "../Assets/Images/bang2.jpg";
// import bang3 from "../Assets/Images/bang3.webp";
import {cafesDataArray} from "../utils/data2.js";
import {eventsArray} from "../utils/data2.js";
import {tripsArray} from "../utils/data2.js";
import {adventuresArray} from "../utils/data2.js";

const CardCarousel = () => {
  // const delhi = [
  //   {
  //     image: runway,
  //     title: 'Runway1 | Airplane converted into a Dining Room',
  //     locations: ['Adventure Island, Metrowalk mall'],
  //     price: '1000 for two(approx.)',
  //     rating: 4,
  //     reviews: 40
  //   },
  //   {
  //     image: orient,
  //     title: 'Orient Express |  Inspired by a Train which ran from Paris to Istanbul ',
  //     locations: ['Sardar Patel Marg'],
  //     price: '2000 for two(approx.)',
  //     rating: 4.9,
  //     reviews: 227
  //   },
  //   {
  //     image: trip,
  //     //days: 8,
  //     //nights: 7,
  //     title: 'Delhi Darshan Trip | Full Tour of City',
  //     locations: ['Karol Bagh', 'Paharganj', 'Connaught Place', ' R.K. Ashram Metro Station', 'New Delhi Railway Station'],
  //     price: '300 - 350',
  //     rating: 4,
  //     reviews: 32
  //   },
  //   {
  //       image: eod,
  //       title: 'E-O-D Adventure Park | End of Day Combos',
  //       locations: ['Mayur Vihar'],
  //       price: '300 - 750',
  //       rating: 4.2,
  //       reviews: 32
  //     },
  //   {
  //       image: bash,
  //       title: 'Diwali Bash ft. Parmish Verma and Sunanda Sharma',
  //       locations: ['World Street by Omaxe'],
  //       price: '799 - 3499',
  //       rating: 'NA',
  //       reviews: 0
  //     },
  // ];

  // const mumbai = [
  //   {
  //     image: mumbai1,
  //     title: 'BhaijaanZ Restaurant | A Salman Khan themed Restaurant',
  //     locations: ['White Rose Building, Mumbai, Maharasthra'],
  //     price: '500 for two(approx.)',
  //     rating: 4,
  //     reviews: 40
  //   },
  //   {
  //     image: cat,
  //     title: 'Cat Cafe Studio | Time Spent with Cats is Never Wasted ',
  //     locations: ['Andheri West, Mumbai'],
  //     price: '500 for two(approx.)',
  //     rating: 4.9,
  //     reviews: 227
  //   },
  //   {
  //     image: mumbai2,
  //     title: 'Mumbai City Tour | Experience Best places in Mumbai',
  //     locations: ['Gateway of India'],
  //     price: '6000 for two',
  //     rating: 4,
  //     reviews: 32
  //   },
  //   {
  //       image: mumbai3,
  //       title: 'Sunburn Arena Ft. Alan Walker - Mumbai',
  //       locations: ['R2 Grounds, MMRDA, Mumbia'],
  //       price: '2500 - 11800',
  //       rating: 'NA',
  //       reviews: 0
  //     },
  //   {
  //       image: mumbai4,
  //       title: 'Imagica Theme & Water Park | Feel the adrenaline rush',
  //       locations: ['Devnhave, Mumbai'],
  //       price: '664 - 2477',
  //       rating: '4.6',
  //       reviews: 125
  //     },
  //   ];

  // const banglore = [
  //   {
  //     image: gufa,
  //     title: 'Gufha Restuarant | Culinary adventure in a Cave',
  //     locations: ['New Diagonal Rd, 4th Block, Jayanagar, Bengaluru'],
  //     price: '501 - 801',
  //     rating: 4,
  //     reviews: 40
  //   },
  //   {
  //     image: dyu,
  //     title: 'Dyu Art Cafe | Perfect Blend of Good Food and Great Art ',
  //     locations: ['Koramangala 8th Block, Adugodi, Bengaluru, Karnataka 560030'],
  //     price: '850 for two',
  //     rating: 4.2,
  //     reviews: 113
  //   },
  //   {
  //     image: bang1,
  //     title: 'Wonderla Amusement Park | Feel the adrenaline rush',
  //     locations: ['Wonderla Amusement Park, Bengaluru, 28th km, Mysore Rd, Bengaluru'],
  //     price: 1469,
  //     rating: 4.6,
  //     reviews: 220
  //   },
  //   {
  //       image: bang2,
  //       title: 'Skandagiri Trek | Witness an enchanting sunrise',
  //       locations: ['Jadalathimmanahalli, Karnataka 562103, India'],
  //       price: '1000 - 2000',
  //       rating: '4.6',
  //       reviews: 51
  //     },
  //   {
  //       image: bang3,
  //       title: ' Karan Aujla - It Was All A Dream',
  //       locations: ['To be announced soon'],
  //       price: '3999 - 14999',
  //       rating: 'NA',
  //       reviews: 0
  //     },
  //   ];

  return (
    <div>
    {/* <div className="mt-8 ml-20 mr-20 p-2 bg-white border-white shadow-md rounded-lg overflow-hidden">
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

    <div className="mt-20 ml-20 mr-20 p-2 bg-white border-white shadow-md rounded-lg overflow-hidden">
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

    <div className="mt-20 ml-20 mr-20 p-2 bg-white border-white shadow-md rounded-lg overflow-hidden">
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
    </div> */}
    <div id='dining' className="mt-20 ml-20 mr-20 p-3 bg-[#ebe7de] border-white shadow-md rounded-lg overflow-hidden hidden lg:block">
      <h1 className="text-2xl font-bold mb-4">Cafes and Restaurants</h1>
      <Swiper spaceBetween={20}       
        slidesPerView={3}      
        navigation={true}          
        loop={true}
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        className='my-swiper '
        >
        {cafesDataArray.map((tour, index) => (
          <SwiperSlide key={index}>
            <Card {...tour} />
          </SwiperSlide>
        ))}
        <div className='h-10'></div>
      </Swiper>
    </div>
    <div id='dining' className="mt-8 ml-3 mr-3 p-3 bg-[#ebe7de] border-white shadow-md rounded-lg overflow-hidden flex lg:hidden">
      <Swiper spaceBetween={20}       
        slidesPerView={1}      
        navigation={true}          
        loop={true}
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        className='my-swiper'
        >
        {cafesDataArray.map((tour, index) => (
          <SwiperSlide key={index}>
            <Card {...tour} />
          </SwiperSlide>
        ))}
        <div className='h-10'></div>
      </Swiper>
    </div>
    <div id='events' className="mt-20 ml-20 mr-20 p-3 bg-[#ebe7de] border-white shadow-md rounded-lg overflow-hidden">
      <h1 className="text-2xl font-bold mb-4 text-[#000]">Events and Concerts</h1>
      <Swiper spaceBetween={20}       
        slidesPerView={3}      
        navigation={true}          
        loop={true}
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        className='my-swiper'
        >
        {eventsArray.map((tour, index) => (
          <SwiperSlide key={index}>
            <Card {...tour} />
          </SwiperSlide>
        ))}
        <div className='h-10'></div>
      </Swiper>
    </div>
    <div id='activities' className="mt-20 ml-20 mr-20 p-3 bg-[#ebe7de] border-white shadow-md rounded-lg overflow-hidden">
      <h1 className="text-2xl font-bold mb-4">Activities and Trips</h1>
      <Swiper spaceBetween={20}       
        slidesPerView={3}      
        navigation={true}          
        loop={true}
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        className='my-swiper'
        >
        {tripsArray.map((tour, index) => (
          <SwiperSlide key={index}>
            <Card {...tour} />
          </SwiperSlide>
        ))}
        <div className='h-10'></div>
      </Swiper>
    </div>
    <div id='attractions' className="mt-20 ml-20 mr-20 p-3 bg-[#ebe7de] border-white shadow-md rounded-lg overflow-hidden">
      <h1 className="text-2xl font-bold mb-4">Attractions</h1>
      <Swiper spaceBetween={20}       
        slidesPerView={3}      
        navigation={true}          
        loop={true}
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        className='my-swiper'
        >
        {adventuresArray.map((tour, index) => (
          <SwiperSlide key={index}>
            <Card {...tour} />
          </SwiperSlide>
        ))}
        <div className='h-10'></div>
      </Swiper>
    </div>
    </div>
  );
}; 

export default CardCarousel;

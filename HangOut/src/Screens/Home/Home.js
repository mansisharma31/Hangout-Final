// import React, { Component } from 'react'
// import Navbar from '../../Components/Navbar';
// import HeroSection from '../../Components/HeroSection';
// import Carousel from '../../Components/Carousel';
// import Packages from '../../Components/Packages';
// import CardCarousel from '../../Components/CardCarousel';

// export default class Home extends Component {
//   render() {
//     return (
//         <div>
//             <Navbar />
//             {/* <HeroSection /> */}
//             <Carousel/>
//             <CardCarousel/>
//             {/* <div className="mt-24">
//                 <Carousel/>
//             </div> */}
            
//         </div>
//     )
//   }
// }

import React,{ useState } from "react";
import HangOut from '../../Assets/Images/HangOut.png';
import Carbg from '../../Assets/Images/Carbg.png';
import Modal from "../../Components/Modal";
import AIRecommendations from "../../Components/AIRecommendations";
import { FaMapMarkerAlt, FaMoneyBillWave, FaClock, FaRoute } from "react-icons/fa";
import CardCarousel from '../../Components/CardCarousel'; 
import Navbar from '../../Components/Navbar'; 

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
     <div className="mt-10 min-h-screen bg-gradient-to-b from-[#FAF7F0] via-[#D8D2C2] to-[#B17457] text-[#4A4947] " >

      <Navbar/>

      {/* Hero Section */}
      <header className="relative container mx-auto py-16 flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:w-1/2 z-10 pl-10">
          <h2 className="text-5xl font-extrabold leading-tight">
            Discover <span className="text-[#B17457]">Spontaneous</span>{" "}
            Adventures <br /> Tailored for You!
          </h2>
          <p className="mt-6 text-lg leading-relaxed">
            Let us plan your perfect day. Whether it’s a cafe visit or an
            adventurous activity, HangOut offers personalized recommendations
            based on your budget, location, and time.
          </p>
          <div className="flex items-center space-x-4 mt-6">
  <p className="text-lg font-bold leading-relaxed">Plan your day with</p>
  <a
    href="#"
    onClick={openModal}
    className="inline-block bg-[#B17457] text-white font-semibold text-lg py-2 px-4 rounded-lg transition duration-300 hover:bg-[#A56348] hover:scale-105 hover:shadow-[0_0_20px_5px_rgba(178,116,87,0.7)]"
  >
    Genie
  </a>
</div>
          <Modal isOpen={isModalOpen} onClose={closeModal}><AIRecommendations /></Modal>
        </div>
        <div className="lg:w-1/2 mt-12 lg:mt-0">
          <div className="relative w-full h-96">
            <img
              src={HangOut}
              alt="Adventure"
              className="absolute w-full h-full object-cover"
            />
            
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto py-16">
        <h3 className="text-4xl font-bold text-center mb-12">
          How <span className="text-[#B17457]">HangOut</span> Works
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 p-10">
          <div className="flex flex-col items-center p-8 bg-white text-[#4A4947] rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            <FaMapMarkerAlt className="text-5xl text-[#B17457] mb-6" />
            <h4 className="text-2xl font-bold mb-4">Choose Location</h4>
            <p className="text-center">
              Tell us where you are, and we’ll recommend nearby activities and
              cafes tailored to your preferences.
            </p>
          </div>
          <div className="flex flex-col items-center p-8 bg-white text-[#4A4947] rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            <FaMoneyBillWave className="text-5xl text-[#B17457] mb-6" />
            <h4 className="text-2xl font-bold mb-4">Set Your Budget</h4>
            <p className="text-center">
              Whether you’re on a tight budget or ready to splurge, we’ll
              suggest plans that fit within your spending limits.
            </p>
          </div>
          <div className="flex flex-col items-center p-8 bg-white text-[#4A4947] rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            <FaClock className="text-5xl text-[#B17457] mb-6" />
            <h4 className="text-2xl font-bold mb-4">Set Your Hours</h4>
            <p className="text-center">
              Enter your available hours, and we’ll curate a plan that makes the
              most out of your day.
            </p>
          </div>
          <div className="flex flex-col items-center p-8 bg-white text-[#4A4947] rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            <FaRoute className="text-5xl text-[#B17457] mb-6" />
            <h4 className="text-2xl font-bold mb-4">Choose Your HangOut</h4>
            <p className="text-center">
              Choose your categories and plan your perfect HangOut spots.
            </p>
          </div>
        </div>
      </section>

      {/* Card Carousel Section */}
      <section className="container mx-auto py-16 bg-[#D8D2C2] rounded-lg shadow-lg">
        <h3 className="text-3xl font-bold text-center text-[#4A4947] mb-8">
          Explore Activities and Cafes
        </h3>
        <CardCarousel />
      </section>

      {/* Footer */}
      <footer className="bg-[#765749] text-[#000] py-8">
        <div className="container mx-auto flex justify-between items-center">
          <p>&copy; 2024 HangOut. All rights reserved.</p>
          <div>
            <a href="#" className="mr-6 hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;




import React,{ useState } from "react";
//import HangOut from '../../Assets/Images/HangOut.png';
import Carbg from '../Assets/Images/Carbg.png';
import Modal from "../Components/Modal";
import AIRecommendations from "../Components/AIRecommendations";
//import { FaMapMarkerAlt, FaMoneyBillWave, FaClock } from "react-icons/fa";
//import CardCarousel from '../../Components/CardCarousel'; 

const Navbar = () =>{
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return(
    <div>
            <nav className="bg-white bg-opacity-50 backdrop-blur-md fixed top-0 w-full py-2 z-50">
  <div className="container mx-auto flex justify-between items-center space-x-2"> 
    <div className="flex items-center space-x-2"> 
      <img
        src={Carbg}
        alt="Logo"
        className="w-16 h-auto"
      />
      <h1 className="text-3xl font-bold tracking-wide">
        Hang<span className="text-[#B17457]">Out</span>
      </h1>
    </div>
    <div className="flex items-center space-x-6">
      <a href="/" className=" text-lg font-semibold relative hover:text-[#B17457] transition duration-300">Home</a>
      <a href="#dining" className=" text-lg relative font-semibold hover:text-[#B17457] transition duration-300">Dining</a>
      <a href="#events" className=" text-lg relative font-semibold hover:text-[#B17457] transition duration-300">Events</a>
      <a href="#activities" className=" text-lg relative font-semibold hover:text-[#B17457] transition duration-300">Activities</a>
      <a href="#attractions" className=" text-lg relative font-semibold hover:text-[#B17457] transition duration-300">Attractions</a>
      {/* <a href="#" className=" text-lg relative hover:text-[#B17457] transition duration-300">Trending</a> */}
      <div className="relative group mr-6 font-semibold">
    <a href="#" className="text-lg relative hover:text-[#B17457] transition duration-300 pr-20">Places</a>
    <div className="absolute hidden group-hover:block bg-white shadow-lg z-10 mt-1 rounded-lg">
      <ul className="py-2">
        <li>
          <a href="/delhi" className="block px-4 py-2 text-lg hover:bg-[#B17457] hover:text-white transition duration-300">Delhi</a>
        </li>
        <li>
          <a href="/mumbai" className="block px-4 py-2 text-lg hover:bg-[#B17457] hover:text-white transition duration-300">Mumbai</a>
        </li>
        <li>
          <a href="/bangalore" className="block px-4 py-2 text-lg hover:bg-[#B17457] hover:text-white transition duration-300">Bangalore</a>
        </li>
      </ul>
    </div>
  </div>
      {/* <a
        href="#"
        onClick={openModal}
        className="mr-6 text-lg bg-[#B17457] text-white font-semibold py-1 px-4 rounded-lg transform transition-all duration-300 hover:bg-[#A56348] hover:scale-105 hover:shadow-[0_0_20px_5px_rgba(178,116,87,0.7)]"
      >
        Genie
      </a> */}
      {/* <Modal isOpen={isModalOpen} onClose={closeModal}><AIRecommendations /></Modal> */}
    </div>
  </div>
</nav>
    </div>
  )
}

// const Navbar = () => {
//   const navigate = useNavigate();

//   const goToAIRecommendations = () => {
//     navigate('/ai-recommendations'); // Ensure the route is correct for AIRecommendations.js
//   };
//   return (
    
//     <nav className="bg-white shadow-md">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16 items-center">
//           {/* Logo */}
//           <div className="flex-shrink-0">
//             <a href="/" className="text-black text-xl font-bold flex items-center">
//               <svg className="h-6 w-6 text-black mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                 <path fillRule="evenodd" d="M5.05 4.95a7 7 0 1010 0l.87.87a8.5 8.5 0 11-11.73 0l.86-.87z" clipRule="evenodd" />
//                 <path d="M10 2.5a.75.75 0 01.75.75v6.45l2.5 2.5a.75.75 0 01-1.06 1.06l-3-3A.75.75 0 019 9.25V3.25A.75.75 0 0110 2.5z" />
//               </svg>
//               HangOut
//             </a>
//           </div>

//           {/* Menu Links */}
//           <div className="hidden md:flex space-x-8">
//             <a href="/trending" className="text-gray-700 hover:text-black">
//               Events
//             </a>
//             <a href="/events" className="text-gray-700 hover:text-black">
//               Activities
//             </a>
//             <a href="/dining" className="text-gray-700 hover:text-black">
//               Dining
//             </a>
//             <a href="/activities" className="text-gray-700 hover:text-black">
//               Attractions
//             </a>
//             <a href="/attractions" className="text-gray-700 hover:text-black">
//               Trending
//             </a>
//           </div>

//           {/* Right Buttons */}
//           {/* <div className="genie md:flex items-center space-x-4">
//             <a href="/login" className="bg-black text-white px-4 py-2 rounded-md">
//               Genie
//             </a>
//           </div> */}
//           <button className="cursor-pointer  rounded-2xl relative shadow-[0px_2px_2px_#00000062,0px_10px_40px_-10px_#000000a6,0px_12px_45px_-15px_#00000071] transition-all ease duration-300 active:shadow-none" onClick={goToAIRecommendations}>
//   <div className="flex items-center gap-3 font-semibold text-md px-7 py-1 border-b-4 border-[#374e72] rounded-lg bg-gradient-to-b from-[#5771a5] to-black text-white text-shadow-sm">
//     <div className="relative mt-2.5 z-10">
//       <svg
//         viewBox="0 0 256 256"
//         className="h-5 w-5 filter drop-shadow-[0_0_6px_white] drop-shadow-[1px_1px_0px_black]"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M240 128a15.79 15.79 0 0 1-10.5 15l-63.44 23.07L143 229.5a16 16 0 0 1-30 0l-23.06-63.44L26.5 143a16 16 0 0 1 0-30l63.44-23.06L113 26.5a16 16 0 0 1 30 0l23.07 63.44L229.5 113a15.79 15.79 0 0 1 10.5 15"
//           fill="currentColor"
//         />
//       </svg>
//       <svg
//         viewBox="0 0 256 256"
//         className="absolute left-5 top-[-4px] h-3 w-3 filter drop-shadow-[0_0_6px_white] drop-shadow-[1px_1px_0px_black]"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M240 128a15.79 15.79 0 0 1-10.5 15l-63.44 23.07L143 229.5a16 16 0 0 1-30 0l-23.06-63.44L26.5 143a16 16 0 0 1 0-30l63.44-23.06L113 26.5a16 16 0 0 1 30 0l23.07 63.44L229.5 113a15.79 15.79 0 0 1 10.5 15"
//           fill="currentColor"
//         />
//       </svg>
//     </div>
//     Genie
//   </div>
// </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

export default Navbar;
// import React from 'react';
// import logo from "../Assets/Images/logo.jpg";

// const Navbar = () => {
//   return (
//     <nav className="flex justify-between items-center p-4 bg-white shadow-md">
//       <div className="flex items-center">
//         <img src={logo} alt="HangOut Logo" className="h-10 w-20" />
//         {/* <span className="text-xl font-bold ml-2">HangOut</span> */}
//       </div>
//       <ul className="flex space-x-8">
//         <li>Home</li>
//         <li>Book Now</li>
//         <li>Packages</li>
//         <li>Popular Places</li>
//       </ul>
//       <button className="bg-gray-200 py-2 px-4 rounded-full">Join Us</button>
//     </nav>
//   );
// };

// export default Navbar;

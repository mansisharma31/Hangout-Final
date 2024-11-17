import { useLocation, useNavigate } from "react-router-dom";
import Navbar from '../Components/Navbar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);

  const [locationParam, setLocationParam] = useState(queryParams.get('location'));
  const [budgetParam, setBudgetParam] = useState(queryParams.get('budget'));
  const [durationParam, setDurationParam] = useState(queryParams.get('duration'));

  const initialCategories = queryParams.get('categories') ? queryParams.get('categories').split(',') : [];
  const [categoriesParam, setCategoriesParam] = useState(initialCategories);

  useEffect(() => {
    if (locationParam && budgetParam && durationParam) {
      fetchRecommendations();
    }
  }, [locationParam, budgetParam, durationParam, categoriesParam]);

  const fetchRecommendations = async () => {
    setLoading(true);
    const url = 'http://127.0.0.1:5000/plan_activity';

    const params = {
      location: locationParam || 'default_location',
      budget: budgetParam || 1000,
      duration: durationParam || 4,
      categories: categoriesParam.join(','),
    };

    try {
      const response = await axios.get(url, { params });
      const itineraries = response.data?.recommendations?.itineraries || [];
      setRecommendations(itineraries);

      if (itineraries.length === 0) {
        setError("No recommendations found for the selected criteria.");
      } else {
        setError(null);
      }
    } catch (err) {
      setError(`Failed to fetch recommendations: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryToggle = (category) => {
    setCategoriesParam((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category]
    );
  };

  const handleUpdate = () => {
    const newQueryParams = new URLSearchParams();
    newQueryParams.set('location', locationParam);
    newQueryParams.set('budget', budgetParam);
    newQueryParams.set('duration', durationParam);
    newQueryParams.set('categories', categoriesParam.join(','));

    navigate(`/recommendations?${newQueryParams}`);
    fetchRecommendations();
  };

  return (
    <div className="bg-[#F7F4EC] min-h-screen">
      <Navbar />
      <div className="h-6 m-10"></div>

      {/* Modify Your Plan Section - Only displayed after loading is complete */}
      {/* Modification Section */}
      <div className="max-w-7xl mx-auto p-8 mb-12 bg-[#EBE7DE] rounded-xl shadow-lg mt-20">
        <h2 className="text-3xl font-bold text-[#8C5E42] mb-6 text-center">Modify Your Plan</h2>

        {/* Input Fields for Location, Budget, Duration, and Categories */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <label className="font-semibold text-[#5A4F44]">Location:</label>
            <input
              type="text"
              value={locationParam}
              onChange={(e) => setLocationParam(e.target.value)}
              className="p-2 rounded-lg border border-[#B17457] w-1/3"
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="font-semibold text-[#5A4F44]">Budget:</label>
            <input
              type="number"
              value={budgetParam}
              onChange={(e) => setBudgetParam(e.target.value)}
              className="p-2 rounded-lg border border-[#B17457] w-1/3"
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="font-semibold text-[#5A4F44]">Duration (hours):</label>
            <input
              type="number"
              value={durationParam}
              onChange={(e) => setDurationParam(e.target.value)}
              className="p-2 rounded-lg border border-[#B17457] w-1/3"
            />
          </div>

          {/* Categories Selection - Cylindrical Buttons */}
          <div className="flex justify-between items-center">
            <label className="font-semibold text-[#5A4F44]">Categories:</label>
            <div className="space-x-4">
              {["dining", "activities", "attractions", "events"].map((category, index) => (
                <button
                  key={index}
                  onClick={() => handleCategoryToggle(category)}
                  className={`${
                    categoriesParam.includes(category)
                      ? "bg-[#B17457] text-white" // Active button style
                      : "bg-[#F7F4EC] text-[#5A4F44] border border-[#B17457]"
                  } py-2 px-4 rounded-full text-lg font-semibold hover:opacity-90 transition-all duration-200`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          {/* <div className="flex justify-between items-center">
                <label className="font-semibold text-[#5A4F44]">Categories:</label>
                <div className="space-x-4 ml-80">
                  {["dining", "events", "activities", "attractions"].map((category, index) => (
                    <button
                      key={index}
                      onClick={() => handleCategoryToggle(category)}
                      className={`${
                        categoriesParam.includes(category)
                          ? "bg-[#B17457] text-white"
                          : "bg-[#F7F4EC] text-[#5A4F44] border border-[#B17457]"
                      } py-2 px-4 rounded-full text-lg font-semibold hover:opacity-90 transition-all duration-200`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div> */}

          <button
            onClick={handleUpdate}
            className="bg-gradient-to-r from-[#B17457] to-[#4A4947] text-white text-lg font-semibold rounded-lg shadow-md py-2 px-4 w-full hover:opacity-90 mt-6"
          >
            Update Plan
          </button>
        </div>
      </div>
        
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-4xl font-extrabold text-center text-[#5A4F44] mb-12 tracking-wide">
          Your Customized Day Plan
        </h1>

        {loading ? (
          <div className="flex justify-center items-center">
            <div className="loader">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
        ) : error ? (
          <div className="text-center text-[#4A4947] font-semibold">{error}</div>
        ) : recommendations.length === 0 ? (
          <div className="text-center text-[#5A4F44] font-semibold">Sorry, no recommendations found</div>
        ) : (
          <div className="space-y-12">
            {recommendations.map((itinerary, index) => (
              <div 
                key={index}
                className="bg-[#EBE7DE] p-8 rounded-3xl shadow-xl transition-all transform hover:scale-105 hover:shadow-2xl"
              >
                <h2 className="text-3xl font-bold text-[#8C5E42] mb-6">Plan {index + 1}</h2>

                {itinerary.places.length !== 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {itinerary.places.map((place, placeIndex) => (
                      <div onClick={()=>navigate(`/Product/${place.Name}`)}
                        key={placeIndex}
                        className="bg-[#F7F4EC] rounded-lg shadow-lg p-4 transform transition-all hover:scale-105 hover:shadow-xl cursor-pointer"
                      >
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-2xl font-bold text-[#8C5E42]">{place.Name}</h3>
                          <div className="flex items-center space-x-2 text-[#4A4947]">
                            <span>💰</span>
                            <span className="text-lg font-bold">{place.Price}</span>
                          </div>
                        </div>
                        <div className="text-[#6E4F34] mb-6">
                          <p className="text-lg font-medium">Category: <span className="text-[#aa856e]">{place.Category}</span></p>
                          <p className="text-lg font-medium">Duration: <span className="text-[#aa856e]">{place.Duration} hrs</span></p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-[#5A4F44] font-medium">No places available</div>
                )}

                <div className="mt-6 text-xl text-[#5A4F44]">
                  <span>Total Duration: <strong>{itinerary.totalDuration} hrs</strong></span>
                  <br />
                  <span>Total Price: <strong>₹{itinerary.totalPrice}</strong></span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Recommendations;















// import { useLocation, useNavigate } from "react-router-dom";
// import Navbar from '../Components/Navbar';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Recommendations = () => {
//   const [recommendations, setRecommendations] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);

//   const locationParam = queryParams.get('location');
//   const budgetParam = queryParams.get('budget');
//   const durationParam = queryParams.get('duration');
//   const ageGroupParam = queryParams.get('age_group');
//   const categoriesParam = queryParams.get('categories');

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (locationParam && budgetParam && durationParam && ageGroupParam) {
//       fetchRecommendations();
//     }
//   }, [locationParam, budgetParam, durationParam, ageGroupParam]);

//   const fetchRecommendations = async () => {
//     setLoading(true);
//     const url = 'http://127.0.0.1:5000/plan_activity';

//     const params = {
//       location: locationParam,
//       budget: budgetParam,
//       duration: durationParam,
//       age_group: ageGroupParam,
//       categories: categoriesParam || '',
//     };

//     try {
//       const response = await axios.get(url, { params });
//       setRecommendations(response.data.recommendations.itineraries);
//     } catch (err) {
//       setError('Failed to fetch recommendations. Please try again later.');
//       console.error(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };
// console.log("recommendatons", recommendations);
//   return (
//     <div className="bg-[#F5F5F5] min-h-screen p-8">
//       <Navbar />
//       <div className="max-w-5xl mx-auto mt-8">
//         <h1 className="text-4xl font-bold text-[#4A4947] mb-8 text-center">
//           Your Recommended Plan
//         </h1>

//         {loading ? (
//           <div className="text-center text-lg font-semibold text-[#4A4947]">Loading recommendations...</div>
//         ) : error ? (
//           <div className="text-center text-red-600 font-semibold">{error}</div>
//         ) : recommendations.length > 0 ? (
//           <div className="space-y-10">
//             {recommendations.map((itinerary, index) => (
//               <div 
//                 key={index}
//                 className="bg-gradient-to-r from-[#B17457] to-[#4A4947] rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl"
//               >
//                 <h2 className="text-2xl font-semibold text-[#D8D2C2]">
//                   Itinerary {index + 1}
//                 </h2>
//                 <div className="space-y-4 mt-6">
//                   {itinerary.places.length > 0 ? (
//                     itinerary.places.map((place, placeIndex) => (
//                       <div onClick={()=>navigate(`/Product/${place.Name}`)}
//                         key={placeIndex}
//                         className="bg-[#F5F5F5] p-4 border-l-4 border-[#B17457] rounded-md shadow-md"
//                       >
//                         <h3 className="text-xl font-semibold text-[#4A4947]">
//                           Place {placeIndex + 1}: {place.Name}
//                         </h3>
//                         <p className="text-gray-700 mt-1">Duration: {place.Duration} hrs</p>
//                         <p className="text-gray-700">Price: ₹{place.Price}</p>
//                         <p className="text-gray-700">Category: {place.Category}</p>
//                       </div>
//                     ))
//                   ) : (
//                     <p className="text-center text-gray-500">No places available in this itinerary.</p>
//                   )}
//                 </div>
//                 <div className="mt-6 text-[#D8D2C2] font-medium">
//                   <p>Total Duration: {itinerary.totalDuration} hrs</p>
//                   <p>Total Price: ₹{itinerary.totalPrice}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-center text-gray-600 text-lg">No recommendations found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Recommendations;


// import { useLocation } from "react-router-dom";
// import Navbar from '../Components/Navbar';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Recommendations = () => {

//   const [recommendations, setRecommendations] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);

//   const locationParam = queryParams.get('location');
//   const budgetParam = queryParams.get('budget');
//   const durationParam = queryParams.get('duration');
//   const ageGroupParam = queryParams.get('age_group');
//   const categoriesParam = queryParams.get('categories');

//   useEffect(() => {
//     if (locationParam && budgetParam && durationParam && ageGroupParam) {
//       fetchRecommendations();
//     }
//   }, [locationParam, budgetParam, durationParam, ageGroupParam]);


//   const fetchRecommendations = async () => {
//     setLoading(true);
//     const url = 'http://127.0.0.1:5000/plan_activity'; // Backend API URL

//     const params = {
//       location: locationParam,
//       budget: budgetParam,
//       duration: durationParam,
//       age_group: ageGroupParam,
//       categories: categoriesParam || '',
//     };

//     try {
//       const response = await axios.get(url, { params });
//       console.log(response.data.recommendations.itineraries)
//       setRecommendations(response.data.recommendations.itineraries)
//     } catch (err) {
//       setError('Failed to fetch recommendations. Please try again later.');
//       console.error(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };


//   return (
//     <div className="">
//       <Navbar />
//       <h1 className="">
//         Your Recommended Plan
//       </h1>
//       <div className="">
//         {/* <>{JSON.stringify(recommendations)}</> */}
//         <div>{recommendations.length !== 0 ? recommendations.map((itinerary, index) => (
//           <>
//             <h3>Itinerary {index + 1}</h3>
//             {/* <>{JSON.stringify(itinerary)}</> */}
//             {itinerary.places.length !== 0 ? itinerary.places.map((place, placeIndex) => (
//               <>
//                 <h4>Place {placeIndex}</h4>
//                 <div>Name : {place.Name}</div>
//                 <div>Duration : {place.Duration}</div>
//                 <div>Price : {place.Price}</div>
//                 <div>Category : {place.Category}</div>
//                 <div>----------------------------------------</div>
//               </>
//             )) : <div>No Places</div>}
//             <div>Total Duration : {itinerary.totalDuration}</div>
//             <div>Total Price : {itinerary.totalPrice}</div>
//             <h1>----------------------------------------------------------------</h1>
//           </>
//         )) : <div>No recommendations found</div>}</div>
//         {/* {recommendations ? (
//           recommendations.map((place) => (
//             <div
//               key={place.id}
//               className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 hover:shadow-2xl"
//             >
//               <img
//                 src={place.image}
//                 alt={place.title}
//                 className="w-full h-48 object-cover rounded-lg mb-4"
//               />
//               <h3 className="text-xl font-semibold text-[#4A4947] mb-2">{place.title}</h3>
//               <p className="text-gray-600 mb-2">{place.description}</p>
//               <p className="text-sm text-gray-500">
//                 Price: <span className="font-bold">₹{place.price}</span> | Duration: {place.duration} hrs
//               </p>
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-gray-600 text-lg">
//             No recommendations available.
//           </p>
//         )} */}
//       </div>
//     </div>
//   );
// };

// export default Recommendations;
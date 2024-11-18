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


      <div className="max-w-7xl mx-auto p-8 mb-12 bg-[#EBE7DE] rounded-xl shadow-lg mt-20">
        <h2 className="text-3xl font-bold text-[#8C5E42] mb-6 text-center">Modify Your Plan</h2>


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

          <div className="flex justify-between items-center">
            <label className="font-semibold text-[#5A4F44]">Categories:</label>
            <div className="space-x-4">
              {["dining", "activities", "attractions", "events"].map((category, index) => (
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
          </div>


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


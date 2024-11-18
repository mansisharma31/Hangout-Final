import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 


const AIRecommendations = () => {
    const [location, setLocation] = useState("");
    const [budget, setBudget] = useState("");
    const [duration, setDuration] = useState("");
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate(); 
  
    const generateRecommendations = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        const queryParams = new URLSearchParams({
          location: location,
          budget: budget,
          duration: duration,
          categories: categories.join(',') || '', 
        }).toString();
    
        try {
          navigate(`/recommendations?${queryParams}`);
        } catch (err) {
          console.log(err.message); 
        } finally {
          setLoading(false);
        }
    };

    const handleCategoryToggle = (category) => {
        setCategories((prevCategories) => {
            if (prevCategories.includes(category)) {
                return prevCategories.filter(item => item !== category); 
            } else {
                return [...prevCategories, category]; 
            }
        });
    };
  
    return (     

        <form onSubmit={generateRecommendations} className="space-y-6 p-8 pt-10">
        {!loading && (
          <h2 className="text-2xl font-bold text-center text-[#4A4947] mb-4">
            Plan Your Perfect Day
          </h2>
        )}
        {loading ? (
          <div className="loading-container">
            <div className="loader">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
            <p className="mt-4 text-lg text-[#4A4947]">Loading your plan...</p>
          </div>
        ) : (
          <div className="flex flex-col space-y-4">

            <div className="input-container">
              <label htmlFor="location" className="block text-lg font-semibold text-[#4A4947]">Location</label>
              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="border-b-2 border-[#B17457] w-full h-12 focus:outline-none focus:border-[#4A4947]"
                placeholder="Enter your location"
              />
            </div>
            <div className="input-container">
              <label htmlFor="budget" className="block text-lg font-semibold text-[#4A4947]">Budget (₹)</label>
              <input
                id="budget"
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                required
                className="border-b-2 border-[#B17457] w-full h-12 focus:outline-none focus:border-[#4A4947]"
                placeholder="Enter your budget"
              />
            </div>
            <div className="input-container">
              <label htmlFor="duration" className="block text-lg font-semibold text-[#4A4947]">Duration (hrs)</label>
              <input
                id="duration"
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
                className="border-b-2 border-[#B17457] w-full h-12 focus:outline-none focus:border-[#4A4947]"
                placeholder="Enter duration"
              />
            </div>


            <div className="input-container">
              <label htmlFor="category" className="block text-lg font-semibold text-[#4A4947]">Category</label>
              <div className="flex flex-wrap gap-4 mt-2">
                {['dining', 'events', 'activities', 'attractions'].map((category) => (
                  <button
                    type="button"
                    key={category}
                    onClick={() => handleCategoryToggle(category)}
                    className={`px-6 py-2 rounded-full text-lg font-semibold transition-colors duration-200 
                      ${categories.includes(category) ? 'bg-[#B17457] text-white' : 'bg-[#E9E4E0] text-[#4A4947]'}
                      hover:bg-[#b4a198] hover:text-white focus:outline-none`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
  
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#B17457] to-[#4A4947] text-white text-lg font-semibold rounded-lg shadow-md hover:opacity-90 transition-opacity duration-200"
            >
              Generate Plan
            </button>
          </div>
        )}
      </form>
    );
  };
  
  export default AIRecommendations;

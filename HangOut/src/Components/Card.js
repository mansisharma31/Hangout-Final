import { FaPhoneAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Card = ({ image, title, locations, price, rating, reviews, id }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/Product/${id}`);
  };

  return (
    <div className="bg-[#FAF7F0] border-[#D8D2C2] shadow-inner rounded-lg overflow-hidden cursor-pointer" onClick={handleNavigate}>
      <img src={image} alt={title} className="w-full h-64 object-cover" />
      
      <div className="p-4">
        <div className="flex items-center justify-between text-[#4A4947] text-sm">
          <div className="flex items-center text-[#B17457]">
            <span className="text-xl">{rating}</span>
            <span className="text-sm ml-1">({reviews})</span>
          </div>
        </div>
        
        <h2 className="text-xl font-semibold mt-2 text-[#4A4947]">{title}</h2>
        <p className="text-[#4A4947] text-sm mt-1">{locations.join(' • ')}</p>
        
        <div className="flex items-center mt-4">
          <p className="text-lg font-bold text-[#B17457]">INR {price}</p>
        </div>
        
        <button className="mt-4 w-full bg-[#B17457] text-[#FAF7F0] py-2 rounded flex items-center justify-center">
          More Details
        </button>
      </div>
    </div>
  );
};

export default Card;
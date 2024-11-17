import React, { useState } from 'react';
import { cafesDataArray } from "../../utils/data2.js";
import { useParams } from 'react-router-dom';

export const ProductDetailsPage = () => {
    const { id } = useParams();
    console.log("id", id);
    
    let cafeData = cafesDataArray.find((data) => data.id == id);
    console.log("cafe data", cafeData)
    if(!cafeData){
        cafeData = cafesDataArray.find((data)=> data.title == id);
    }
    console.log("cafe data 2", cafeData);
    const [activeTab, setActiveTab] = useState("details");
    const [reviews, setReviews] = useState([
        { name: "John Doe", text: "Amazing food and great service!", rating: 5 },
        { name: "Jane Smith", text: "A bit expensive, but worth it for the experience.", rating: 4 },
    ]);
    const [newReview, setNewReview] = useState({ name: "", text: "", rating: 1 });

    
    if (!cafeData) {
        return (
            <div>
               
            </div>
        );
    }

    const handleReviewChange = (e) => {
        const { name, value } = e.target;
        setNewReview((prev) => ({ ...prev, [name]: value }));
    };

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        if (newReview.name && newReview.text) {
            setReviews((prev) => [...prev, newReview]);
            setNewReview({ name: "", text: "", rating: 1 });
        }
    };

    return (
        <div className="bg-gradient-to-b from-[#FAF7F0] to-[#D8D2C2] min-h-screen mt-12">
            
            <div className="container mx-auto px-6 lg:px-12 py-12">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-6xl font-extrabold text-[#4A4947] animate-fade-in">
                        {cafeData.title}
                    </h1>
                    
                </div>
                <p className="text-md text-[#4A4947] mb-4">
                    {cafeData.price}, {cafeData.cuisine}
                </p>
                <div className="flex items-center space-x-4 mb-6 text-sm">
                    <span className="text-green-600 font-medium">🕒 {cafeData.timings}</span>
                </div>

                
                <div className="grid grid-cols-3 gap-6 mb-6">
                    <div className="col-span-2 relative overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-105">
                        <img
                            src={cafeData.image}
                            alt="Main Image"
                            className="rounded-lg w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40"></div>
                        <div className="absolute bottom-4 left-4 text-white">
                            <h2 className="text-xl font-bold">Experience the Best Café</h2>
                            <p className="text-sm">A perfect blend of ambiance and flavors</p>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-4">
                        {cafeData.images.map((img, index) => (
                            <div
                                key={index}
                                className="relative overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-110"
                            >
                                <img
                                    src={img}
                                    alt={`Small Image ${index + 1}`}
                                    className="object-cover h-full"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
                                <div className="absolute bottom-2 left-2 text-white">
                                    <p className="text-sm">Highlight {index + 1}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

          
            <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-3 gap-12 py-12">
               
                <aside className="hidden lg:block lg:sticky lg:top-20 bg-white p-6 rounded-lg shadow-xl h-fit">
                    <h2 className="text-xl font-semibold mb-4 text-[#B17457]">Quick Info</h2>
                    <p className="text-sm text-gray-500 mb-2">PRICE RANGE</p>
                    <p className="text-sm text-black">{cafeData.price}</p>
                    <p className="text-sm text-gray-500 mt-4">CUISINES</p>
                    <p className="text-sm text-black">{cafeData.cuisine}</p>
                    <p className="text-sm text-gray-500 mt-4">SPECIAL DIETS</p>
                    <p className="text-sm text-black">{cafeData.specialDiets.join(", ")}</p>
                    <p className="text-sm text-gray-500 mt-4">📞 {cafeData.contact}</p>
                    <a href={cafeData.website} className="text-[#B17457] mt-4 block hover:underline">
                        🌐 Visit Website
                    </a>
                </aside>

               
                <div className="lg:col-span-2">
                   
                    <div className="flex justify-center border-b mb-6">
                        {["details", "reviews", "location"].map((tab) => (
                            <button
                                key={tab}
                                className={`px-6 py-2 font-semibold relative ${
                                    activeTab === tab
                                        ? "border-b-4 border-[#B17457] text-[#B17457] transition-transform duration-300"
                                        : "text-gray-500 hover:text-[#B17457] transition-colors duration-300"
                                }`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>

                   
                    <div>
                        {activeTab === "details" && (
                            <div className="bg-white p-6 rounded-lg shadow-xl mb-6">
                                <h2 className="text-2xl font-bold mb-4 text-[#B17457]">About</h2>
                                <p className="text-[#4A4947]">{cafeData.description}</p>
                            </div>
                        )}
                        {activeTab === "reviews" && (
                            <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                                <h2 className="text-2xl font-bold mb-4 text-[#B17457]">Customer Reviews</h2>
                                <ul>
                                    {reviews.map((review, index) => (
                                        <li key={index} className="mb-4 border-b pb-4">
                                            <h3 className="font-semibold">{review.name}</h3>
                                            <p className="text-sm text-[#4A4947]">{review.text}</p>
                                            <span className="text-yellow-500">Rating: {review.rating} ⭐</span>
                                        </li>
                                    ))}
                                </ul>
                               
                                <div className="mt-6">
                                    <h3 className="text-xl font-semibold text-[#B17457]">Add a Review</h3>
                                    <form onSubmit={handleReviewSubmit} className="mt-4">
                                        <div className="flex flex-col mb-4">
                                            <label className="text-sm mb-2" htmlFor="name">Your Name</label>
                                            <input
                                                className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                                type="text"
                                                name="name"
                                                value={newReview.name}
                                                onChange={handleReviewChange}
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col mb-4">
                                            <label className="text-sm mb-2" htmlFor="text">Your Review</label>
                                            <textarea
                                                className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                                name="text"
                                                value={newReview.text}
                                                onChange={handleReviewChange}
                                                required
                                            ></textarea>
                                        </div>
                                        <div className="flex flex-col mb-4">
                                            <label className="text-sm mb-2" htmlFor="rating">Rating</label>
                                            <select
                                                className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                                name="rating"
                                                value={newReview.rating}
                                                onChange={handleReviewChange}
                                            >
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <option key={star} value={star}>
                                                        {star} Star{star > 1 ? 's' : ''}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <button
                                            type="submit"
                                            className="bg-[#B17457] text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                                        >
                                            Submit Review
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )}
                        {activeTab === "location" && (
                            <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                                <h2 className="text-2xl font-bold mb-4 text-[#B17457]">Location</h2>
                                <p className="text-gray-700">Find us at:</p>
                                <a href={cafeData.mapLink} className="text-blue-600 mt-2 block hover:underline break-words" style={{ wordBreak: "break-word", overflowWrap: "break-word" }}>{cafeData.mapLink}</a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;

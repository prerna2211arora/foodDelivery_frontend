// import React from "react";
// import { Link } from "react-router-dom";
// import restaurantsData from "../../data/restaurantsData.json";

// const Home = () => {
//   return (
//     <div className="p-4">
//       {/* Hero Section */}
//       <div className="relative mb-8">
//         <img
//           src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg" // Replace with any suitable hero image
//           alt="Restaurant Hero"
//           className="w-full h-64 object-cover"
//         />
//         <div className="absolute top-0 left-0 w-full h-64 bg-black opacity-50"></div>
//         <div className="absolute top-0 left-0 w-full h-64 flex flex-col items-center justify-center text-white">
//           <h1 className="text-4xl font-bold">Welcome to Our Restaurants</h1>
//           <p className="text-xl mt-2">
//             Explore our variety of restaurants and cuisines.
//           </p>
//         </div>
//       </div>

//       {/* Restaurant List */}
//       <h1 className="text-3xl font-bold mb-6 text-center">Our Restaurants</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {restaurantsData.map((restaurant, index) => (
//           <div
//             key={index}
//             className="relative bg-gray-100 rounded-lg shadow-lg overflow-hidden group"
//           >
//             <img
//               src={restaurant.image}
//               alt={restaurant.name}
//               className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
//             />
//             <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//               <h2 className="text-white text-xl font-bold">
//                 {restaurant.name}
//               </h2>
//               <Link to={`/restaurant/${restaurant.id}`}>
//                 <button className="mt-3 bg-blue-500 text-white py-2 px-4 rounded-lg">
//                   View Menu
//                 </button>
//               </Link>
//             </div>
//             <h3 className="text-center font-bold py-2">{restaurant.name}</h3>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/restaurants/"); // Replace with your API endpoint
        setRestaurants(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load restaurants.");
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading) {
    return <p className="text-center text-2xl">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="p-4">
      {/* Hero Section */}
      <div className="relative mb-8">
        <img
          src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg" // Replace with any suitable hero image
          alt="Restaurant Hero"
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-64 bg-black opacity-50"></div>
        <div className="absolute top-0 left-0 w-full h-64 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl font-bold">Welcome to Our Restaurants</h1>
          <p className="text-xl mt-2">
            Explore our variety of restaurants and cuisines.
          </p>
        </div>
      </div>

      {/* Restaurant List */}
      <h1 className="text-3xl font-bold mb-6 text-center">Our Restaurants</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.restaurant_id}
            className="relative bg-gray-100 rounded-lg shadow-lg overflow-hidden group"
          >
            <img
              src={restaurant.image_url || "https://via.placeholder.com/150"} // Fallback image
              alt={restaurant.name}
              className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h2 className="text-white text-xl font-bold">
                {restaurant.name}
              </h2>
              <p className="text-white">{restaurant.cuisine}</p>
              <p className="text-white">Rating: {restaurant.rating}</p>
              <Link to={`/restaurant/${restaurant.restaurant_id}`}>
                <button className="mt-3 bg-blue-500 text-white py-2 px-4 rounded-lg">
                  View Menu
                </button>
              </Link>
            </div>
            <div className="p-4">
              <h3 className="text-center font-bold">{restaurant.name}</h3>
              <p className="text-center text-gray-600">{restaurant.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

// Import necessary modules
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../CartContext";
import axios from "axios"; // Import axios for API calls
import Hero from "../common/Hero"; // Import the Hero component

const RestaurantMenu = () => {
  const { id } = useParams();
  const { cart, addToCart, removeFromCart } = useCart();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch menu items from API
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/restaurants/${id}/menu`
        );
        setMenuItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching menu items:", error);
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, [id]);

  const getItemQuantity = (itemId) => {
    const cartItem = cart.find((item) => item.menu_id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const filteredItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);
  console.log(filteredItems);
  // Handle adding an item to the cart and sending to backend
  const handleAddToCart = async (item) => {
    addToCart(item);
    const userId = JSON.parse(localStorage.getItem("user")).user_id; // Get user ID from local storage
    const existingItemQuantity = getItemQuantity(item.menu_id);

    try {
      // Check if the item is already in the cart
      if (existingItemQuantity > 0) {
        // If it exists, update the quantity in the backend
        await axios.put(
          `http://localhost:5000/api/cart/updateMenu/${item.menu_id}`,
          {
            user_id: userId,
            quantity: existingItemQuantity + 1,
          }
        );
      } else {
        // If it doesn't exist, add it to the cart in the backend
        console.log("abc", userId, item.menu_id);
        await axios.post(`http://localhost:5000/api/cart/add`, {
          userId: userId,
          menuItemId: item.menu_id,
          quantity: 1,
        });
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div>
      <Hero
        title={` Restaurant ${id}`}
        subtitle="Delicious food at your fingertips!"
        imageUrl="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg"
      />
      <div className="flex">
        {/* Sidebar for filters */}
        <div className="w-1/4 p-4">
          <h2 className="text-lg font-bold mb-4">Filter Items</h2>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setSelectedCategory("All")}
                className={`block w-full p-2 rounded ${
                  selectedCategory === "All"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                All
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedCategory("Pizza")}
                className={`block w-full p-2 rounded ${
                  selectedCategory === "Pizza"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                Pizza
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedCategory("Burger")}
                className={`block w-full p-2 rounded ${
                  selectedCategory === "Burger"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                Burger
              </button>
            </li>
            {/* Add more categories as needed */}
          </ul>
        </div>

        {/* Menu items */}
        <div className="w-3/4 p-4">
          <h1 className="text-2xl font-bold mb-4">Menu</h1>
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-3 gap-4">
              {filteredItems.map((item) => {
                const itemQuantity = getItemQuantity(item.menu_id);
                return (
                  <div
                    key={item.menu_id}
                    className="border p-4 rounded shadow-lg flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-32 object-cover mb-2 rounded hover:opacity-90 transition-opacity duration-300"
                    />
                    <h3 className="text-lg font-bold">{item.item_name}</h3>
                    <p className="text-gray-600">₹{item.price}</p>

                    {/* Quantity Controls */}
                    {itemQuantity > 0 ? (
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => removeFromCart(item)}
                          className="bg-red-500 text-white px-2 py-1 rounded transition-transform duration-200 hover:scale-110"
                        >
                          -
                        </button>
                        <span className="mx-2">{itemQuantity}</span>
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="bg-green-500 text-white px-2 py-1 rounded transition-transform duration-200 hover:scale-110"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-600 transition duration-300"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p>No items found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;

import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { useCart } from "../../CartContext"; // Import CartContext

const Navbar = ({ user, setUser }) => {
  const { cart } = useCart();
  const totalItems = user ? cart.reduce((total, item) => total + item.quantity, 0) : 0; // Calculate total cart items based on user state
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem("user");
    setUser(null); // Clear user state
    navigate("/"); // Redirect to HomePage
  };

  return (
    <nav className="bg-gray-800 p-4 text-white sticky top-0 w-full z-10">
      <ul className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <li className="flex items-center">
            <img
              src="https://img.freepik.com/premium-vector/homemade-kitchen-logo-with-cute-mom-character_450825-207.jpg?" // Replace with your logo URL
              alt="App Logo"
              className="h-8 w-8"
            />
            <span className="ml-2 text-xl font-bold">Mommy's Kitchen</span>
          </li>
        </div>

        {/* Middle Section: Centered Menu Items */}
        <div className="flex items-center space-x-8">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/order-history">Order History</Link>
          </li>
          <li>
            <Link to="/address-edit">Address</Link>
          </li>
        </div>

        {/* Right Section: Cart and Login/Logout */}
        <div className="flex items-center space-x-4">
          <li className="relative">
            <Link to="/cart" className="flex items-center space-x-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2 13h13l3-8H6"></path>
              </svg>
              <span>Cart</span>
              {/* Display total items if user is logged in, else display 0 */}
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems} {/* Show totalItems, which is 0 if logged out */}
              </span>
            </Link>
          </li>
          <li>
            {user ? (
              <div className="flex items-center">
                <span className="mr-2">Hello, {user.username}!</span>
                <button onClick={handleLogout} className="text-white">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="flex items-center space-x-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 12a5 5 0 100-10 5 5 0 000 10zm-7 8a7 7 0 0114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Login</span>
              </Link>
            )}
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;

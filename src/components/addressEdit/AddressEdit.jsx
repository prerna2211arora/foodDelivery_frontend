// src/components/address/AddressEdit.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../CartContext"; // Import from CartContext

const AddressEdit = () => {
  const { address, setAddress } = useCart(); // Access the address from context
  const [houseNumber, setHouseNumber] = useState(address.houseNumber || ""); // Initialize with current address details
  const [city, setCity] = useState(address.city || "");
  const [state, setState] = useState(address.state || "");
  const [pincode, setPincode] = useState(address.pincode || "");
  const navigate = useNavigate();

  // Fetching user ID from local storage
  const user = localStorage.getItem("user");
  const userRes = user ? JSON.parse(user) : null;
  const userId = userRes?.user_id;

  const handleSaveAddress = () => {
    const updatedAddress = {
      houseNumber,
      city,
      state,
      pincode,
    };
    setAddress(updatedAddress); // Update the global address in context
    alert(`Address updated to: ${JSON.stringify(updatedAddress)}`);
    navigate("/cart"); // Redirect back to cart page
  };

  if (!userId) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p>You need to log in to view your Address</p>
        <button
          onClick={() => navigate("/login")}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Login
        </button>
      </div>
    );
  }
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Address</h1>

      {/* Address Input Fields */}
      <div className="mb-2">
        <label className="block text-gray-700 mb-1">House Number</label>
        <input
          type="text"
          value={houseNumber}
          onChange={(e) => setHouseNumber(e.target.value)}
          placeholder="Enter house number"
          className="border border-gray-300 rounded px-2 py-1 w-full"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block text-gray-700 mb-1">City</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="border border-gray-300 rounded px-2 py-1 w-full"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block text-gray-700 mb-1">State</label>
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder="Enter state"
          className="border border-gray-300 rounded px-2 py-1 w-full"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block text-gray-700 mb-1">Pincode</label>
        <input
          type="text"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          placeholder="Enter pincode"
          className="border border-gray-300 rounded px-2 py-1 w-full"
          required
        />
      </div>
      <button
        onClick={handleSaveAddress}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Save Address
      </button>

      {/* Display Current Address */}
      <div className="mt-4">
        <h2 className="text-xl font-bold">Current Address:</h2>
        <p className="text-gray-700">
          {address.houseNumber}, {address.city}, {address.state} -{" "}
          {address.pincode}
        </p>
      </div>
    </div>
  );
};

export default AddressEdit;

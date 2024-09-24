import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // If using react-router for navigation

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Use for navigation

  // Fetching user ID from local storage
  const user = localStorage.getItem("user");
  const userRes = user ? JSON.parse(user) : null;
  const userId = userRes?.user_id;

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/orderhistory/${userId}`
        );
        setOrders(response.data); // Assuming response data is an array of orders
        console.log("Order history fetched successfully:", response.data);
      } catch (error) {
        setError("Failed to fetch order history. Please try again later.");
        console.error("Error fetching order history:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchOrderHistory();
    } else {
      setLoading(false);
      setError("Access Denied. You need to log in.");
    }
  }, [userId]);

  const handleLogin = () => {
    navigate("/login"); // Redirect user to the login page
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!userId) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p>You need to log in to view your Order History.</p>
        <button
          onClick={() => navigate("/login")}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Login
        </button>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Order History</h1>
      {orders.length === 0 ? (
        <p className="text-center">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.order_id}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
            >
              <h2 className="text-xl font-semibold mb-2">
                Order ID: {order.order_id}
              </h2>
              <p className="text-gray-700 mb-2">
                Total Amount: <span className="font-medium">${order.total_amount}</span>
              </p>
              <p className="text-gray-700 mb-2">
                Payment Method: <span className="font-medium">{order.payment_method}</span>
              </p>
              <p className="text-gray-700 mb-4">Address: {order.address}</p>
              <p className="text-gray-700 mb-2">
                Order Status: <span className="font-medium">{order.order_status}</span>
              </p>

              <div className="mt-4">
                <h3 className="text-lg font-medium mb-3">Items:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Loop through order items */}
                  <div className="flex items-center">
                    <img
                      src={order.image_url}
                      alt={order.item_name}
                      className="w-16 h-16 rounded-lg object-cover mr-4"
                    />
                    <div>
                      <p className="text-gray-900 font-semibold">{order.item_name}</p>
                      <p className="text-gray-600">${order.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../../CartContext"; // Use CartContext

const Cart = () => {
  const {
    cart,
    setCart,
    removeFromCart,
    clearCart,
    address,
    updateCartQuantity,
  } = useCart();
  const [isCod, setIsCod] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getRandomMenuId = () => {
    return Math.floor(Math.random() * 22) + 1; // Generates a random integer between 1 and 22
  };

  // Fetch user ID from local storage
  const user = localStorage.getItem("user");
  const userRes = JSON.parse(user);
  const userId = userRes ? userRes.user_id : null; // Check if user exists

  // Fetch cart items when the component mounts
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/cart/");
        setCart(response.data.cartItems); // Assuming response contains cart items inside 'cartItems'
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setLoading(false);
      }
    };
    console.log(cart);
    fetchCartItems();
  }, [userId, setCart]);

  // Calculate total price
  const totalAmount = cart.reduce((acc, item) => {
    const itemPrice = Number(item.price);
    const itemQuantity = Number(item.quantity);
    return acc + itemPrice * itemQuantity;
  }, 0);

  // Handle placing an order
  const handlePlaceOrder = async () => {
    try {
      const randomMenuId = getRandomMenuId();
      console.log({
        userId,
        totalAmount,
        paymentMethod: isCod ? "COD" : "Online",
        address,
      });
      // Create checkout entry
      const checkoutResponse = await axios.post(
        "http://localhost:5000/api/checkout",
        {
          userId,
          totalAmount,
          paymentMethod: isCod ? "COD" : "Online",
          address,
          menu_id: randomMenuId,
        }
      );
      const { checkout_id, menu_id } = checkoutResponse.data;
      console.log(userId);

      // Create an entry in order history with "Pending" status
      await axios.post(`http://localhost:5000/api/orderhistory`, {
        user_id: userId,
        checkout_id,
        order_status: "Pending",
        menu_id: randomMenuId,
      });

      // Clear cart and navigate to order history page
      clearCart(); // Clear cart after placing the order
      try {
        await axios.delete(`http://localhost:5000/api/cart/clear/${userId}`);
        console.log("Cart cleared successfully");
      } catch (error) {
        console.error("Empty cart error", error);
      }
      alert(`Order placed successfully! Total: ₹${totalAmount}`);
      navigate("/order-history");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const handleEditAddress = () => {
    navigate("/address-edit"); // Redirect to edit address page
  };

  // Handle increasing quantity
  const increaseQuantity = async (item) => {
    try {
      await axios.put(`http://localhost:5000/api/cart/update/${item.cart_id}`, {
        quantity: item.quantity + 1,
      });
      updateCartQuantity(item.cart_id, item.quantity + 1);
    } catch (error) {
      console.error("Error increasing quantity:", error);
    }
  };

  // Handle decreasing quantity
  const decreaseQuantity = async (item) => {
    if (item.quantity > 1) {
      try {
        await axios.put(
          `http://localhost:5000/api/cart/update/${item.cart_id}`,
          {
            quantity: item.quantity - 1,
          }
        );
        updateCartQuantity(item.cart_id, item.quantity - 1);
      } catch (error) {
        console.error("Error decreasing quantity:", error);
      }
    } else {
      handleRemoveFromCart(item);
    }
  };

  // Remove an item from the cart
  const handleRemoveFromCart = async (item) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/cart/remove/${item.cart_id}`,
        {
          data: { userId },
        }
      );
      removeFromCart(item);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  // Clear the cart
  const handleClearCart = async () => {
    try {
      await axios.post(`http://localhost:5000/api/cart/clear`, { userId });
      clearCart();
    } catch (error) {
      console.error("Error clearing the cart:", error);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!userId) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p>You need to log in to view your cart and add items.</p>
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
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index} className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-16 h-16 object-cover mb-2 mr-2 rounded hover:opacity-90 transition-opacity duration-300"
                />
                <span>
                  {item.item_name} - ₹{Number(item.price)}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => decreaseQuantity(item)}
                  className="bg-gray-200 text-black px-2 py-1 rounded"
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => increaseQuantity(item)}
                  className="bg-gray-200 text-black px-2 py-1 rounded"
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {cart.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">Total: ₹{totalAmount}</h2>
          <h2 className="text-lg font-bold mt-4">Delivery Address</h2>
          {address ? (
            <p>
              {address.houseNumber}, {address.city}, {address.state} -{" "}
              {address.pincode}
            </p>
          ) : (
            <p>No address set. Please update your address.</p>
          )}
          <button
            onClick={handleEditAddress}
            className="bg-blue-500 text-white px-2 py-1 rounded"
          >
            Edit
          </button>

          <label className="flex items-center mb-2 mt-2">
            <input
              type="checkbox"
              checked={isCod}
              onChange={() => setIsCod(!isCod)}
            />
            <span className="ml-2">Cash on Delivery (COD)</span>
          </label>

          <button
            onClick={handlePlaceOrder}
            className="bg-green-500 text-white px-4 py-2 rounded"
            disabled={!isCod}
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;

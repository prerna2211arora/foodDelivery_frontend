import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Cart from "./components/cart/Cart";
import Checkout from "./components/checkout/Checkout";
import Login from "./components/login/Login";
import OrderHistory from "./components/orderHistory/OrderHistory";
import AddressEdit from "./components/addressEdit/AddressEdit";
import RestaurantMenu from "./components/restaurantMenu/RestaurantMenu";
import { CartProvider } from "./CartContext";
import ChatBot from "./components/ChatBot";
import Footer from "./components/footer/Footer";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check local storage for user data on initial load
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <CartProvider>
      <Router>
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/address-edit" element={<AddressEdit />} />
          <Route path="/restaurant/:id" element={<RestaurantMenu />} />
        </Routes>
      </Router>
      <ChatBot />
      <Footer />
    </CartProvider>
  );
}

export default App;

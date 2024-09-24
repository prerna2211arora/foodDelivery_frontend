// src/CartContext.js
import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState({
    houseNumber: "123 Main St", // Default house number
    city: "Springfield", // Default city
    state: "IL", // Default state
    pincode: "62701", // Default pincode
  });

  //   const addToCart = (item) => {
  //     setCart((prevCart) => {
  //       const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
  //       if (existingItem) {
  //         return prevCart.map((cartItem) =>
  //           cartItem.id === item.id
  //             ? { ...cartItem, quantity: cartItem.quantity + 1 }
  //             : cartItem
  //         );
  //       } else {
  //         return [...prevCart, { ...item, quantity: 1 }];
  //       }
  //     });
  //   };
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem.menu_id === item.menu_id
      ); // Use menu_id
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.menu_id === item.menu_id // Use menu_id for comparison
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  //   const removeFromCart = (item) => {
  //     setCart((prevCart) => {
  //       const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
  //       if (existingItem && existingItem.quantity > 1) {
  //         return prevCart.map((cartItem) =>
  //           cartItem.id === item.id
  //             ? { ...cartItem, quantity: cartItem.quantity - 1 }
  //             : cartItem
  //         );
  //       } else {
  //         return prevCart.filter((cartItem) => cartItem.id !== item.id);
  //       }
  //     });
  //   };
  const removeFromCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem.menu_id === item.menu_id
      ); // Use menu_id
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((cartItem) =>
          cartItem.menu_id === item.menu_id // Use menu_id for comparison
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      } else {
        return prevCart.filter((cartItem) => cartItem.menu_id !== item.menu_id); // Use menu_id
      }
    });
  };

  // New function to update item quantity
  const updateCartQuantity = (cartId, newQuantity) => {
    setCart((prevCart) => {
      return prevCart.map((item) =>
        item.cart_id === cartId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        updateCartQuantity, // Added to allow updating item quantities
        clearCart,
        address,
        setAddress,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

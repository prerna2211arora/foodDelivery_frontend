import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-10">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} YourFoodDelivery. All rights reserved.</p>
        <div className="flex justify-center space-x-6 mt-2">
          <a href="/about" className="hover:text-gray-400">About Us</a>
          <a href="/contact" className="hover:text-gray-400">Contact</a>
          <a href="/privacy-policy" className="hover:text-gray-400">Privacy Policy</a>
        </div>
        <div className="mt-4">
          <p className="text-sm">
            Follow us on: 
            <a href="https://www.facebook.com" className="hover:text-gray-400 ml-2">Facebook</a> | 
            <a href="https://www.twitter.com" className="hover:text-gray-400 ml-2">Twitter</a> | 
            <a href="https://www.instagram.com" className="hover:text-gray-400 ml-2">Instagram</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

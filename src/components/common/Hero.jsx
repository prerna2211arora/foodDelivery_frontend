// src/components/common/Hero.jsx
import React from "react";

const Hero = ({ title, subtitle, imageUrl }) => {
  return (
    <div
      className="relative w-full h-64 flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative text-center text-white z-10">
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        <p className="text-lg">{subtitle}</p>
      </div>
    </div>
  );
};

export default Hero;

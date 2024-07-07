import React from 'react';

const Hero = ({ title, subtitle }) => {
  return (
    <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md my-6">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-xl">{subtitle}</p>
    </div>
  );
};

export default Hero;

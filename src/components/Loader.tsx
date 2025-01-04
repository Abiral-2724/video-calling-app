import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="relative w-16 h-16">
        <div className="absolute w-16 h-16 border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full animate-spin"></div>
        <div className="absolute w-12 h-12 m-2 border-4 border-t-transparent border-r-sky-400 border-b-transparent border-l-sky-400 rounded-full animate-spin-slow"></div>
        <div className="absolute w-8 h-8 m-4 border-4 border-t-blue-300 border-r-transparent border-b-blue-300 border-l-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Loader
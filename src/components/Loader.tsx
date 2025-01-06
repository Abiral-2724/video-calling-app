import React from 'react';

interface LoaderProps {
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({ className }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="relative w-16 h-16">
        {/* Outer ring */}
        <div className="absolute w-16 h-16 border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full animate-spin"></div>
        {/* Middle ring */}
        <div className="absolute w-12 h-12 m-2 border-4 border-t-transparent border-r-sky-400 border-b-transparent border-l-sky-400 rounded-full animate-[spin_2s_linear_infinite]"></div>
        {/* Inner ring */}
        <div className="absolute w-8 h-8 m-4 border-4 border-t-blue-300 border-r-transparent border-b-blue-300 border-l-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Loader;
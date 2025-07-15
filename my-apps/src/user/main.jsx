import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './navbar';

const Main = () => {
  return (
    <div className="flex w-full h-screen">
      {/* Fixed Navbar on the left */}
      <div className="fixed top-0 left-0 h-full w-[100px] sm:w-[150px] md:w-[200px] bg-gray-100 p-4">
        <Navbar />
      </div>

      {/* Right-side content area with left margin */}
      <div className="flex-1 p-4 overflow-auto ml-[100px] sm:ml-[150px] md:ml-[200px]">
        <Outlet />
      </div>
    </div>
  );
};

export default Main;

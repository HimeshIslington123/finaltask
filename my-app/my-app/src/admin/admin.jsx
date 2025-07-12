// src/admin/Admin.js
import React from "react";
import { Link, Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <div className="p-[2px] flex h-screen gap-[3px] sm:gap-[10px]">
      
      {/* Left Panel - fixed sidebar */}
      <div className="flex-[1] flex flex-col justify-around border border-gray-300 h-full p-[10px] bg-gray-100 rounded-lg shadow-sm">
        <h1 className="text-[13px] text-center mb-[5px] sm:text-[30px] sm:mb-[10px]">Admin panel</h1>

        <ul className="flex flex-col gap-[10px] text-[12px] sm:text-[25px]">
          <li>
            <Link to="task" className="block border bg-blue-400 text-white text-center border-blue-500 rounded-full py-[6px] sm:py-[10px]">
               task
            </Link>
          </li>
          <li>
            <Link to="addTask" className="block border bg-blue-400 text-white text-center border-blue-500 rounded-full py-[6px] sm:py-[10px]">
              Add Task
            </Link>
          </li>
          <li>
            <Link to="add_user" className="block border bg-blue-400 text-white text-center border-blue-500 rounded-full py-[6px] sm:py-[10px]">
              Add user
            </Link>
          </li>
          <li>
            <Link to="manage_user" className="block border bg-blue-400 text-white text-center border-blue-500 rounded-full py-[6px] sm:py-[10px]">
              Manage user
            </Link>
          </li>
        </ul>

        <button className="bg-red-500 text-white px-4 py-2 rounded-full mt-auto">
          Logout
        </button>
      </div>

      {/* Right Panel - render nested routes here */}
      <div className="flex-[3] border border-black p-[6px] bg-white h-full  rounded-lg shadow-md overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;

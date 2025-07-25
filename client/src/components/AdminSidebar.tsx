import React, { useState } from "react";
import { NavLink } from "react-router";

const sidebarItems = [
  { label: "Users", path: "/users" },
];

const MenuIcon = () => (
  <svg
    className="w-6 h-6 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="2"
      d="M5 7h14M5 12h14M5 17h14"
    />
  </svg>
);

const AdminSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
   <div
      className={`bg-gray-900 text-white transition-all duration-300 flex flex-col ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      
      <button onClick={toggleSidebar} className="p-4 bg-gray-900">
        <div className="flex items-center space-x-2 cursor-pointer">
          <MenuIcon />
          {isOpen && <p className="text-white text-lg">Dashboard</p>}
        </div>
      </button>

      <div className={`flex flex-col ${isOpen ? "block" : "hidden"} md:block p-6`}>
        {sidebarItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className="mb-2 text-center hover:bg-blue-500 bg-gray-800 px-4 py-2 mb-6 rounded"
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;

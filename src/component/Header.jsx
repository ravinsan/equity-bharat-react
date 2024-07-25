import React, { useState } from 'react'
import {
  UserCircleIcon,
  ChevronDownIcon,
  ArrowRightOnRectangleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";


export const Header = () => {

  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  
  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };

  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logged out");
  };
  
  return (
    <>
    <div className="bg-white shadow p-4 flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Dashboard</h2>
          <div className="relative">
            <button
              onClick={toggleUserDropdown}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <UserCircleIcon className="h-8 w-8 text-gray-700" />
              <ChevronDownIcon className="h-5 w-5 text-gray-700" />
            </button>
            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
                <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
                  <UserIcon className="h-5 w-5 mr-2 text-gray-600" />
                  Profile
                </a>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5 inline mr-2 text-gray-600" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
    </>
  )
}

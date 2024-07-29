import React, { useState } from 'react';
import {
  UserCircleIcon,
  ChevronDownIcon,
  ArrowRightOnRectangleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/profileReducer';
import { useNavigate } from 'react-router-dom';

export const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  
  const toggleUserDropdown = (state) => {
    setUserDropdownOpen(state);
  };

  const profile = useSelector((state) => state.profile.profile);

  console.log(profile);
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("You have successfully logged out!");
    dispatch(logout());
    navigate("/");
  };
  
  return (
    <>
      <div className="bg-white shadow p-4 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <div 
          className="relative"
          onMouseEnter={() => toggleUserDropdown(true)}
          onMouseLeave={() => toggleUserDropdown(false)}
        >
          <button
            className="flex items-center space-x-2 focus:outline-none"
          >
            <UserCircleIcon className="h-8 w-8 text-gray-700" />
            <ChevronDownIcon className="h-5 w-5 text-gray-700" />
          </button>
          <div
            className={`absolute right-0 mt-0 w-48 bg-white rounded-md shadow-lg py-2 z-20 transition-transform duration-1000 ease-out ${
              userDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
            }`}
          >
            <div className="px-4 py-2 border-b border-gray-200">
              <div className="font-semibold">{profile?.name}</div>
              <div className="text-sm text-gray-600">{profile?.email}</div>
            </div>
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
        </div>
      </div>
    </>
  )
}

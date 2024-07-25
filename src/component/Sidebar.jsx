import React, { useState } from 'react';
import {
  ChartBarIcon,
  UserGroupIcon,
  HomeIcon,
  ChevronDownIcon,
  UserIcon,
  Cog8ToothIcon,
  LockClosedIcon,
  Bars3Icon, // Import a menu icon for the toggle button
  XMarkIcon, // Import a close icon
} from "@heroicons/react/24/outline";
import { Link } from 'react-router-dom';

export const Sidebar = () => {
  const [settingsDropdownOpen, setSettingsDropdownOpen] = useState(false);
  const [toggleSectionOpen, setToggleSectionOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null); // State to track the open dropdown

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <div className={`relative ${sidebarOpen ? 'w-64' : 'w-16'} bg-blue-900 text-white transition-all duration-300`}>
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute top-4 right-4 p-2 bg-blue-800 rounded-full text-white"
      >
        {sidebarOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
      </button>
      <div className={`p-4 ${!sidebarOpen && 'hidden'}`}>
        <Link to="/dashboard" className="text-xl font-bold hover:underline">
          Admin Dashboard
        </Link>
      </div>
      <nav className="mt-4">
        <ul>
          <li>
            <Link to="/dashboard" className="flex items-center py-2 px-4 hover:bg-blue-700">
              <HomeIcon className={`h-6 w-6 ${!sidebarOpen && 'mx-auto'}`} />
              {sidebarOpen && 'Home'}
            </Link>
          </li>
          <li>
            <Link to="/users" className="flex items-center py-2 px-4 hover:bg-blue-700">
              <UserGroupIcon className={`h-6 w-6 ${!sidebarOpen && 'mx-auto'}`} />
              {sidebarOpen && 'Users'}
            </Link>
          </li>
          <li>
            <Link to="/analytics" className="flex items-center py-2 px-4 hover:bg-blue-700">
              <ChartBarIcon className={`h-6 w-6 ${!sidebarOpen && 'mx-auto'}`} />
              {sidebarOpen && 'Analytics'}
            </Link>
          </li>
          <li className="relative">
            <button
              onClick={() => toggleDropdown('settings')}
              className="flex items-center py-2 px-4 w-full text-left hover:bg-blue-700"
            >
              <Cog8ToothIcon className={`h-6 w-6 ${!sidebarOpen && 'mx-auto'}`} />
              {sidebarOpen && <span>Settings</span>}
              <ChevronDownIcon className="h-5 w-5 ml-auto" />
            </button>
            {openDropdown === 'settings' && (
              <div className="absolute left-0 mt-2 w-full bg-blue-800 text-white rounded-md shadow-lg py-2 z-20">
                <Link to="/settings" className="flex items-center px-4 py-2 hover:bg-blue-700">
                  <Cog8ToothIcon className="h-5 w-5 mr-2" />
                  {sidebarOpen && 'General Settings'}
                </Link>
                <Link to="/roles" className="flex items-center px-4 py-2 hover:bg-blue-700">
                  <UserIcon className="h-5 w-5 mr-2" />
                  {sidebarOpen && 'Roles'}
                </Link>
                <Link to="/permissions" className="flex items-center px-4 py-2 hover:bg-blue-700">
                  <LockClosedIcon className="h-5 w-5 mr-2" />
                  {sidebarOpen && 'Permissions'}
                </Link>
              </div>
            )}
          </li>
          <li className="relative">
            <button
              onClick={() => toggleDropdown('more')}
              className="flex items-center py-2 px-4 w-full text-left hover:bg-blue-700"
            >
              <Bars3Icon className={`h-6 w-6 ${!sidebarOpen && 'mx-auto'}`} />
              {sidebarOpen && <span>More</span>}
              <ChevronDownIcon className="h-5 w-5 ml-auto" />
            </button>
            {openDropdown === 'more' && (
              <div className="absolute left-0 mt-2 w-full bg-blue-800 text-white rounded-md shadow-lg py-2 z-20">
                <Link to="/extra1" className="flex items-center px-4 py-2 hover:bg-blue-700">
                  <UserIcon className="h-5 w-5 mr-2" />
                  {sidebarOpen && 'Extra Item 1'}
                </Link>
                <Link to="/extra2" className="flex items-center px-4 py-2 hover:bg-blue-700">
                  <UserIcon className="h-5 w-5 mr-2" />
                  {sidebarOpen && 'Extra Item 2'}
                </Link>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

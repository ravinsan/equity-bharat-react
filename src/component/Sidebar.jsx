import { useState } from "react";
import {
  ChartBarIcon,
  UserGroupIcon,
  HomeIcon,
  ChevronDownIcon,
  UserIcon,
  Cog8ToothIcon,
  LockClosedIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (dropdown) => {
    if (sidebarOpen) {
      setOpenDropdown(openDropdown === dropdown ? null : dropdown);
    } else {
      setSidebarOpen(true);
      setOpenDropdown(dropdown);
    }
  };

  const toggleSidebar = () => {
    if (sidebarOpen) {
      setOpenDropdown(null);
    }
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div
      className={`relative h-screen ${
        sidebarOpen ? "w-64" : "w-16"
      } bg-blue-900 text-white transition-all duration-300 flex flex-col`}
    >
      <button
        onClick={toggleSidebar}
        className="absolute top-4 right-4 p-2 bg-blue-800 rounded-full text-white focus:outline-none"
      >
        {sidebarOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <Bars3Icon className="h-6 w-6" />
        )}
      </button>
      <div className="p-4">
        <Link
          to="/dashboard"
          className="text-xl font-bold hover:underline block mb-4"
        >
          {sidebarOpen && "Admin Dashboard"}
        </Link>
      </div>
      <nav className="mt-4 flex-grow overflow-y-auto">
        <ul className="flex flex-col space-y-2">
          {/* this is the home link */}
          <li>
            <Link
              to="/dashboard"
              className="flex items-center py-2 px-4 hover:bg-blue-700 transition-colors duration-200"
            >
              <HomeIcon className={`h-6 w-6 ${!sidebarOpen && "mx-auto"}`} />
              {sidebarOpen && <span className="ml-3">Home</span>}
            </Link>
          </li>
          {/* this is the users link */}
          <li>
            <Link
              to="/users"
              className="flex items-center py-2 px-4 hover:bg-blue-700 transition-colors duration-200"
            >
              <UserGroupIcon
                className={`h-6 w-6 ${!sidebarOpen && "mx-auto"}`}
              />
              {sidebarOpen && <span className="ml-3">Users</span>}
            </Link>
          </li>
          {/* this is the analytics link */}
          <li>
            <Link
              to="/analytics"
              className="flex items-center py-2 px-4 hover:bg-blue-700 transition-colors duration-200"
            >
              <ChartBarIcon
                className={`h-6 w-6 ${!sidebarOpen && "mx-auto"}`}
              />
              {sidebarOpen && <span className="ml-3">Analytics</span>}
            </Link>
          </li>
          {/* this is the settings link */}
          <li className="relative">
            <button
              onClick={() => toggleDropdown("settings")}
              className="flex items-center py-2 px-4 w-full text-left hover:bg-blue-700 transition-colors duration-200 focus:outline-none"
            >
              <Cog8ToothIcon
                className={`h-6 w-6 ${!sidebarOpen && "mx-auto"}`}
              />
              {sidebarOpen && <span className="ml-3">Settings</span>}
              {sidebarOpen && <ChevronDownIcon className="h-5 w-5 ml-auto" />}
            </button>
            {openDropdown === "settings" && sidebarOpen && (
              <div className="bg-blue-800 text-white rounded-md shadow-lg py-2">
                <Link
                  to="/settings"
                  className="flex items-center px-4 py-2 hover:bg-blue-700 transition-colors duration-200"
                >
                  <Cog8ToothIcon className="h-5 w-5 mr-2" />
                  <span>General Settings</span>
                </Link>
                <Link
                  to="/roles"
                  className="flex items-center px-4 py-2 hover:bg-blue-700 transition-colors duration-200"
                >
                  <UserIcon className="h-5 w-5 mr-2" />
                  <span>Roles</span>
                </Link>

                <Link
                  to="/permissions"
                  className="flex items-center px-4 py-2 hover:bg-blue-700 transition-colors duration-200"
                >
                  <LockClosedIcon className="h-5 w-5 mr-2" />
                  <span>Permissions</span>
                </Link>
              </div>
            )}
          </li>
          {/* this is the more link */}
          <li className="relative">
            <button
              onClick={() => toggleDropdown("more")}
              className="flex items-center py-2 px-4 w-full text-left hover:bg-blue-700 transition-colors duration-200 focus:outline-none"
            >
              <Bars3Icon className={`h-6 w-6 ${!sidebarOpen && "mx-auto"}`} />
              {sidebarOpen && <span className="ml-3">More</span>}
              {sidebarOpen && <ChevronDownIcon className="h-5 w-5 ml-auto" />}
            </button>
            {openDropdown === "more" && sidebarOpen && (
              <div className="bg-blue-800 text-white rounded-md shadow-lg py-2">
                <Link
                  to="/extra1"
                  className="flex items-center px-4 py-2 hover:bg-blue-700 transition-colors duration-200"
                >
                  <UserIcon className="h-5 w-5 mr-2" />
                  <span>Extra Item 1</span>
                </Link>
                <Link
                  to="/extra2"
                  className="flex items-center px-4 py-2 hover:bg-blue-700 transition-colors duration-200"
                >
                  <UserIcon className="h-5 w-5 mr-2" />
                  <span>Extra Item 2</span>
                </Link>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

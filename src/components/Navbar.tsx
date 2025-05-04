'use client'

import { FiSearch, FiUser, FiMenu } from 'react-icons/fi'

interface NavbarProps {
  toggleSidebar: () => void
}

export default function Navbar({ toggleSidebar }: NavbarProps) {
  const navItems = [
    'projects', 'clients', 
  ]

  return (
    <header className="bg-white shadow-sm w-full">
      {/* Top Bar - Contains everything */}
      <div className="flex flex-col">
        {/* First Row - Menu, Nav Items, User */}
        <div className="flex items-center justify-between px-4 py-3">
          {/* Mobile menu button */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            aria-label="Toggle sidebar"
          >
            <FiMenu className="" />
          </button>

          {/* Desktop Nav Items - Left Side */}
          <div className="hidden lg:flex items-center space-x-4 flex-1 ml-4 overflow-x-auto scrollbar-hide">
            {navItems.map((item) => (
              <a
                key={item}
                href={`/${item}`}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 whitespace-nowrap"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Mobile Nav Items - Scrollable */}
          <div className="lg:hidden flex-1 mx-2 overflow-x-auto scrollbar-hide">
            <div className="flex space-x-4 px-2 whitespace-nowrap">
              {navItems.slice(0, 4).map((item) => (
                <a
                  key={item}
                  href="#"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Search and User - Right Side */}
          {/* <div className="flex items-end"> */}
            {/* User Icon */}
            {/* <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white"> */}
              {/* <FiUser className="h-5 w-5" /> */}
            {/* </div> */}
          {/* </div> */}
        </div>






        {/* Mobile Search Bar - Second Row */}
        <div className="lg:hidden flex items-center px-4 pb-3">
          <div className="relative flex-1 mr-3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search..."
            />
          </div>
          {/* Mobile User Icon - Only shows if search is focused */}
          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
            <FiUser className="h-5 w-5" />
          </div>
        </div>

      </div>
    </header>
  )
}
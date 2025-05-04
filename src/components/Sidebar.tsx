'use client'

import {  FiDatabase, FiUsers,  FiLogOut } from 'react-icons/fi'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Sidebar() {
  const pathname = usePathname()

  const navItems = [
    { name: 'Projects', icon: FiDatabase, path: '/projects' },
    { name: 'Clients', icon: FiUsers, path: '/clients' },
    // { name: 'Team', icon: FiUsers, path: '/team' },
    // { name: 'Calendar', icon: FiCalendar, path: '/calendar' },
    // { name: 'Documents', icon: FiFileText, path: '/documents' },
    // { name: 'Settings', icon: FiSettings, path: '/settings' },
  ]

  return (
    <div className="flex flex-col w-64 h-full bg-gradient-to-b from-blue-700 to-blue-800 text-white">
      {/* Logo/Brand */}
      <div className="flex items-center justify-center h-16 px-4 border-b border-blue-600">
        <h1 className="text-xl font-bold">Project Management</h1>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.path
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-600 shadow-md'
                  : 'hover:bg-blue-600/50'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="ml-3 font-medium">{item.name}</span>
              {isActive && (
                <span className="ml-auto h-2 w-2 rounded-full bg-white"></span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-blue-600">
        <button className="flex items-center w-full px-4 py-3 rounded-lg hover:bg-blue-600/50">
          <FiLogOut className="h-5 w-5" />
          <span className="ml-3 font-medium">Logout</span>
        </button>

        {/* User Profile Mini */}
        <div className="flex items-center mt-4 pt-4 border-t border-blue-600">
          <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
            <FiUsers className="h-5 w-5" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">Ankit Wariyal</p>
            <p className="text-xs text-blue-200">Admin</p>
          </div>
        </div>
      </div>
    </div>
  )
}
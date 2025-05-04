"use client";

import { ReactNode, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

interface LayoutWrapperProps {
  children: ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Desktop Sidebar - shown on md and larger screens */}
      <div className="hidden md:fixed md:inset-y-0 md:z-40 md:flex md:w-64">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar - shown only on small screens */}
      <div
        className={`
          fixed inset-y-0 z-50 w-64 transform transition-all duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:hidden
        `}
      >
        <Sidebar />
      </div>
      
      {/* Navbar - full width on small screens, adjusted on md and larger */}
      <div className="md:w-[calc(100%-16rem)] fixed top-0 right-0 w-full z-10">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      </div>
      
      {/* Main content area */}
      <div className="h-full md:w-[calc(100%-16rem)] w-full relative md:left-64 top-28 md:top-24 z-0 lg:top-16">
        {children}
      </div>
    </div>
  );
}
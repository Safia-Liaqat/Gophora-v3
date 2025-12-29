import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[#0B1021] text-white flex flex-col">
      {/* 1. Navbar stays at the top of all main pages */}
      <Navbar />

      {/* 2. Content Area */}
      {/* pt-20 (padding-top) ensures content starts below the sticky/fixed navbar */}
      <div className="flex-1 pt-6"> 
        <Outlet />
      </div>
    </div>
  );
}
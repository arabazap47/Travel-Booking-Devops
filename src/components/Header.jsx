import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserFromToken, logout } from "../utils/auth";

export default function Header() {
  const navigate = useNavigate();
  const user = getUserFromToken();
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
            T
          </div>
          <Link
            to="/user"
            className="text-2xl font-bold text-gray-800 hover:text-primary transition-colors"
          >
            Travelly
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/user")}
            className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
          >
            Home
          </button>

          {/* <Link
            to="/search"
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-accent transition"
          >
            Search hotel
          </Link> */}

          {/* Profile Dropdown */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-3 py-2 border rounded-full hover:bg-gray-100"
              >
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
                  {user.role?.[0] || "U"}
                </div>
                <span className="text-gray-700 text-sm">Profile</span>
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-50">
                  <div className="px-4 py-3 border-b">
                    <p className="text-sm text-gray-500">Logged in as-</p>
                    <p className="font-semibold text-gray-800">
                      {user.name || "User"}
                    </p>
                    <p className="text-xs text-gray-500">{user.role}</p>
                  </div>
                  <button
  onClick={() => navigate("/my-bookings")}
  className="w-full text-left px-4 py-2 hover:bg-gray-100"
>
  Your Bookings
</button>


                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
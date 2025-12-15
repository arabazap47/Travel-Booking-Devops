import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Header() {
  const navigate = useNavigate()

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
            T
          </div>
          <Link 
            to="/" 
            className="text-2xl font-bold text-gray-800 hover:text-primary transition-colors"
          >
            Travelly
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/')} 
            className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
          >
            Home
          </button>
          <Link 
            to="/search" 
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-accent transition"
          >
            Search H
          </Link>
        </div>
      </div>
    </header>
  )
}


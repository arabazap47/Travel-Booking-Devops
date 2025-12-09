import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SearchResults from './pages/SearchResults'
import HotelDetails from './pages/HotelDetails'
import Booking from './pages/Booking'
import Header from './components/Header'
import Footer from './components/Footer'

export default function App(){
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/search" element={<SearchResults/>} />
          <Route path="/hotel/:id" element={<HotelDetails/>} />
          <Route path="/booking/:id" element={<Booking/>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

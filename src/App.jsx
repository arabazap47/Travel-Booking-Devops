import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import HotelDetails from "./pages/HotelDetails";
import Booking from "./pages/Booking";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import OwnerDashboard from "./pages/OwnerDashboard";
import AdminDashboard from "./pages/AdminDashBoard";


export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Routes>
  <Route path="/" element={<Login />} />

  <Route path="/user" element={
    <ProtectedRoute role="USER">
      <Home />
    </ProtectedRoute>
  } />

  <Route path="/owner" element={
    <ProtectedRoute role="OWNER">
      <OwnerDashboard />
    </ProtectedRoute>
  } />

  <Route path="/admin" element={
    <ProtectedRoute role="ADMIN">
      <AdminDashboard />
    </ProtectedRoute>
  } />

  <Route path="/search" element={<SearchResults />} />

  {/* PUBLIC ROUTES */}
  <Route path="/hotel/:id" element={<HotelDetails />} />
  <Route path="/booking/:id" element={<Booking />} />
</Routes>


      </main>

      <Footer />
    </div>
  );
}

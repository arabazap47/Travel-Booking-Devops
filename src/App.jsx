// import React from "react";
// import { Routes, Route, useLocation } from "react-router-dom";

// import Login from "./pages/Login";
// import Home from "./pages/Home";
// import SearchResults from "./pages/SearchResults";
// import HotelDetails from "./pages/HotelDetails";
// import Booking from "./pages/Booking";

// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import ProtectedRoute from "./components/ProtectedRoute";
// // import OwnerDashboard from "./pages/OwnerDashboard";

// function AppLayout() {
//   const location = useLocation();

//   return (
//     <>
//       {location.pathname !== "/login" && <Navbar />}

//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/" element={<Home />} />
//       </Routes>
//     </>
//   );
// }

// export default function App() {
//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <Header />

//       <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//           <Routes>
//   {/* <Route path="/" element={<Login />} /> */}
    
//   <Route path="/user" element={
//     <ProtectedRoute role="USER">
//       <Home />
//     </ProtectedRoute>
//   } />

//   {/* <Route path="/owner" element={
//     <ProtectedRoute role="OWNER">
//       <OwnerDashboard />
//     </ProtectedRoute>
//   } />

//   <Route path="/admin" element={
//     <ProtectedRoute role="ADMIN">
//       <AdminDashboard />
//     </ProtectedRoute>
//   } /> */}

//   <Route path="/search" element={<SearchResults />} />

//   {/* PUBLIC ROUTES */}
//   <Route path="/hotel/:id" element={<HotelDetails />} />
//   <Route path="/booking/:id" element={<Booking />} />
// </Routes>


//       </main>

//       <Footer />
//     </div>
//   );
// }

import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import HotelDetails from "./pages/HotelDetails";
import Booking from "./pages/Booking";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

function AppLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      
      {/* Header only for non-login pages */}
      {!isLoginPage && <Header />}

      {/* MAIN CONTENT */}
      <main className={!isLoginPage ? "flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" : ""}>
        <Routes>
          {/* PUBLIC */}
          <Route path="/login" element={<Login />} />
          <Route path="/hotel/:id" element={<HotelDetails />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/search" element={<SearchResults />} />

          {/* PROTECTED */}
          <Route
            path="/user"
            element={
              <ProtectedRoute role="USER">
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      {/* Footer only for non-login pages */}
      {!isLoginPage && <Footer />}
    </div>
  );
}

export default function App() {
  return <AppLayout />;
}

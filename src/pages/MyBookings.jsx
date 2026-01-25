import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    api
      .get("/bookings/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setBookings(res.data))
      .catch(() => alert("Failed to load bookings"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="p-6 text-center text-gray-500">Loading your bookings...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Your Bookings</h2>
        <button
          onClick={() => navigate("/user")}
          className="px-4 py-2 rounded-md bg-primary text-white hover:bg-accent transition"
        >
          Back to Home
        </button>
      </div>

      {bookings.length === 0 && (
        <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-500">
          You have not made any bookings yet.
        </div>
      )}

      <div className="space-y-6">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="w-full bg-gradient-to-r from-white to-gray-50 border rounded-2xl shadow-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {b.hotelName}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Guests: <span className="font-medium">{b.guests}</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Booked on {new Date(b.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => navigate("/user")}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Home
              </button>
              <button
                className="px-4 py-2 rounded-md bg-primary text-white hover:bg-accent transition"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

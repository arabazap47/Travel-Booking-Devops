import React, { useEffect, useState } from "react";
import api from "../services/api";


export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p className="p-6">Loading your bookings...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Your Bookings</h2>

      {bookings.length === 0 && (
        <p className="text-gray-500">No bookings found.</p>
      )}

      {bookings.map((b) => (
        <div
          key={b._id}
          className="bg-white shadow-md rounded-lg p-4 flex justify-between"
        >
          <div>
            <h3 className="font-semibold text-lg">{b.hotelName}</h3>
            <p className="text-sm text-gray-600">
              Guests: {b.guests}
            </p>
            <p className="text-xs text-gray-500">
              Booked on {new Date(b.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

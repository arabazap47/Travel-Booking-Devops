import React from 'react'
import { useNavigate } from 'react-router-dom'
console.log("Hotel data:", hotel);

export default function HotelCard({ hotel, checkin, checkout, guests }) {
  const navigate = useNavigate()
  const hotelId = hotel?._id || hotel?.id;

  if (!hotelId) {
    console.error("Hotel ID missing:", hotel);
    return null;
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
      <div className="w-full md:w-48 h-40 bg-gray-200 flex-shrink-0">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{hotel.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{hotel.location}</p>
          <div className="mt-2 text-yellow-600 font-medium">{hotel.rating} ★</div>
        </div>
        <div className="mt-4 text-right">
          <div className="text-xl font-bold text-gray-800">₹{hotel.price}</div>
          <div className="text-sm text-gray-500">per night</div>
            <button
  onClick={() =>
    navigate(`/hotel/${hotelId}`, {
      state: {
        checkin,
        checkout,
        guests
      }
    })
  }
  className="mt-2 px-3 py-1 bg-primary text-white rounded"
>
  View
</button>



        </div>
      </div>
    </div>
  )
}

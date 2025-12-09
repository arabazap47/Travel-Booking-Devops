import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import BookingForm from '../components/BookingForm'

export default function Booking() {
  const { id } = useParams()
  const [hotel, setHotel] = useState(null)

  useEffect(() => {
    axios.get(`/api/hotels/${id}`)
      .then(res => setHotel(res.data))
      .catch(() => setHotel(null))
  }, [id])

  if (!hotel) return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-600">Loading...</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">Booking - {hotel.name}</h2>
        <p className="text-gray-500 mt-1">{hotel.location}</p>
        <BookingForm hotel={hotel} />
      </div>

      <aside className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800">Price Summary</h3>
        <div className="mt-2 text-gray-700">₹{hotel.price} x nights</div>
      </aside>
    </div>
  )
}

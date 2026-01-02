import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import api from '../services/api'
import BookingForm from '../components/BookingForm'

export default function Booking() {
  const { id } = useParams()
  const location = useLocation()

  const { checkin, checkout, guests } = location.state || {}

  const [hotel, setHotel] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    api.get(`/hotels/${id}`)
      .then(res => setHotel(res.data))
      .catch(err => {
        console.error(err)
        setHotel(null)
      })
      .finally(() => setLoading(false))
  }, [id])

  // Safety checks
  if (!checkin || !checkout) {
    return (
      <div className="p-6 text-center text-red-600">
        Please select check-in and check-out dates.
      </div>
    )
  }

  if (loading) {
    return <div className="p-6 text-center">Loading booking details...</div>
  }

  if (!hotel) {
    return <div className="p-6 text-center">Hotel not found.</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold">Booking - {hotel.name}</h2>
        <p className="text-gray-500">{hotel.location}</p>

        <BookingForm
          hotel={hotel}
          checkin={checkin}
          checkout={checkout}
          guests={guests}
        />
      </div>

      <aside className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold">Price Summary</h3>
        <div className="mt-2">₹{hotel.price} / night</div>
      </aside>
    </div>
  )
}


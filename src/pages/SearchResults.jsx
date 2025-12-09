import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import HotelCard from '../pages/HotelCard'

export default function SearchResults() {
  const [params] = useSearchParams()
  const city = params.get('city') || ''
  const checkin = params.get('checkin') || ''
  const checkout = params.get('checkout') || ''
  const guests = params.get('guests') || 2

  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')
    axios
      .get(`http://localhost:5000/api/hotels?city=${encodeURIComponent(city)}`)
      .then((res) => {
        setHotels(res.data)
        if (res.data.length === 0) setError('No results found.')
      })
      .catch(() => setError('Failed to fetch hotels.'))
      .finally(() => setLoading(false))
  }, [city])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {city ? `Stays in ${city}` : 'All Stays'}
      </h2>

      {loading && <div className="text-gray-500">Loading...</div>}

      {!loading && error && (
        <div className="text-center text-red-500 font-semibold py-6">{error}</div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      )}
    </div>
  )
}

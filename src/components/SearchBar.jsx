import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import api from '../services/api'
import HotelCard from '../pages/HotelCard'

export default function SearchBar({ initialCity = '' }) {
  const [city, setCity] = useState(initialCity)
  const [checkin, setCheckin] = useState('')
  const [checkout, setCheckout] = useState('')
  const [guests, setGuests] = useState(2)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const navigate = useNavigate()

  // Live search: fetch hotels as user types
  useEffect(() => {
    if (city.trim() === '') {
      setResults([])
      setError('')
      return
    }

    setLoading(true)
     api
      .get(`/hotels?city=${encodeURIComponent(city)}`)
      .then((res) => {

    
        setResults(res.data)
        if (res.data.length === 0) setError('No results found.')
        else setError('')
      })
      .catch(() => setError('Failed to fetch hotels.'))
      .finally(() => setLoading(false))
  }, [city])

  // Handle full form submit
  const handleSubmit = (e) => {
    e.preventDefault()
    const params = new URLSearchParams({ city, checkin, checkout, guests })
    navigate(`/search?${params.toString()}`)
  }

  return (
    <div className="space-y-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-4 grid grid-cols-1 md:grid-cols-5 gap-4 items-end"
      >
        {/* City */}
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-gray-500">Where</label>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City, hotel, landmark"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition"
          />
        </div>

        {/* Check-in */}
        <div>
          <label className="block text-xs font-semibold text-gray-500">Check-in</label>
          <input
            type="date"
            value={checkin}
            onChange={(e) => setCheckin(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition"
          />
        </div>

        {/* Check-out */}
        <div>
          <label className="block text-xs font-semibold text-gray-500">Check-Out</label>
          <input
            type="date"
            value={checkout}
            onChange={(e) => setCheckout(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition"
          />
        </div>

        {/* Guests */}
        <div>
          <label className="block text-xs font-semibold text-gray-500">Guests</label>
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition"
          >
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        {/* Submit button */}
        <div className="md:col-span-5 md:justify-self-end">
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-2 bg-accent text-white font-semibold rounded-md hover:bg-primary transition"
          >
            Search
          </button>
        </div>
      </form>

      {/* Live search results */}
      {loading && <div className="text-gray-500">Loading...</div>}
      {!loading && error && <div className="text-red-500 font-semibold">{error}</div>}
      {!loading && results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.map((hotel) => (
            <HotelCard
            key={hotel.id}
            hotel={hotel}
            checkin={checkin}
            checkout={checkout}
            guests={guests}
            />
            ))}

        </div>
      )}
    </div>
  )
}

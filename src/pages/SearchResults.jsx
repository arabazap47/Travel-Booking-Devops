// import React, { useEffect, useState } from 'react'
// import { useSearchParams } from 'react-router-dom'
// import api from "../services/api"

// import HotelCard from '../pages/HotelCard'

// export default function SearchResults() {
//   const [params] = useSearchParams()
//   const city = params.get('city') || ''
//   const checkin = params.get('checkin') || ''
//   const checkout = params.get('checkout') || ''
//   const guests = params.get('guests') || 2

//   const [hotels, setHotels] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')

//   useEffect(() => {
//     setLoading(true)
//     setError('')
//     api
//       .get(`/hotels?city=${encodeURIComponent(city)}`)
//       .then((res) => {
//         setHotels(res.data)
//         if (res.data.length === 0) setError('No results found.')
//       })
//       .catch(() => setError('Failed to fetch hotels.'))
//       .finally(() => setLoading(false))
//   }, [city])

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
//       <h2 className="text-2xl font-bold text-gray-800 mb-4">
//         {city ? `Stays in ${city}` : 'All Stays'}
//       </h2>

//       {loading && <div className="text-gray-500">Loading...</div>}

//       {!loading && error && (
//         <div className="text-center text-red-500 font-semibold py-6">{error}</div>
//       )}

//       {!loading && !error && (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {hotels.map((hotel) => (
//             <HotelCard key={hotel.id} hotel={hotel} />
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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

  useEffect(() => {
    if (!city.trim()) {
      setResults([])
      setError('')
      return
    }

    setLoading(true)
<<<<<<< HEAD

    api.get(`/hotels?city=${encodeURIComponent(city)}`)
      .then(res => {
        setResults(res.data)
=======
    setError('')
    axios
      .get(`/api/api/hotels?city=${encodeURIComponent(city)}`)
      .then((res) => {
        setHotels(res.data)
>>>>>>> 2d04dc2 (Fix API base URL and frontend fetch logic)
        if (res.data.length === 0) setError('No results found.')
        else setError('')
      })
      .catch(() => setError('Failed to fetch hotels'))
      .finally(() => setLoading(false))
  }, [city])

  const handleSubmit = (e) => {
    e.preventDefault()
    const params = new URLSearchParams({ city, checkin, checkout, guests })
    navigate(`/search?${params.toString()}`)
  }

  return (
    <div className="space-y-4 max-w-7xl mx-auto px-4">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <input value={city} onChange={e => setCity(e.target.value)} />
        <input type="date" value={checkin} onChange={e => setCheckin(e.target.value)} />
        <input type="date" value={checkout} onChange={e => setCheckout(e.target.value)} />
        <select value={guests} onChange={e => setGuests(e.target.value)}>
          {[1,2,3,4].map(n => <option key={n}>{n}</option>)}
        </select>
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {results.map(h => (
          <HotelCard key={h.id} hotel={h} />
        ))}
      </div>
    </div>
  )
}

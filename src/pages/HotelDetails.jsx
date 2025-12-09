import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function HotelDetails() {
  const { id } = useParams()
  const [hotel, setHotel] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    setError('')
    // use full URL to avoid proxy/CORS confusion; change to /api/... if you're using vite proxy
    axios.get(`http://localhost:5000/api/hotels/${id}`)
      .then(res => {
        console.log('HotelDetails response:', res.data)   // <-- debug: inspect response in console
        setHotel(res.data)
      })
      .catch(err => {
        console.error('Error fetching hotel:', err)
        setError('Failed to load hotel details.')
        setHotel(null)
      })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-600">Loading...</div>
  }

  if (error) {
    return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-red-500">{error}</div>
  }

  if (!hotel) {
    return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-600">No hotel found.</div>
  }

  // Defensive display of price
  const priceDisplay = typeof hotel.price !== 'undefined' && hotel.price !== null
    ? `₹${hotel.price}`
    : 'Price not available'

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
        <img src={hotel.image} alt={hotel.name} className="w-full h-64 object-cover rounded" />
        <h2 className="text-3xl font-bold mt-4 text-gray-800">{hotel.name}</h2>
        <p className="text-gray-500 mt-1">{hotel.location}</p>
        <p className="mt-4 text-gray-700">{hotel.description}</p>
      </div>

      <aside className="bg-white rounded-lg shadow-md p-6">
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-800">{priceDisplay}</div>
          <div className="text-sm text-gray-500">per night</div>
        </div>
        <button
          onClick={() => navigate(`/booking/${hotel.id}`)}
          className="mt-4 w-full px-4 py-2 bg-accent text-white rounded hover:bg-primary transition"
        >
          Book Now
        </button>
      </aside>
    </div>
  )
}

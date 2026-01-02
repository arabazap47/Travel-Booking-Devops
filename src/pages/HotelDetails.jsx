import { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import api from '../services/api'
import HotelCard from '../pages/HotelCard'

export default function HotelDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const [hotel, setHotel] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [checkin, setCheckin] = useState(location.state?.checkin || '')
  const [checkout, setCheckout] = useState(location.state?.checkout || '')
  const [guests, setGuests] = useState(location.state?.guests || 1)

  useEffect(() => {
  if (!id) return;

  setLoading(true);
  api.get(`/hotels/${id}`)
    .then(res => setHotel(res.data))
    .catch(err => {
      console.error(err);
      setError("Failed to load hotel details");
    })
    .finally(() => setLoading(false));
}, [id]);


  const handleBooking = () => {
    if (!checkin || !checkout) {
      alert("Please select check-in and check-out dates")
      return
    }

    navigate(`/booking/${id}`, {
      state: { checkin, checkout, guests }
    })
  }

  if (loading) return <div className="p-6 text-center">Loading...</div>
  if (error) return <div className="p-6 text-red-600">{error}</div>
  if (!hotel) return <div className="p-6 text-gray-600">Hotel not found.</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 py-6">

      <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
        <img src={hotel.image} alt={hotel.name} className="w-full h-64 object-cover rounded" />

        <h2 className="text-3xl font-bold mt-4">{hotel.name}</h2>
        <p className="text-gray-500">{hotel.location}</p>
        <p className="mt-4 text-gray-700">{hotel.description}</p>
      </div>

      <aside className="bg-white rounded-lg shadow-md p-6">
        <div className="text-right">
          <div className="text-2xl font-bold">₹{hotel.price}</div>
          <div className="text-sm text-gray-500">per night</div>
        </div>

        <div className="mt-4 space-y-3">
          <input type="date" value={checkin} onChange={e => setCheckin(e.target.value)} className="w-full border p-2 rounded" />
          <input type="date" value={checkout} onChange={e => setCheckout(e.target.value)} className="w-full border p-2 rounded" />
          <input type="number" min="1" value={guests} onChange={e => setGuests(e.target.value)} className="w-full border p-2 rounded" />
        </div>

        <button
          onClick={handleBooking}
          className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Book Now
        </button>
      </aside>
    </div>
  )
}

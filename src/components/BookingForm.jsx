import React, {useState} from 'react'
import axios from 'axios'

export default function BookingForm({hotel}){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)

  const submit = async (e)=>{
    e.preventDefault()
    setLoading(true)
    try{
      const res = await axios.post('/api/bookings', {hotelId: hotel.id, name, email, phone})
      setSuccess(res.data)
    }catch(err){
      setSuccess({error: 'Failed to book'})
    }finally{ setLoading(false) }
  }

  if(success) return (
    <div className="p-4 bg-green-50 rounded max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      Booking confirmed! Reference: {success.ref || 'N/A'}
    </div>
  )

  return (
    <form onSubmit={submit} className="space-y-3 mt-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div>
        <label className="text-sm block mb-1">Full name</label>
        <input value={name} onChange={e=>setName(e.target.value)} className="w-full border rounded px-3 py-2" required />
      </div>
      <div>
        <label className="text-sm block mb-1">Email</label>
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full border rounded px-3 py-2" required />
      </div>
      <div>
        <label className="text-sm block mb-1">Phone</label>
        <input value={phone} onChange={e=>setPhone(e.target.value)} className="w-full border rounded px-3 py-2" required />
      </div>
      <div>
        <button type="submit" disabled={loading} className="px-4 py-2 bg-primary text-white rounded">
          {loading ? 'Booking...' : 'Confirm Booking'}
        </button>
      </div>
    </form>
  )
}

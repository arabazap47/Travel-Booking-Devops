import React, { useState } from "react";
import axios from "axios";

export default function BookingForm({ hotel }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [showPayment, setShowPayment] = useState(false);

  // STEP 1: Submit booking details → move to payment
  const submit = (e) => {
    e.preventDefault();
    setShowPayment(true);
  };

  // STEP 2: UPI Payment → then call backend booking API
  const handlePayment = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/bookings", {
        hotelId: hotel.id,
        name,
        email,
        phone,
        paymentMethod: "UPI",
      });

      setSuccess(res.data);
    } catch (err) {
      setSuccess({ error: "Payment failed or booking error" });
    } finally {
      setLoading(false);
    }
  };

  // STEP 3: Booking success / failure screen
  if (success) {
    return (
      <div className="p-4 bg-green-50 rounded max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {success.error ? (
          <p className="text-red-600 font-medium">{success.error}</p>
        ) : (
          <p className="text-green-700 font-semibold">
            Booking confirmed! Reference: {success.ref || "N/A"}
          </p>
        )}
      </div>
    );
  }

  // STEP 4: Payment screen
  if (showPayment) {
    return (
      <div className="p-6 max-w-2xl mx-auto bg-white rounded shadow mt-6">
        <h2 className="text-xl font-bold mb-2">UPI Payment</h2>
        <p className="text-gray-600 mb-4">
          Complete your booking using UPI
        </p>

        <div className="border rounded p-4 mb-4 bg-gray-50">
          <div className="flex justify-between mb-2">
            <span>Hotel</span>
            <span className="font-medium">{hotel.name}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Amount</span>
            <span className="font-bold text-green-600">
              ₹{hotel.price}
            </span>
          </div>
        </div>

<div className="grid grid-cols-3 gap-4 mb-6">
  {/* Google Pay */}
  <div className="border rounded p-3 flex flex-col items-center gap-2">
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg"
      alt="Google Pay"
      className="h-8"
    />
    <span className="text-sm">Google Pay</span>
  </div>

  {/* PhonePe */}
  <div className="border rounded p-3 flex flex-col items-center gap-2">
    <img
      src="https://cdn.worldvectorlogo.com/logos/phonepe-1.svg"
      alt="PhonePe"
      className="h-8"
    />
    <span className="text-sm">PhonePe</span>
  </div>

  {/* Paytm */}
  <div className="border rounded p-3 flex flex-col items-center gap-2">
    <img
      src="https://cdn.worldvectorlogo.com/logos/paytm-1.svg"
      alt="Paytm"
      className="h-8"
    />
    <span className="text-sm">Paytm</span>
  </div>
</div>


        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full py-3 bg-green-600 text-white rounded font-semibold"
        >
          {loading ? "Processing Payment..." : `Pay ₹${hotel.price}`}
        </button>
      </div>
    );
  }

  // STEP 5: Booking form
  return (
    <form
      onSubmit={submit}
      className="space-y-3 mt-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div>
        <label className="text-sm block mb-1">Full name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="text-sm block mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="text-sm block mb-1">Phone</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded"
        >
          Confirm Booking
        </button>
      </div>
    </form>
  );
}

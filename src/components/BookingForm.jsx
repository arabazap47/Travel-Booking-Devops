import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function BookingForm() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // SAFETY CHECK
  if (!state) {
    navigate("/");
    return null;
  }

  const { hotel, checkin, checkout, guests } = state;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Google Pay");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [showPayment, setShowPayment] = useState(false);

  // CALCULATE NIGHTS (REAL LOGIC)
  const nights = Math.ceil(
    (new Date(checkout) - new Date(checkin)) / (1000 * 60 * 60 * 24)
  );

  const totalAmount = hotel.price * nights;

  // STEP 1: Move to payment screen
  const submit = (e) => {
    e.preventDefault();
    setShowPayment(true);
  };

  // STEP 2: Payment + booking API
  const handlePayment = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/bookings", {
        hotelId: hotel.id,
        hotelName: hotel.name,
        checkin,
        checkout,
        nights,
        guests,
        amount: totalAmount,
        paymentMethod,
        name,
        email,
        phone,
      });

      setSuccess(res.data);
    } catch {
      setSuccess({ error: "Payment failed or booking error" });
    } finally {
      setLoading(false);
    }
  };

  // STEP 3: SUCCESS POPUP
  if (success && !success.error) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
        <div className="bg-white rounded-xl p-6 w-96 text-center shadow-lg">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
              <svg
                className="h-10 w-10 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <h2 className="text-xl font-bold text-green-700 mb-2">
            Booking Confirmed
          </h2>

          <p className="text-gray-600 mb-4">
            Your stay at <strong>{hotel.name}</strong> is confirmed.
          </p>

          <div className="bg-green-50 rounded p-3 text-sm mb-4">
            <p><strong>Booking ID:</strong> {success.ref || "N/A"}</p>
            <p><strong>Total Paid:</strong> ₹{totalAmount}</p>
          </div>

          <button
            onClick={() => navigate("/")}
            className="w-full py-2 bg-green-600 text-white rounded font-semibold"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  // STEP 4: PAYMENT SCREEN
  if (showPayment) {
    return (
      <div className="max-w-2xl mx-auto mt-6 bg-white p-6 rounded shadow">

        <h2 className="text-xl font-bold mb-4">Checkout</h2>

        {/* Booking Summary */}
        <div className="border rounded p-4 mb-4 bg-gray-50">
          <h3 className="font-semibold mb-2">Booking Summary</h3>

          <div className="flex justify-between text-sm mb-1">
            <span>Hotel</span>
            <span>{hotel.name}</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span>Check-in</span>
            <span>{checkin}</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span>Check-out</span>
            <span>{checkout}</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span>Nights</span>
            <span>{nights}</span>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="border rounded p-4 mb-4">
          <h3 className="font-semibold mb-2">Payment Summary</h3>

          <div className="flex justify-between text-sm mb-1">
            <span>Room price</span>
            <span>₹{hotel.price} × {nights}</span>
          </div>

          <div className="flex justify-between font-bold border-t pt-2 mt-2">
            <span>Total Payable</span>
            <span className="text-green-600">₹{totalAmount}</span>
          </div>
        </div>

        {/* Payment Method */}
        <div className="space-y-3 mb-6">
          {[
            { name: "Google Pay", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" },
            { name: "PhonePe", logo: "https://cdn.worldvectorlogo.com/logos/phonepe-1.svg" },
            { name: "Paytm", logo: "https://cdn.worldvectorlogo.com/logos/paytm-1.svg" },
          ].map((app) => (
            <label
              key={app.name}
              className={`flex items-center gap-4 border rounded p-3 cursor-pointer ${
                paymentMethod === app.name
                  ? "border-green-600 bg-green-50"
                  : "border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === app.name}
                onChange={() => setPaymentMethod(app.name)}
              />
              <img src={app.logo} alt={app.name} className="h-7" />
              <span className="font-medium">{app.name}</span>
            </label>
          ))}
        </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full py-3 bg-green-600 text-white rounded font-semibold"
        >
          {loading ? "Processing Payment..." : `Pay ₹${totalAmount}`}
        </button>
      </div>
    );
  }

  // STEP 5: BOOKING FORM
  return (
    <form
      onSubmit={submit}
      className="space-y-3 mt-6 max-w-2xl mx-auto bg-white p-6 rounded shadow"
    >
      <h2 className="text-xl font-bold mb-2">Guest Details</h2>

      <div>
        <label className="text-sm block mb-1">Full Name</label>
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

      <button
        type="submit"
        className="w-full py-2 bg-primary text-white rounded font-semibold"
      >
        Continue to Payment
      </button>
    </form>
  );
}

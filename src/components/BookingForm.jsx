import React, { useState } from "react";
import api from "../services/api";
import { getUserFromToken } from "../utils/auth";



export default function BookingForm({ hotel, checkin, checkout, guests }) {
  
  if (!hotel) {
    return <div className="p-6 text-gray-500">Loading...</div>;
  }
  const [paymentMethod, setPaymentMethod] = useState("Google Pay");
  const [showPopup, setShowPopup] = useState(false);

  const nights = checkin && checkout
    ? Math.max(
        1,
        Math.ceil(
          (new Date(checkout) - new Date(checkin)) /
            (1000 * 60 * 60 * 24)
        )
      )
    : 0;

  const totalAmount = nights * hotel.price;

  const bookingId = `BK${Math.floor(100000 + Math.random() * 900000)}`;

  const handlePayment = async () => {
  try {
    const user = getUserFromToken(); 
    const paymentSuccess = true;
    if (!paymentSuccess) {
      alert("Payment failed");
      return;
    }

    if (!user?.email) {
      alert("User email missing. Please logout and login again.");
      return;
    }

    await api.post("/book", {
      email: user.email, // ✅ THIS IS THE FIX
      hotel: {
        name: hotel.name,
        location: hotel.location,
        price: hotel.price,
      },
      checkin,
      checkout,
      guests,
      amount: totalAmount,
      paymentMethod,
    });

    setShowPopup(true);
  } catch (error) {
    console.error("Booking failed:", error);
    alert("Booking failed. Please try again.");
  }
};


  const paymentMethods = [
  {
    name: "Google Pay",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg"
  },
  {
    name: "PhonePe",
    logo: "https://cdn.worldvectorlogo.com/logos/phonepe-1.svg"
  },
  {
    name: "Paytm",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/42/Paytm_logo.png"
  }
];


  return (
    <>
      {/* BOOKING SUMMARY */}
      <div className="space-y-6">

        <h2 className="text-2xl font-bold">Checkout</h2>

        <div className="border rounded-lg p-4 bg-gray-50">
          <h3 className="font-semibold mb-2">Booking Summary</h3>

          <div className="flex justify-between text-sm">
            <span>Hotel</span>
            <span>{hotel.name}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Check-in</span>
            <span>{checkin || "-"}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Check-out</span>
            <span>{checkout || "-"}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Nights</span>
            <span>{nights}</span>
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Payment Summary</h3>

          <div className="flex justify-between">
            <span>Room Price</span>
            <span>₹{hotel.price} × {nights}</span>
          </div>

          <div className="flex justify-between font-bold mt-2">
            <span>Total Payable</span>
            <span className="text-green-600">₹{totalAmount}</span>
          </div>
        </div>

        {/* Payment Options */}
        {/* PAYMENT OPTIONS */}
<div className="space-y-3">
  {paymentMethods.map((method) => (
    <label
      key={method.name}
      className={`flex items-center gap-4 border p-3 rounded-lg cursor-pointer transition ${
        paymentMethod === method.name
          ? "border-green-600 bg-green-50"
          : "border-gray-300"
      }`}
    >
      <input
        type="radio"
        name="payment"
        className="accent-green-600"
        checked={paymentMethod === method.name}
        onChange={() => setPaymentMethod(method.name)}
      />

      <img
        src={method.logo}
        alt={method.name}
        className="h-8 w-auto object-contain"
      />

      <span className="font-medium text-gray-800">
        {method.name}
      </span>
    </label>
  ))}
</div>


        <button
          onClick={handlePayment}
          className="w-full py-3 bg-green-600 text-white rounded font-semibold"
        >
          Pay ₹{totalAmount}
        </button>
      </div>

      {/* ✅ PAYMENT SUCCESS POPUP */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 text-center shadow-xl">

            <h2 className="text-xl font-bold text-green-600 mb-2">
              Payment Successful 🎉
            </h2>

            <p className="text-gray-600 mb-2">
              <strong>Hotel:</strong> {hotel.name}
            </p>

            <p className="text-gray-600 mb-2">
              <strong>Booking ID:</strong> {bookingId}
            </p>

            <p className="text-gray-600 mb-4">
              <strong>Total Paid:</strong> ₹{totalAmount}
            </p>

            <button
              onClick={() => window.location.href = "/user"}
              className="w-full py-2 bg-green-600 text-white rounded"
            >
              Go to Home
            </button>
          </div>
        </div>
      )}
    </>
  );
}

import Booking from "../models/Booking.js";
import { sendBookingEmail } from "../controllers/awsSES.js";

export const createBooking = async (req, res) => {
  console.log("🚀 createBooking STARTED");

  try {
    const {
      email,
      hotel,
      checkin,
      checkout,
      guests,
      amount,
      paymentMethod
    } = req.body;

    console.log("📦 Booking request:", req.body);

    if (!email || !hotel?.name) {
      return res.status(400).json({
        success: false,
        message: "Missing booking data",
      });
    }

    // Create booking in DB
    const booking = await Booking.create({
      email,
      hotelName: hotel.name,
      hotelLocation: hotel.location,
      price: hotel.price,
      checkin,
      checkout,
      guests,
      amount,
      paymentMethod,
    });

    // ✅ WAIT for email to be sent
    console.log("📧 About to send booking email...");

    await sendBookingEmail(email, {
      hotel: {
        name: hotel.name,
        location: hotel.location,
      },
      checkin,
      checkout,
      guests,
      ref: booking._id,
      amount,
    });

    res.status(201).json({
      success: true,
      bookingId: booking._id,
    });

  } catch (error) {
    console.error("❌ createBooking error:", error);
    res.status(500).json({
      success: false,
      message: "Booking failed",
    });
  }
};


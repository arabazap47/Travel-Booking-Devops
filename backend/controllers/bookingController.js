import Booking from "../models/Booking.js";
import { sendBookingEmail } from "../config/awsSES.js";

export const createBooking = async (req, res) => {
  try {
    const { email, hotelName, guests } = req.body;

    const booking = await Booking.create({
      email,
      hotelName,
      guests,
    });

    // Send email (async)
    sendBookingEmail(email, booking);

    res.status(201).json({
      success: true,
      bookingId: booking._id,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
};

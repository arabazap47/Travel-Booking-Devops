import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    hotelName: {
      type: String,
      required: true,
    },
    guests: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;

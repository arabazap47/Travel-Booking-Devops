
// import express from "express";
// import { createBooking } from "../controllers/bookingController.js";

// const router = express.Router();

// router.post("/book", createBooking);

// export default router;

import express from "express";
import jwt from "jsonwebtoken";
import { createBooking } from "../controllers/bookingController.js";
import Booking from "../models/Booking.js";

const router = express.Router();

// Existing booking route
router.post("/book", createBooking);

// 🔐 Get bookings of logged-in user
router.get("/bookings/my", async (req, res) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const bookings = await Booking.find({ email: decoded.email }).sort({
      createdAt: -1,
    });

    res.json(bookings);
  } catch (err) {
    console.error("My bookings error:", err);
    res.status(401).json({ message: "Invalid token" });
  }
});

export default router;

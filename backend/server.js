import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import Hotel from './models/Hotel.js';
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

/* -------- ROOT TEST ROUTE (IMPORTANT) -------- */
app.get("/", (req, res) => {
  res.send("Backend is running");
});


app.get("/api/hotels", async (req, res) => {
  try {
    const city = (req.query.city || "").toLowerCase();

    const hotels = await Hotel.find({
      $or: [
        { location: { $regex: city, $options: "i" } },
        { name: { $regex: city, $options: "i" } },
      ],
    });

    const formatted = hotels.map(hotel => ({
      id: hotel._id,
      name: hotel.name,
      location: hotel.location,
      price: hotel.price,
      rating: hotel.rating,
      image: hotel.image,
      description: hotel.description
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


app.get("/api/hotels/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ error: "Not found" });

    res.json({
      id: hotel._id,
      name: hotel.name,
      location: hotel.location,
      price: hotel.price,
      rating: hotel.rating,
      image: hotel.image,
      description: hotel.description
    });
  } catch (err) {
    res.status(500).json({ error: "Invalid ID" });
  }
});

/* -------- BOOKINGS (MOCK) -------- */
app.post("/api/bookings", (req, res) => {
  const ref = "BK" + Math.random().toString(36).slice(2, 9).toUpperCase();
  res.json({ ref });
});

/* -------- AUTH ROUTES -------- */
app.use("/api/auth", authRoutes);
app.use("/api", bookingRoutes);
/* -------- ROLE-BASED DASHBOARDS -------- */

/* -------- DATABASE -------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

/* -------- SERVER -------- */
app.listen(5000, () =>
  console.log("Backend server running on http://localhost:5000")
);

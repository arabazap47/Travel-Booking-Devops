import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import Hotel from "./models/Hotel.js";

dotenv.config();

const app = express();

/* ============================
   MIDDLEWARE
============================ */

// Allow frontend access
app.use(
  cors({
    origin: "*", // later you can restrict to EC2 IP or domain
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ============================
   HEALTH CHECK
============================ */

app.get("/", (req, res) => {
  res.send("✅ Backend is running");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

/* ============================
   HOTEL ROUTES
============================ */

app.get("/api/hotels", async (req, res) => {
  try {
    const city = (req.query.city || "").toLowerCase();

    const hotels = await Hotel.find({
      $or: [
        { location: { $regex: city, $options: "i" } },
        { name: { $regex: city, $options: "i" } }
      ]
    });

    res.json(
      hotels.map(h => ({
        _id: h._id,
        name: h.name,
        location: h.location,
        price: h.price,
        rating: h.rating,
        image: h.image,
        description: h.description
      }))
    );
  } catch (error) {
    console.error("Hotel fetch error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/hotels/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    if (!hotel)
      return res.status(404).json({ error: "Hotel not found" });

    res.json({
      _id: hotel._id,
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

/* ============================
   BOOKINGS
============================ */

app.post("/api/bookings", (req, res) => {
  const ref = "BK" + Math.random().toString(36).slice(2, 9).toUpperCase();
  res.json({ ref });
});

/* ============================
   AUTH ROUTES
============================ */

app.use("/api/auth", authRoutes);
app.use("/api", bookingRoutes);

/* ============================
   DATABASE
============================ */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Error:", err);
    process.exit(1);
  });

/* ============================
   SERVER START
============================ */

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});


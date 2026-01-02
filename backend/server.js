import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import Hotel from "./models/Hotel.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// Hotels
app.get("/api/hotels", async (req, res) => {
  try {
    const city = (req.query.city || "").toLowerCase();

    const hotels = await Hotel.find({
      $or: [
        { location: { $regex: city, $options: "i" } },
        { name: { $regex: city, $options: "i" } },
      ],
    });

    res.json(hotels.map(h => ({
      _id: h._id,
      name: h.name,
      location: h.location,
      price: h.price,
      rating: h.rating,
      image: h.image,
      description: h.description
    })));
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
  } catch {
    res.status(500).json({ error: "Invalid ID" });
  }
});

app.post("/api/bookings", (req, res) => {
  const ref = "BK" + Math.random().toString(36).slice(2, 9).toUpperCase();
  res.json({ ref });
});

app.use("/api/auth", authRoutes);
app.use("/api", bookingRoutes);

// DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Backend running on port ${PORT}`)
);

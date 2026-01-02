import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import Hotel from "./models/Hotel.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ------------------- TEST ROUTE -------------------
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// ------------------- ROUTES -------------------
app.use("/api/auth", authRoutes);
app.use("/api", bookingRoutes);

// ------------------- HOTELS -------------------
app.get("/api/hotels", async (req, res) => {
  try {
    const city = (req.query.city || "").toLowerCase();

    const hotels = await Hotel.find({
      $or: [
        { location: { $regex: city, $options: "i" } },
        { name: { $regex: city, $options: "i" } },
      ],
    });

    res.json(
      hotels.map(h => ({
        id: h._id,
        name: h.name,
        location: h.location,
        price: h.price,
        rating: h.rating,
        image: h.image,
        description: h.description
      }))
    );
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ------------------- SERVER START -------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// ------------------- DB CONNECTION -------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

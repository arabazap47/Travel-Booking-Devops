import express from "express";
import Hotel from "../models/Hotel.js";

const router = express.Router();

// Get all hotels or by city
router.get("/hotels", async (req, res) => {
  try {
    const { city } = req.query;

    const hotels = city
      ? await Hotel.find({ city: new RegExp(city, "i") })
      : await Hotel.find();

    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch hotels" });
  }
});

// Get single hotel by ID
router.get("/hotels/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });

    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch hotel" });
  }
});

export default router;

import mongoose from "mongoose";
import dotenv from "dotenv";
import Hotel from "../models/Hotel.js";

dotenv.config();

const seedHotels = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Hotel.deleteMany(); // optional (clears old data)

    await Hotel.insertMany([
      {
        name: "Grand Palace",
        location: "Bangalore",
        price: 3200,
        rating: 4.5,
        image: "https://res.cloudinary.com/demo/image/upload/hotel1.jpg",
        description: "Luxury stay in city center"
      },
      {
        name: "Ocean View",
        location: "Goa",
        price: 4500,
        rating: 4.7,
        image: "https://res.cloudinary.com/demo/image/upload/hotel2.jpg",
        description: "Beachside luxury resort"
      }
    ]);

    console.log("✅ Hotels inserted successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Error inserting hotels:", error);
    process.exit(1);
  }
};

seedHotels();

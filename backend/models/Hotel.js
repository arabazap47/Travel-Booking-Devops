import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
  name: String,
  location: String,
  price: Number,
  rating: Number,
  image: String,
  description: String
});

export default mongoose.model('Hotel', hotelSchema);

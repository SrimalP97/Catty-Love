import mongoose from 'mongoose';

const catSchema = new mongoose.Schema(
  {
    Cat_id: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    age: { type: String, required: true },
    gender: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    contact: { type: String, required: true },
    Likes: { type: Number, required: true },
    unlikes: { type: Number, required: true },
    numReviews: { type: Number, required: true },
    Geolocation: { type: String, required: true },
  },

  {
    timestamps: true,
  }
);

const cat = mongoose.model('cat', catSchema);
export default cat;

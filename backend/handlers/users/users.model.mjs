import mongoose, { Schema } from "mongoose";

const Address = new Schema({
  postcode: String,
  street: String,
  optionalText: String,
  city: String,
  country: String,
});

const Image = new Schema({
  url: String,
  alt: String,
});

const schema = new Schema({
  name: String,
  phone: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  businessName: String,
  address: Address,
  image: Image,
  categories: [String],
  isBusiness: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  isBanned: { type: Boolean, default: false },
  dateJoined: { type: Date, default: Date.now },
});

export const User = mongoose.model("users", schema);

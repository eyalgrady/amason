import mongoose, { Schema } from "mongoose";

const Image = new Schema({
  url: String,
  alt: String,
});

const Rating = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    user_name: { type: Schema.Types.String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String },
  },
  { timestamps: true }
);

const schema = new Schema(
  {
    title: String,
    content: String,
    image: Image,
    price: String,
    quantity: Number,
    category: String,
    subcategory: String,
    brandName: String,
    discountPercentage: String,
    promotionMessageText: String,
    carts: {
      type: [Schema.Types.ObjectId],
      default: [],
    },
    sales: {
      type: [Schema.Types.ObjectId],
      default: [],
    },
    salesCount: {
      type: Number,
      default: 0,
    },
    ratings: [Rating],
    averageRating: { type: Number, default: 0 }, // ממוצע דירוגים
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    businessName: { type: Schema.Types.String },
    colors: { type: [String] },
    sizes: { type: [String] },
    weightKg: { type: Number },
    weightGrams: { type: Number },
    height: { type: Number },
    width: { type: Number },
    depth: { type: Number },
    tags: { type: [String] },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

export const Product = mongoose.model("products", schema);

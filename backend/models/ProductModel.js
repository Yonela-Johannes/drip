const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: [true, "Please enter a name of a product"],
    maxLength: [20, "Product name not exceed than 20 characters"],
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: [true, "Please add a description of your product"],
    maxlength: [4000, "Description is can not exceed than 4000 characters"],
  },
  imageUrl: {
    type: String,
    required: true,
  },
  imageId: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  price: {
    type: Number,
    maxLength: [4, "Discount price can not exceed than 4 characters"],
  },
  sold: {
    type: Number,
    default: 0,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      comment: String,
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],
  totalRating: {
    type: Number,
    default: 0,
  },
  inStock: {
    type: Boolean,
    required: [true, "Please add some stoke for your product"],
  },
  stockCount: {
    type: Number,
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 1,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
      },
      time: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  createdAt: {
    type: Date,
    default: new Date(),
  },
},
{ timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);

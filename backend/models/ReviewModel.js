const mongoose = require("mongoose");

const ReviewProductSchema = new mongoose.Schema({
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true
    },
    comment: {
      type: String,
      required: true
    },
    rate: {
      type: Number,
      required: true
    },
  },{
    timestamps: true
  }
);

module.exports =  mongoose.model("ReviewProduct", ReviewProductSchema);

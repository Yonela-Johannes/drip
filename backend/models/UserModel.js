const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Please your name"],
      minlength: [3, "Please enter a name atleast 3 characters"],
      maxlength: [15, "Name can not big than 15 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Please your last name"],
      minlength: [3, "Please enter a last name atleast 3 characters"],
      maxlength: [15, "Name can not big than 15 characters"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
    },
    avatar: {
      type: String,
    },
    phoneNo: {
      type: String,
    },
    avatarId: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
      enum: [
        "user",
        "admin",
        "developer",
        "manager",
      ],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    cart: {
      type: Array,
      default: [],
    },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    refreshToken: {
      type: String,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },{
    timestamps: true
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.methods.createPasswordResetToken = async function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 10 minutes
  return resetToken;
};

const User = mongoose.model("User", userSchema);
module.exports = User;

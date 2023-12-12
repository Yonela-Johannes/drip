const User = require("../models/UserModel");
const Cart = require("../models/CartModel");
const Order = require("../models/OrderModel");
const uniqid = require("uniqid");
const sendToken = require("../utils/jwtToken");
const sendMail = require("../utils/sendMail");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const crypto = require("crypto");
const asyncHandler = require("express-async-handler");
const cloudinary = require("cloudinary");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../config/jwtToken");
const validateMongoDbId = require("../utils/validateMongodbId");
const { generateRefreshToken } = require("../config/refreshtoken");
const bcrypt = require('bcrypt');
const sendResponse = require("../utils/apiResponse");

// Login to existing user
// @desc Login to existing user
// @route POST /api/users/login
// @access Private
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return sendResponse(user, 201, res, "Please enter the email & password.");
  }
  const user = await User.findOne({ email }).select("+password").populate('wishlist');
  if (!user) {
    return sendResponse(user, 201, res, "User is not find with this email & password.");
  };

  try {
    bcrypt.compare(password, user.password, function(err, isMatch) {
      if (isMatch) {
        sendToken(user, 201, res, 'Sign in successful.');
      } else {
        return sendResponse({}, 201, res, 'Incorrect password.');
      }
    });
  } catch (error) {
    console.log(error.message)
    return sendResponse({}, 400 , res, error.message);
  }
};

// Register User
// @desc Create user account
// @route POST /api/users/update
const createUser = async (req, res, next) => {
  try {
    const { name, lastName, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      res.json({ success: false, message: "User already exists" });
    }else if(!user){
      user = await User.create({
        name,
        lastName,
        email,
        password,
      });

      res.json(user);
    }
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Logout User
// @desc Log user out
// @route POST /api/users/update
// const logoutUser = async (req, res, next) => {
//   res.cookie("token", null, {
//     expires: new Date(Date.now()),
//     httpOnly: true,
//   });

//   res.status(200).json({
//     success: true,
//     message: "Log out success",
//   });
// });

// Forgot password
const forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found with this email", 404));
  }

// Reset User Password Token
// @desc Retrieve all user
// @route GET /api/users/update
  const resetToken = user.getResetToken();

  await user.save({
    validateBeforeSave: false,
  });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl}`;

  try {
    await sendMail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} succesfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordTime = undefined;

    await user.save({
      validateBeforeSave: false,
    });

    return next(new ErrorHandler(error.message, 500));
  }
};

// Reset User password
// @desc Retrieve all user
// @route GET /api/users/update
const resetPassword = async (req, res, next) => {
  // Create Token hash

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordTime: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler("Reset password url is invalid or has been expired", 400)
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("Password is not matched with the new password", 400)
    );
  }

  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordTime = undefined;

  await user.save();

  sendToken(user, 200, res);
};

// Update User password
// @desc Retrieve all user
// @route GET /api/users/update
const updatePassword = async (req, res, next) => {

  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(
      new ErrorHandler("Old Password is incorrect", 400)
    );
  };

  if(req.body.newPassword  !== req.body.confirmPassword){
      return next(
          new ErrorHandler("Password not matched with each other", 400)
        );
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user,200,res);
};

// Fetch all users
// @desc Retrieve all user
// @route POST /api/users/update
const getAllUsers = async (req,res,next) =>{
  const users = await User.find();
  res.status(200).json({
      success: true,
      users,
  });
};


// Update user
// @desc edit user
// @route POST /api/update/:id
// access Admin/User
// Update User Profile
const updateProfile = async(req,res,next) => {
  const { userId } = req.params
  const { name, lastName, phone, image } = req.body

  let imageUrl = ''
  let imagePublicId = ''

  try {
    if (image !== "") {
      const user = await User.findById(userId);

      if(user & user.avatarId){
        const imageId = user.avatarId;
        await cloudinary.v2.uploader.destroy(imageId);
      }
      const response = await cloudinary.v2.uploader.upload(image, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });
      imagePublicId = response.public_id
      imageUrl = response.secure_url
    }
    const findUser = await User.findById(userId)
    const user = await User.findByIdAndUpdate(userId, {
      name: name || findUser?.name,
      lastName: lastName || findUser?.lastName,
      phone: phone || findUser?.lastName,
      avatar: imageUrl || findUser?.imageUrl,
      avatarId: imagePublicId || findUser?.avatarId,
    }, {
      new: true,
      runValidator: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      user,
      success: true,
    });
  } catch (error) {
    console.log(error)
  }
};


// Logout user
// @desc log user out
// @route POST /api/users/logout
// access Public
const logoutUser = async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Log out success",
  });
};

// Role
// @desc update user role
// @route PUT /api/admin/user/:id
// access Admin
const updateUserRole = async(req,res,next) =>{
  const newUserData = {
      role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id,newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
  });

  res.status(200).json({
      success: true,
      user
  })
};

// Logout user
// @desc log user out
// @route POST /api/users/logout
// access Public
const deleteUser = async(req,res,next) =>{

  const user = await User.findById(req.params.id);

  if(user && user.avatarId){
    const imageId = user.avatarId;
    await cloudinary.v2.uploader.destroy(imageId);
  }

  if(!user){
    return next(new ErrorHandler("User is not found with this id",400));
  }

  await User.findByIdAndDelete(user._id)

  res.status(200).json({
    success: true,
    message:"User deleted successfully"
  })
};

// Admin
// @desc log user out
// @route POST /api/users/logout
// access Public
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  // check if user exists or not
  const findAdmin = await User.findOne({ email });
  if (findAdmin.role !== "admin") throw new Error("Not Authorised");
  if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findAdmin?._id);
    const updateuser = await User.findByIdAndUpdate(
      findAdmin.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findAdmin?._id,
      firstname: findAdmin?.firstname,
      lastname: findAdmin?.lastname,
      email: findAdmin?.email,
      mobile: findAdmin?.mobile,
      token: generateToken(findAdmin?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
};

// Admin
// @desc log user out
// @route POST /api/users/logout
// access Public
const handleRefreshToken = async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error(" No Refresh token present in db or not matched");
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("There is something wrong with refresh token");
    }
    const accessToken = generateToken(user?._id);
    res.json({ accessToken });
  });
};

// Admin
// @desc log user out
// @route POST /api/users/logout
// access Public
const logout = async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204); // forbidden
  }
  await User.findOneAndUpdate(refreshToken, {
    refreshToken: "",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204); // forbidden
};


// Admin
// @desc log user out
// @route POST /api/users/logout
// access Public
const getUser = async (req, res) => {
  const { userId } = req.params;
  validateMongoDbId(userId);

  try {
    const user = await User.findById(userId);
    res.json({
      user,
    });
  } catch (error) {
    throw new Error(error);
  }
};

// Admin
// @desc log user out
// @route POST /api/users/logout
// access Public
const deleteaUser = async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const deleteaUser = await User.findByIdAndDelete(id);
    res.json({
      deleteaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
};

const forgotPasswordToken = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found with this email");
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:5000/api/user/reset-password/${token}'>Click Here</>`;
    const data = {
      to: email,
      text: "Hey User",
      subject: "Forgot Password Link",
      htm: resetURL,
    };
    sendEmail(data);
    res.json(token);
  } catch (error) {
    throw new Error(error);
  }
};


// Add Wishlist
// @desc add to wishlist
// @route PUT /api/add-wishlist/:userId
// access User
const addToWishlist = async (req, res) => {
  const { userId } = req.params;
  const { productId } = req.body
  if (!userId || !productId) {
    return sendResponse({}, 201, res, "Required data error.");
  }

  try {
    const findWish = await User.findOne({_id: userId, wishlist: productId});
    if(findWish){
      return sendResponse(findWish, 200, res, 'Already added to wishlist', true)
    }else{
      const addWish = await User.findOneAndUpdate({_id: userId }, {
        $push: {wishlist: productId}
      }).populate('wishlist');
      return sendResponse(addWish, 200, res, 'Added to wishlist', true)
    }
  } catch (error) {
    throw new Error(error);
  }
};

// Remove Wishlist
// @desc remove to wishlist
// @route DELETE /api/remove-wishlist/:userId
// access User
const removeFromWishlist = async (req, res) => {
  const { userId, productId } = req.params;

  if (!userId || !productId) {
    return sendResponse({}, 201, res, "Required data error.");
  }
  const findWish = await User.findOne({_id: userId, wishlist: productId});
  try {
    if(findWish){
      const user = await User.findOneAndUpdate({_id: userId }, {
        $pull: {wishlist: productId}
      }).populate('wishlist');
      return sendResponse(user, 200, res, 'Added to wishlist', true)
    }
  } catch (error) {
    throw new Error(error);
  }
};

// Admin
// @desc log user out
// @route GET /api/wishlist/:userId
// access User
const getWishlist = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate("wishlist");
    return sendResponse(user, 200, res, 'Fetched wishlist', true)
  } catch (error) {
    throw new Error(error);
  }
};


// Admin
// @desc log user out
// @route POST /api/users/logout
// access Public
const createOrder = async (req, res) => {
  const { COD, couponApplied } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    if (!COD) throw new Error("Create cash order failed");
    const user = await User.findById(_id);
    let userCart = await Cart.findOne({ orderby: user._id });
    let finalAmout = 0;
    if (couponApplied && userCart.totalAfterDiscount) {
      finalAmout = userCart.totalAfterDiscount;
    } else {
      finalAmout = userCart.cartTotal;
    }

    let newOrder = await new Order({
      products: userCart.products,
      paymentIntent: {
        id: uniqid(),
        method: "COD",
        amount: finalAmout,
        status: "Cash on Delivery",
        created: Date.now(),
        currency: "usd",
      },
      orderby: user._id,
      orderStatus: "Cash on Delivery",
    }).save();
    let update = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.count, sold: +item.count } },
        },
      };
    });
    const updated = await Product.bulkWrite(update, {});
    res.json({ message: "success" });
  } catch (error) {
    throw new Error(error);
  }
};

// Admin
// @desc log user out
// @route POST /api/users/logout
// access Public
const getAllOrders = async (req, res) => {
  try {
    const alluserorders = await Order.find()
      .populate("products.product")
      .populate("orderby")
      .exec();
    res.json(alluserorders);
  } catch (error) {
    throw new Error(error);
  }
};

// Admin
// @desc log user out
// @route POST /api/users/logout
// access Public
const getOrderByUserId = async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const userorders = await Order.findOne({ orderby: id })
      .populate("products.product")
      .populate("orderby")
      .exec();
    res.json(userorders);
  } catch (error) {
    throw new Error(error);
  }
};

// Admin
// @desc log user out
// @route POST /api/users/logout
// access Public
const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateOrderStatus = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus: status,
        paymentIntent: {
          status: status,
        },
      },
      { new: true }
    );
    res.json(updateOrderStatus);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  loginUser,
  createUser,
  forgotPassword,
  resetPassword,
  updatePassword,
  getAllUsers,
  getUser,
  updateProfile,
  logoutUser,
  updateUserRole,
  deleteUser,
  loginAdmin,
  getAllOrders,
  addToWishlist,
  removeFromWishlist,
  getOrderByUserId,
  updateOrderStatus,
  forgotPasswordToken,
  logout,
  createOrder,
  getWishlist,
}

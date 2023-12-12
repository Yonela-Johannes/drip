
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require("cloudinary");
const Product = require("../models/ProductModel.js");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const validateMongoDbId = require("../utils/validateMongodbId");

// create Product --Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.body
  const {name, price, image, category, stock, description } = req.body.product

  try {
    const result = await cloudinary.v2.uploader.upload(image, {
      folder: "products",
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    });

    const product = await Product.create({
      name,
      price,
      category,
      stockCount: stock,
      description,
      inStock: true,
      user: userId,
      slug: slugify(name),
      imageUrl: result.secure_url,
      imageId: result.public_id,
    });
    console.log(product)

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error)
  }
});

// Get All Product (Admin)
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

// get All Products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {

  try {
    const products = await Product.find().populate('category').populate('reviews.user comments.user')

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Update Product ---Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product is not found with this id", 404));
  }

  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Delete image from cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
    req.body.images = imagesLinks;
  }

  req.body.slug = slugify(req.body.title);

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useUnified: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

// delete Product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product is not found with this id", 404));
  }

  // Deleting images from Cloudinary
  try {
    if(product && product.imageId){
      const result = await cloudinary.v2.uploader.destroy(product.imageId);
      console.log("Cloudinary Deletion Result:", result);
    }
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
  }

  try {
    await Product.findByIdAndDelete(product._id)
    res.status(200).json({
      success: true,
      message: "Product deleted",
    });
  } catch (error) {
    console.error("Error deleting product from the database:", error);
    return next(new ErrorHandler("Error deleting product", 500));
  }
});

// single Product details
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate('category').populate('reviews.user comments.user');
  if (!product) {
    return next(new ErrorHandler("Product is not found with this id", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

// Create New Review or Update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId, userId } = req.body;

  const review = {
    user: userId,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler("Product is not found with this id", 404));
  }

  const isReviewed = product.reviews.find(
    (rev) => rev?.user?._id.toString() === userId.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All reviews of a single product
exports.getSingleProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id).populate('category');

  if (!product) {
    return next(new ErrorHandler("Product is not found with this id", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Review --Admin
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found with this id", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});

exports.rating = catchAsyncErrors(async (req, res) => {
  const { _id } = req.user;
  const { star, prodId, comment } = req.body;
  try {
    const product = await Product.findById(prodId);
    let alreadyRated = product.ratings.find(
      (userId) => userId.postedby.toString() === _id.toString()
    );
    if (alreadyRated) {
      const updateRating = await Product.updateOne(
        {
          ratings: { $elemMatch: alreadyRated },
        },
        {
          $set: { "ratings.$.star": star, "ratings.$.comment": comment },
        },
        {
          new: true,
        }
      );
    } else {
      const rateProduct = await Product.findByIdAndUpdate(
        prodId,
        {
          $push: {
            ratings: {
              star: star,
              comment: comment,
              postedby: _id,
            },
          },
        },
        {
          new: true,
        }
      );
    }
    const getAllRatings = await Product.findById(prodId);
    let totalRating = getAllRatings.ratings.length;
    let ratingSum = getAllRatings.ratings
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);
    let actualRating = Math.round(ratingSum / totalRating);
    let finalProduct = await Product.findByIdAndUpdate(
      prodId,
      {
        totalRating: actualRating,
      },
      { new: true }
    );
    res.json(finalProduct);
  } catch (error) {
    throw new Error(error);
  }
});

exports.commentProduct = catchAsyncErrors(async (req, res, next) => {
  const { userId, comment, productId } = req.body

  const data = {
    user: userId,
    comment,
  }

  let product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler("Product is not found with this id", 404));
  }

  product.comments.push(data)

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    product,
  });
});

exports.deleteCommentProduct = catchAsyncErrors(async (req, res, next) => {

  const { userId, commentId, productId } = req.body

  let product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler("Product is not found with this id", 404));
  }

  product.comments.filter((comId) => comId !== commentId)
  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    product,
  });
});

const Order = require("../models/OrderModel");
const ErrorHandler = require("../utils/ErrorHandler.js");
const Product = require("../models/ProductModel");

// Create Order
exports.createOrder = async (req,res,next) =>{

  const { order, addressId, userId } = req.body;
  const { user, status, price, deliveryPrice, products } = order

  if(order && addressId && user && user?.id && price && products){
    const newOrder = await Order.create({
      address: addressId,
      orderItems: products,
      paymentInfo: {id: 5, status: status?.paymentMethod},
      itemsPrice: (price - deliveryPrice),
      deliveryPrice,
      totalPrice: price,
      paidAt:Date.now(),
      user: user?.id || userId,
    });

    res.status(201).json({
        success: true,
        order: newOrder
    });
  } else {
    res.json({
      success: false,
      message: "Missing data required"
  });
  }
};

//  Get Single order
exports.getSingleOrder = async (req,res,next) =>{
  const order = await Order.findById(req.params.id).populate(
    "user address",
  );

  if(!order){
    return next(new ErrorHandler("Order not found with this id",404));
  }

  res.status(200).json({
      success: true,
      order
  });
};

// Get all orders
exports.getAllOrders = async (req,res,next) =>{
  const orders = await Order.find({user: req.params.id}).populate("user").populate("address").populate("orderItems._id");
  res.status(200).json({
    success: true,
    orders
  });
};

// Get All orders ---Admin
exports.getAdminAllOrders = async (req,res,next) =>{
    const orders = await Order.find().populate("user").populate("address").populate("orderItems._id");

    let totalAmount = 0;

    orders.forEach((order) =>{
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    });
};

// update Order Status ---Admin
exports.updateAdminOrder = async (req, res, next) => {

    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorHandler("Order not found with this Id", 404));
    }

    if (order.orderStatus === "Delivered") {
      return next(new ErrorHandler("You have already delivered this order", 400));
    }

    if (req.body.status === "Shipped") {
      order.orderItems.forEach(async (o) => {
        await updateStock(o.product, o.quantity);
      });
    }
    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
    });
  };

  async function updateStock(id, quantity) {

    const product = await Product.findById(id);

    product.Stock -= quantity;

    await product.save({ validateBeforeSave: false });
  }


// delete Order ---Admin
exports.deleteOrder = async (req,res,next) =>{

    const order = await Order.findById(req.params.id);

    if(!order){
      return next(new ErrorHandler("Order not found with this Id", 404));
    }

    await order.remove();

    res.status(200).json({
        success: true,
    });
};

const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAssyncErrors = require("../middleware/catchAssyncErrors");

exports.newOrder = catchAssyncErrors(async (req, res, next) => {

  console.log(req.user);
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(200).json({
    success: true,
    order,
  });
});

// get single order

exports.getSingleOrder = catchAssyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(new ErrorHandler("order not found", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// get loged user order

exports.myOrder = catchAssyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// getAllOrders==admin

exports.getAllOrders = catchAssyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    orders,
    totalAmount,
  });
});

// update order status == admin

exports.updateOrder = catchAssyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  console.log(req.body);

  if (!order) {
    return next(new ErrorHandler("order not found", 404));
  }
  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("this order is already delivered", 400));
  }

  if (req.body.status === 'Shipped') {
    console.log("shipped");
    order.orderItems.forEach(async (O) => {
      await updateStock(O.product, O.quantity);
    });
  }
  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }
  await order.save({ validatBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
 
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

// delete order ==>admin

exports.deletOrder=catchAssyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id)

    if(!order){
      return  next (new ErrorHandler("order not found",404))
    }
    await order.remove()

    res.status(200).json({
        success:true,
        message:"order deleted"
    })
})
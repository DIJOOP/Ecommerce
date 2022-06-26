const Product = require("../models/productModel");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAssyncErrors = require("../middleware/catchAssyncErrors");
const ApiFeatures = require("../utils/ApiFeatures");
const cloudinary = require("cloudinary");

//create a product--admin
exports.createProduct = catchAssyncErrors(async (req, res) => {
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLink = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLink.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.user = req.user.id;
  req.body.images = imagesLink;
  const product = await Product.create(req.body);

  res.status(200).json({
    success: true,
    product,
  });
});

// getAllproducts

exports.gettAllProducts = catchAssyncErrors(async (req, res, next) => {
  const resultPerPage = 5;
  const productsCount = await Product.countDocuments();
  const ApiFeature = new ApiFeatures(Product.find(), req.query)

    .search()
    .filter();
  let products = await ApiFeature.query;

  let filteredProductCount = products.length;

  ApiFeature.pagination(resultPerPage);

  products = await ApiFeature.query.clone();

  res.status(200).json({
    success: true,
    productsCount,
    products,
    resultPerPage,
    filteredProductCount,
  });
});

// getsingleproduct

exports.getProdctDetails = catchAssyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  res.status(200).json({
    success: "true",
    product,
  });
});

// update product -- admin

exports.updateProduct = catchAssyncErrors(async (req, res, next) => {
  console.log("reached");
  console.log(req.body);

  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }

  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // delete images from cloudinary
    for (let i = 0; i < product.images.length; i++) {
      const result = await cloudinary.v2.uploader.destroy(
        product.images[i].public_id
      );
    }
    const imagesLink = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLink.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
    req.body.images = imagesLink;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

// deleteProduct

exports.deleteProduct = catchAssyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }

  // delete images from cloudinary
  for (let i = 0; i < product.images.length; i++) {
    const result = await cloudinary.v2.uploader.destroy(
      product.images[i].public_id
    );
  }

  await product.remove();
  res.status(200).json({
    success: true,
    message: "product deleted successfully",
  });
});

// create new review or update review

exports.createProductReview = catchAssyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user.id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  console.log(product);
  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if ((rev) => rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.noOfReviews = product.reviews.length;
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

// get all reviews of a product

exports.getProductReviews = catchAssyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  console.log(product);

  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }

  res.status(200).json({
    succes: true,
    reviews: product.reviews,
  });
});

// delete reviews

exports.deleteReview = catchAssyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  const reviews = product.reviews.filter(
    (rev) => rev.id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => (avg += rev.rating));

  let rating = 0;
  if (reviews.length === 0) rating = 0;
  else rating = avg / reviews.length;

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      rating,
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
    message: "review deleted",
  });
});

// ADMIN

// getAllproducts(ADMIN)

exports.gettAdminProducts = catchAssyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

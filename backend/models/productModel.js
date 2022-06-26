const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter product name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "please enter product description"],
  },
  price: {
    type: Number,
    required: [true, "please enter product price"],
    maxLength: [8, "price cannot exeed 8 digits"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url:{
        type: String,
        required: true,
      }
    },
  ],
  category:{
      type:String,
      required:[true,"please enetr product category"]
  },
  stock:{
      type:Number,
      required: [true, "please enter product price"],
      maxLength: [4, "price cannot exeed 4 digits"],
      default:1
  },
  numOfReviews: {
      type:Number,
      default:1
  },
  reviews:[{
    user:{
      type:mongoose.Schema.ObjectId,
      ref : "User",
      required:true
    },
      name:{
          type:String,
          required:true,
      },
      rating:{
          type:Number,
          required:true
      },
      comment:{
          type:String,
          required:true
      }
  }],
  user:{
    type:mongoose.Schema.ObjectId,
    ref : "User",
    required:true
  },
  createdat:{
      type:Date,
      default:Date.now
  }
});


module.exports=mongoose.model("products",productSchema)
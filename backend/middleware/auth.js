const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAssyncErrors = require("./catchAssyncErrors");
const User = require("../models/userModel");



exports.isAuthenticatedUser = catchAssyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  // console.log(token);

  if (!token) {
    return next(new ErrorHandler("please login to get access", 401));
  }

  const decodeData = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decodeData.id);
  next()
});

exports.authorizeRoles=(...roles)=>{
  return (req,res,next)=>{
    if(!roles.includes(req.user.role)){
      return next(
        new ErrorHandler(`Role: ${req.user.role} is not allowed to access this data`,403)
      )
    }
    next()
  }
  
}

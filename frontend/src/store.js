import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./Reducers/cartReducer";
import {
  getAllOrdersReducer,
  myOrderReducer,
  newOrderReducer,
  orderDetailReducer,
  updateOrderReducer,
} from "./Reducers/orderReducer";
import {
  newProductReducer,
  newReviewReducer,
  productDetailReducer,
  productReducer,
  updateproductReducer,
  allReviewsReducer,
  deleteReviewReducer

} from "./Reducers/productReducer";
import {
  userReducer,
  profileRducer,
  forgotPassswordReducer,
  allUserReducer,
  userDetailReducer,
  updateUserReducer,
} from "./Reducers/userReducer";

const store = configureStore({
  reducer: {
    products: productReducer,
    productDetail: productDetailReducer,
    user: userReducer,
    profile: profileRducer,
    forgotPass: forgotPassswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrderReducer,
    orderDetails: orderDetailReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    product: updateproductReducer,
    allOrders: getAllOrdersReducer,
    orderUpdate: updateOrderReducer,
    allUsers: allUserReducer,
    userDetails: userDetailReducer,
    userUpdate: updateUserReducer,
    allReviews: allReviewsReducer,
    reviewDelete:deleteReviewReducer,
  },
});

export default store;

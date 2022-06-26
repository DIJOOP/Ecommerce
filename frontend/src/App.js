import "./App.css";
import Header from "./components/layout/header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import { useEffect, useState } from "react";
import Footer from "./components/layout/footer/Footer";
import Home from "./components/Home/Home.jsx";
import ProductDetail from "./components/Product/ProductDetail";
import Products from "./components/Product/Products.js";
import Search from "./components/Product/Search.js";
import LoginSignUp from "./components/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./Actions/userAction";
import UserOptions from "./components/layout/header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./components/User/Profile.js";
import UpdateProfile from "./components/User/UpdateProfile.js";
import UpdatePassword from "./components/User/UpdatePassword.js";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword.js";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import Stripeconfig from "./components/Cart/Stripeconfig";
import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrders from "./components/order/MyOrders";
import OrderDetail from "./components/order/OrderDetail"
import Dashboard from "./components/Admin/Dashboard";
import ProductList from "./components/Admin/ProductList";
import NewProduct from "./components/Admin/NewProduct";
import UpdateProduct from "./components/Admin/UpdateProduct";
import UpdateOrder from "./components/Admin/UpdateOrder";
import OrdersList from "./components/Admin/OrdersList";
import Userslist from "./components/Admin/Userslist";
import UpdateUser from "./components/Admin/UpdateUser";
import ProductReviews from "./components/Admin/ProductReviews";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
  
  }, []);

  return (
    <Router>
      <Header />

      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetail />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route exact path="/login" element={<LoginSignUp />} />
        <Route exact path="/account" element={<Profile />} />
        <Route exact path="/me/update" element={<UpdateProfile />} />
        <Route exact path="/password/update" element={<UpdatePassword />} />
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route
          exact
          path="/password/reset/:token"
          element={<ResetPassword />}
        />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/shipping" element={<Shipping />} />
        <Route exact path="/order/confirm" element={<ConfirmOrder/>} />
        <Route exact path="/process/payment" element={<Stripeconfig/>} />
        <Route exact path="/payment/success" element={<OrderSuccess/>} />
        <Route exact path="/order/me" element={<MyOrders/>} />
        <Route exact path="/order/:id" element={<OrderDetail/>} />

       {/* Adminroutes */}

       <Route exact path="/admin/dashboard" element={<Dashboard/>}/>
       <Route exact path="/admin/Products" element={<ProductList/>}/>
       <Route exact path="/admin/Product" element={<NewProduct/>}/>
       <Route exact path="/admin/Product/:id" element={<UpdateProduct/>}/>
       <Route exact path="/admin/orders" element={<OrdersList/>}/>
       <Route exact path="/admin/order/:id" element={<UpdateOrder/>}/>
       <Route exact path="/admin/users" element={<Userslist/>}/>
       <Route exact path="/admin/user/:id" element={<UpdateUser/>}/>
       <Route exact path="/admin/reviews" element={<ProductReviews/>}/>

      </Routes>

      <Footer />
    </Router>
  );
}

export default App;

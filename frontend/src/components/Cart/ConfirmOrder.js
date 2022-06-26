import React, { Fragment } from "react";
import Metadata from "../../components/layout/Metadata";
import CheckoutSteps from "./CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { Link,useNavigate } from "react-router-dom";
import "./confirmOrder.css"

const ConfirmOrder = () => {
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const navigate=useNavigate()

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 500 ? 0 : 65;
  const Tax = subtotal * 0.18;
  const TotalPrice = subtotal + Tax + shippingCharges;
  const address = `${shippingInfo.address},${shippingInfo.city},${shippingInfo.state},${shippingInfo.pinCode},${shippingInfo.country}`;

  const proceedToPayment=()=>{
    const data={
      shippingCharges,
      Tax,
      TotalPrice,
      subtotal,
    }
    console.log(data);
    sessionStorage.setItem("orderInfo",JSON.stringify(data))
    navigate("/process/payment")
  }
  return (
    <Fragment>
      <Metadata title="order confirmation" />
      <CheckoutSteps activeSteps={1} />

      <div className="confirmOrderPage">
        <div>
          <div className="confirmShippingArea">
            <Typography>Shipping info</Typography>
            <div className="confirmShippingAreaBox">
              <div>
                <p>Name</p>
               {user && <span>{user.name}</span>} 
              </div>
              <div>
                <p>Phone</p>
                <span>{shippingInfo.phone}</span>
              </div>
              <div>
                <p>Address</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your cart items</Typography>
            <div className="confirmCartsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="" />
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <span>
                      {item.quantity} × ₹{item.price}=₹{""}
                      <b>{item.quantity * item.price}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div>
          <div className="orderSummary">
            <Typography>Order Summary</Typography>
            <div>
              <div>
                <p>Sub Total</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p>Shipping charges</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹{Tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total</b>
              </p>
              <span>₹{TotalPrice}</span>
            </div>
            <button onClick={proceedToPayment} >Proceed to payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;

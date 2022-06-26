import React, { Fragment, useEffect, useRef } from "react";
import { CreditCard, Event, VpnKey } from "@mui/icons-material";
import Metadata from "../layout/Metadata";
import CheckoutSteps from "./CheckoutSteps";
import "./payment.css";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  PaymentElement,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Typography } from "@mui/material";
import { clearErrors, createOrder } from "../../Actions/orderAction";

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const payBtn = useRef(null);
  const stripe = useStripe();
  const elements = useElements();
  const alert = useAlert();
  const dispatch= useDispatch()
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData={
    amount: Math.round(orderInfo.TotalPrice*100)
  }

  const order={
    shippingInfo,
    orderItems:cartItems,
    // paymentInfo:,
    itemsPrice:orderInfo.subtotal,
    taxPrice:orderInfo.Tax,
    shippingPrice:orderInfo.shippingCharges,
    totalPrice:orderInfo.TotalPrice,
  }



  const submitHandler = async(e) => {
    e.preventDefault();
    payBtn.current.disabled = true;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data} = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config,
      );

      console.log(data);

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

     
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });
     
      if (result.error) {
        payBtn.current.disabled = false;
        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {

          order.paymentInfo={
            id:result.paymentIntent.id,
            status:result.paymentIntent.status
          }

          dispatch(createOrder(order))

          
          navigate("/payment/success");

        } else {
          alert.error("there is some issue in processing payment");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      console.log(error);
      alert.error(error.response.data.message);
    }
  };

  useEffect(() => {
   if(error){
    alert.error(error)
    dispatchEvent(clearErrors())
   }
  
   
  }, [dispatch,error,alert])
  

  return (
    <Fragment>
      <Metadata title="payment" />
      <CheckoutSteps activeSteps={2} />
      <div className="paymentContainer">
        <form
          action=""
          className="paymentForm"
          onSubmit={(e) => submitHandler(e)}
        >
          <Typography>Card info</Typography>
          <div>
            <CreditCard />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <Event />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKey />
            <CardCvcElement className="paymentInput" />
          </div>
          <input
            type="submit"
            value={`PAY--₹${orderInfo && orderInfo.TotalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        
        </form>
        
      </div>
    </Fragment>
  );
};

export default Payment;

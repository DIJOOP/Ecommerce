import React, { Fragment, useEffect } from "react";
import "./OrderDetail.css";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors, getOrderDetails } from "../../Actions/orderAction";
import { Link, useParams } from "react-router-dom";
import Metadata from "../layout/Metadata";
import { Typography } from "@mui/material";
import Loader from "../layout/Loader/Loader";

const OrderDetail = () => {
  const { order, loading, error } = useSelector((state) => state.orderDetails);
  const alert = useAlert();
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getOrderDetails(params.id));
  }, [dispatch, error, params, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title="order Detail" />

          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                {" "}
                Order# {order && order._id}
              </Typography>
              <Typography>Shipping Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{order && order.user.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>{order && order.shippingInfo.phone}</span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {order &&
                      `${order.shippingInfo.address},${order.shippingInfo.city},${order.shippingInfo.state},${order.shippingInfo.pinCode},${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order&&
                      order.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>
                <div>
                  <p>Amount:</p>
                  <span>{order && order.totalPrice}</span>
                </div>
              </div>
              <Typography>Order Status</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order&& order.orderStatus}
                  </p>
                </div>
              </div>
            </div>
            <div className="orderDetailsCartItems">
              <Typography>Order Items</Typography>
              <div className="orderDetailsCartItemsContainer">
                {order&&
                  order.orderItems.map((item) => (
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
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetail;

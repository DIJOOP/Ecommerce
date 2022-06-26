import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../layout/Loader/Loader";
import Metadata from "../layout/Metadata";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { useAlert } from "react-alert";
import { clearErrors, myOrders } from "../../Actions/orderAction";
import { Link } from "react-router-dom";
import { Launch } from "@mui/icons-material";
import "./MyOrders.css";

const MyOrders = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);
  const columns = [
    { field: "id", headerName: "order id", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "itemsQty",
      headerName: "quantity",
      type: "",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "  Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <Launch />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      <Metadata title="myorders" />
      {loading ? (
        <Loader />
      ) : (
        user && (
          <div className="myOrdersPage">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="myOrdersTable"
              autoHeight
            />

            <Typography id="myOrdersHeading">{user.name}'s orders</Typography>
          </div>
        )
      )}
    </Fragment>
  );
};

export default MyOrders;

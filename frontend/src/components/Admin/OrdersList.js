import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Link, useParams,useNavigate } from "react-router-dom";
import { Edit, Delete } from "@mui/icons-material";
import { Button } from "@mui/material";
import Metadata from "../layout/Metadata";
import SideBar from "./Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import "./productList.css";
import { clearErrors, deleteOrder, getAllOrders } from "../../Actions/orderAction";

const OrdersList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate=useNavigate()
  // const params = useParams();
  const { error, orders } = useSelector((state) => state.allOrders);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.orderUpdate
  );

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
      field: "action",
      headerName: "Actions",
      type: "number",
      minWidth: 150,
      sortable: false,
      flex: 0.3,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
              <Edit />
            </Link>
            <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
              }
            >
              <Delete />
            </Button>
          </Fragment>
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

  const deleteOrderHandler = (id) => {
    
    dispatch(deleteOrder(id));
    
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if(isDeleted){
      alert.success("product deleted successfully")
      dispatch({type:"deleteOrderReset"})
      navigate('/admin/orders')
    }
    dispatch(getAllOrders());
  }, [dispatch, error, alert,deleteError,isDeleted]);

  return (
    <Fragment>
      <Metadata title="all orders-admin" />

      <div className="dashboard">
        <SideBar />
        <div className="productListContaner">
          <h1 id="productListHeading">All Orders</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productlistTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default OrdersList;

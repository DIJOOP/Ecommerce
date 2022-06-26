import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import "./Dashboard.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { getAllAdminProducts } from "../../Actions/productAction";
import { getAllOrders } from "../../Actions/orderAction";
import { getAllUsers } from "../../Actions/userAction";

const Dashboard = () => {
  const dispatch = useDispatch();
  // const alert = useAlert();

  const { products } = useSelector((state) => state.products);
  const {orders}=useSelector(state=>state.allOrders)
  const {users}=useSelector(state=>state.allUsers)
  
  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });
  useEffect(() => {
    dispatch(getAllAdminProducts());
    dispatch(getAllOrders())
    dispatch(getAllUsers())
  }, [dispatch]);

  const lineState = {
    labels: ["initial amount", "Amount earned"],
    datasets: [
      {
        label: "Total Amount",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197,72,49"],
        data: [0, 4000],
      },
    ],
  };

  const dougnutState = {
    labels: ["Out of Stock", "Instock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products && products.length-outOfStock],
      },
    ],
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> 2000
            </p>
          </div>
          <div className="dasboardSummaryBox2">
            <Link to="/admin/products">
              <p>Products</p>
              <p>{products&& products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders&&orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>

        <div className="linechart">
          <Line data={lineState} />
        </div>
        <div className="doughnutChart">
          <Doughnut data={dougnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

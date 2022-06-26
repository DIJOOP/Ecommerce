import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Link, useParams,useNavigate } from "react-router-dom";
import { Edit, Delete } from "@mui/icons-material";
import { Button } from "@mui/material";
import Metadata from "../layout/Metadata";
import SideBar from "./Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import {
  getAllAdminProducts,
  clearErrors,
  deleteProduct,
} from "../../Actions/productAction";
import "./productList.css";

const ProductList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate=useNavigate()
  // const params = useParams();
  const { error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
    { field: "name", headerName: "Name ", minWidth: 350, flex: 0.1 },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "price",
      headerName: "Price",
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
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <Edit />
            </Link>
            <Button
              onClick={() =>
                deleteProducrHandler(params.getValue(params.id, "id"))
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
  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      });
    });

  const deleteProducrHandler = (id) => {
    
    dispatch(deleteProduct(id));
    
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
      dispatch({type:"productDeleteReset"})
      navigate('/admin/dashboard')
    }
    dispatch(getAllAdminProducts());
  }, [dispatch, error, alert,deleteError,isDeleted]);

  return (
    <Fragment>
      <Metadata title="Allproducts-admin" />

      <div className="dashboard">
        <SideBar />
        <div className="productListContaner">
          <h1 id="productListHeading">All Products</h1>
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

export default ProductList;

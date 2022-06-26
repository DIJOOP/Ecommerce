import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./productReview.css";
import { Person, } from "@mui/icons-material";
import Metadata from "../layout/Metadata";
import Sidebar from "./Sidebar";
import { Button } from "@mui/material";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { getAllReviews, deleteReview, clearErrors } from "../../Actions/productAction";
import { DataGrid } from "@mui/x-data-grid";
import {  Delete } from "@mui/icons-material";

const ProductRevews = () => {
  const { reviews, loading, error } = useSelector((state) => state.allReviews);
  const { isDeleted, error: deleteError } = useSelector(
    (state) => state.reviewDelete
  );

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const [productId, setProductId] = useState("");

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.6,
    },

    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,

      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "greenColor"
          : "redColor";
      },
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
          <Fragment>
            <Button
              onClick={() =>
                deleteReviewHandler(params.getValue(params.id, "id"))
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
  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReview(productId, reviewId));
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  useEffect(() => {
    if(productId.length===24){
      dispatch(getAllReviews(productId));
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("review deleted successfully");
      navigate("/admin/reviews");
      dispatch({ type: "deleteReviewReset" });
    }
  }, [dispatch,isDeleted,alert,deleteError, error, productId]);

  return (
    <Fragment>
      <Metadata title="userreviews" />
      <div className="dashboard">
        <Sidebar />
        <div className="productReviewsContainer">
          {loading ? (
            <Loader />
          ) : (
            <>
              <form
                className="productReviewsForm"
                encType="multipart/form-data"
                onSubmit={searchSubmitHandler}
              >
                <h1 className="productReviewsFormHeading" >Enter PoductID</h1>
                <div>
                  <Person />
                  <input
                    type="text"
                    placeholder="ProductId"
                    required
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                  />
                </div>
                <Button
                  id="createProductBtn"
                  type="submit"
                  disabled={loading && loading ? true : false}
                >
                  Search
                </Button>
              </form>
              {reviews && reviews.length > 0 ? (
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  disableSelectionOnClick
                  className="productlistTable"
                  autoHeight
                />
              ) : (
                <h1 className="productReviewsFormHeading"> No reviews Found</h1>
              )}
            </>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductRevews;

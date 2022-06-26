import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Edit, Delete } from "@mui/icons-material";
import { Button } from "@mui/material";
import Metadata from "../layout/Metadata";
import SideBar from "./Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import "./productList.css";
import {
  getAllUsers,
  clearErrors,
  deleteUserbyAdmin,
} from "../../Actions/userAction";

const Userslist = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  // const params = useParams();

  const { users, error, loading } = useSelector((state) => state.allUsers);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.userUpdate
  );

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 200, flex: 0.5 },
    { field: "name", headerName: "Name ", minWidth: 270, flex: 0.1 },
    {
      field: "email",
      headerName: "Email",
      minWidth: 350,
      flex: 0.5,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 150,
      flex: 0.3,
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
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <Edit />
            </Link>
            <Button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
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
  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  const deleteUserHandler = (id) => {
    dispatch(deleteUserbyAdmin(id));
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
    if (isDeleted) {
      alert.success("user deleted successfully");
      dispatch({ type: "deleteUserReset" });
      navigate("/admin/users");
    }
    dispatch(getAllUsers());
  }, [dispatch, error, alert, deleteError, isDeleted]);

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

export default Userslist;

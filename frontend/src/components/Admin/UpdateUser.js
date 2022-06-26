import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./newProduct.css";
import { Person, Mail, VerifiedUser } from "@mui/icons-material";
import Metadata from "../layout/Metadata";
import Sidebar from "./Sidebar";
import { Button } from "@mui/material";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import {
  clearErrors,
  getUserDetail,
  updateUserbyAdmin,
} from "../../Actions/userAction";

function UpadateUser() {
  const { loading, error, user } = useSelector((state) => state.userDetails);
  const {
    loading: updateLoading, error: updateError, isUpdated,
  } = useSelector((state) => state.userUpdate);

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const params = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const updateSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);
    dispatch(updateUserbyAdmin(params.id, myForm));
  };

  useEffect(() => {
    if (!user || user._id !== params.id) {
      dispatch(getUserDetail(params.id));
    } else {
      setName(user && user.name);
      setEmail(user && user.email);
      setRole(user && user.role);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("user updated successfully");
      navigate("/admin/users");
      dispatch({ type: "updateUserReset" });
    }
  }, [dispatch, isUpdated, user, error, params.id]);

  return (
    <Fragment>
      <Metadata title="updateUser" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <form
              className="createProductForm"
              encType="multipart/form-data"
              onSubmit={updateSubmitHandler}
            >
              <h1>Update User</h1>
              <div>
                <Person />
                <input
                  type="text"
                  placeholder="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <Mail />
                <input
                  type="text"
                  placeholder="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div>
                <VerifiedUser />
                <select onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  ))
                </select>
              </div>

              <Button
                id="createProductBtn"
                type="submit"
                disabled={loading && loading ? true : false}
              >
                Update
              </Button>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default UpadateUser;

import React, { Fragment, useEffect, useState } from "react";
import "./UpdateProfile.css";
import Loader from "../layout/Loader/Loader";
import {  useNavigate } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutlined";
import LockOpenIcon from "@mui/icons-material/LockOpenOutlined";

import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword} from "../../Actions/userAction";
import { useAlert } from "react-alert";
import Metadata from "../layout/Metadata"



const UpdatePassword = () =>{
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    const { loading, isUpdated, error } = useSelector((state) => state.profile);
  
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
  
  
  
    const UpdatePasswordSubmit = (e) => {
      e.preventDefault();
      const myForm = new FormData();
      myForm.set("oldPassword", oldPassword);
      myForm.set("newPassword", newPassword);
      myForm.set("confirmPassword", confirmPassword);
      dispatch(updatePassword(myForm));
    };
  
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
      if (isUpdated) {
        alert.success("password updated successfully");
        navigate("/account");
        dispatch({
          type: "updatePasswordReset",
        });
      }
    }, [dispatch, alert, error, navigate, isUpdated]);
  
    return (
      <Fragment>
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <Metadata title="UpdatePassword"/ >
            <div className="UpdateProfileContainer">
              <div className="UpdateProfileBox">
  
                <h1 className="UpdateProfileHeading">Update Password</h1>
                <form
                  className="UpdateProfileForm"
                  encType="multipart/form-data"
                  onSubmit={UpdatePasswordSubmit}
                >
                     <div className="oldPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="oldPassword"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                <div className="newPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="newPassword"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="confirmPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="confirmPassword"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                  
                  <input
                    type="submit"
                    value="Update"
                    className="UpdateProfileBtn"
                  />
                </form>
              </div>
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  };

export default UpdatePassword
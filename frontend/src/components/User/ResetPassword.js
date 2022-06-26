import React, { Fragment, useEffect, useState } from "react";
import "./UpdateProfile.css";
import Loader from "../layout/Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutlined";
import LockOpenIcon from "@mui/icons-material/LockOpenOutlined";

import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  resetPassword,
  updatePassword,
} from "../../Actions/userAction";
import { useAlert } from "react-alert";
import Metadata from "../layout/Metadata";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const params = useParams();
  const { loading, success, error } = useSelector((state) => state.forgotPass);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const UpdatePasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(resetPassword(params.token, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("password updated successfully");
      navigate("/login");
    }
  }, [dispatch, alert, error, navigate, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title="resetPassword" />
          <div className="UpdateProfileContainer">
            <div className="UpdateProfileBox">
              <h1 className="UpdateProfileHeading">RESET PASSWORD</h1>
              <form
                className="UpdateProfileForm"
                encType="multipart/form-data"
                onSubmit={UpdatePasswordSubmit}
              >
                <div className="newPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="newPassword"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

export default ResetPassword;

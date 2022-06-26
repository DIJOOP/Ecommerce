import React, { Fragment, useEffect, useState } from "react";
import "./UpdateProfile.css";
import Loader from "../layout/Loader/Loader";
import MailOutlineIcon from "@mui/icons-material/MailOutlined";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../Actions/userAction";
import { useAlert } from "react-alert";
import Metadata from "../layout/Metadata";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, message } = useSelector(
    (state) => state.forgotPass
  );

  const [email, setEmail] = useState("");

  const UpdateProfileSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("email", email);

    dispatch(forgotPassword(myForm));

  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      alert.success(message);
      dispatch(clearErrors());
    }
  }, [dispatch,error,message, alert, loading]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title="forgotpassword" />
          <div className="UpdateProfileContainer">
            <div className="UpdateProfileBox">
              <h1 className="UpdateProfileHeading">FORGOT PASSWORD</h1>
            
              <form
                className="UpdateProfileForm"
                onSubmit={UpdateProfileSubmit}
              >
                <div className="UpdateProfileEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Enter your Registered Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="send"
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

export default ForgotPassword;

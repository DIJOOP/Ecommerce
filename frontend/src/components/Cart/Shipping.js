import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Metadata from "../layout/Metadata";
import { useAlert } from "react-alert";
import { Country, State } from "country-state-city";
import "./Shipping.css";
import {useNavigate} from "react-router-dom"
import CheckoutSteps from "./CheckoutSteps";
import {
  Home,
  LocationCity,
  Public,
  TransferWithinAStation,
  PinDrop,
  Phone,
} from "@mui/icons-material";
import { saveShipping } from "../../Actions/cartAction";


const Shipping = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate= useNavigate()
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [phone, setPhone] = useState(shippingInfo.phone);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);

  const shippingSubmit = (e) => {
    e.preventDefault();
    if (phone.length > 10 || phone.length < 10) {
      alert.error("phone number should be 10 digits");
      return;
    }
    dispatch(saveShipping({ address, city, state, country, phone, pinCode }));
    navigate("/order/confirm")
  };

  return (
    <Fragment>
      <Metadata title="shipping" />
      <CheckoutSteps activeSteps={0} />
      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>
          <form
            action=""
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div>
              <Home />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <LocationCity />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div>
              <PinDrop />
              <input
                type="number"
                placeholder="PIN CODE"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>
            <div>
              <Phone />
              <input
                type="number"
                placeholder="Phone"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div>
              <Public />
              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="Country"></option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option value={item.isoCode} key={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div>
                <TransferWithinAStation />
                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <input
              type="submit"
              value="continue"
              className="shippingBtn"
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;

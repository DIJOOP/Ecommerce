import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Payment from "./Payment";

const Stripeconfig = () => {
  const stripePromise = loadStripe(
      "pk_test_51KfIuESIMsOcUZIe5dr0Rc6WZmYKTrEzVkHBTBXAS9Isi8sTi8YFVq8MjiWFJf4W9Q4XI1Qr8at9FVp8Nyu1cIOe00SaCB6bbw"
    )
  

  // const [stripeApiKey, setStripeApiKey] = useState("");
  //    console.log(stripePromise);
  // async function getStripeApiKey() {
  //   const{ data }= await axios.get("api/v1/stripeapikey");
  //   console.log("reached");
  //   console.log(data);
  //   setStripeApiKey(data.stripeApiKey);
  //   console.log(stripeApiKey);
  // }

  return (
    <>
      {stripePromise && (
        <Elements stripe={stripePromise}>
          <Payment />
        </Elements>
      )}
    </>
  );
};

export default Stripeconfig;

import React, { Fragment } from 'react'
import {CheckCircle} from "@mui/icons-material"
import {Typography} from "@mui/material"
import {Link} from "react-router-dom"
import "./ordersuccess.css"


const OrderSuccess = () => {
  return (
    
    <Fragment>

    <div className="orderSuccess">

        <CheckCircle/>
        <Typography>The order has been placed successfully</Typography>
       <Link to="/order/me">View Orders</Link>
    </div>

    </Fragment>
  )
}

export default OrderSuccess
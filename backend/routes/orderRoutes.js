const express =require("express")
const { newOrder, getSingleOrder, myOrder, getAllOrders, updateOrder, deletOrder } = require("../controllers/orderControllers")
const router = express.Router()
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')

router.post("/order/new",isAuthenticatedUser,newOrder)
router.get("/order/:id",isAuthenticatedUser,getSingleOrder)
router.get("/orders/me",isAuthenticatedUser,myOrder)

router.get("/admin/orders",isAuthenticatedUser,authorizeRoles("admin"),getAllOrders)
router.put("/admin/order/:id",isAuthenticatedUser,authorizeRoles("admin"),updateOrder)
router.delete("/admin/order/:id",isAuthenticatedUser,authorizeRoles("admin"),deletOrder)

module.exports=router
const express = require("express");
const { _router } = require("../app");
const {
  registerUser,
  loginUser,
  logOutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deletUser,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.get("/logout", logOutUser);
router.get("/me", isAuthenticatedUser, getUserDetails);
router.put("/password/update", isAuthenticatedUser, updatePassword);
router.put("/me/update", isAuthenticatedUser, updateProfile);
router.get("/admin/users" ,isAuthenticatedUser,authorizeRoles("admin"),getAllUsers)
router.get("/admin/user/:id" ,isAuthenticatedUser,authorizeRoles("admin"),getSingleUser)
router.put("/admin/user/:id" ,isAuthenticatedUser,authorizeRoles("admin"),updateUserRole)
router.delete("/admin/user/:id" ,isAuthenticatedUser,authorizeRoles("admin"),deletUser)



module.exports = router;

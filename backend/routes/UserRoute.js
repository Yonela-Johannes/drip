const express = require("express");
const {
  createUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  updatePassword,
  updateProfile,
  getAllUsers,
  updateUserRole,
  deleteUser,
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  getUser,
} = require("../controllers/UserController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");


const router = express.Router();

router.route("/register").post(createUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logoutUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/me/update").put(isAuthenticatedUser, updatePassword);

router.route("/me/:userId").put(updateProfile);

router.route("/me/:userId").get(getUser);


router.route("/add-wishlist/:userId").put(addToWishlist);
router.route("/remove-wishlist/:userId/:productId").delete(removeFromWishlist);
router.route("/wishlist/:userId").get(getWishlist);

router
  .route("/admin/users")
  .get(getAllUsers);

router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);

router
  .route("/admin/user/:id")
  .get(getUser)
  .get(isAuthenticatedUser, authorizeRoles("admin"), getUser)
  .put(updateUserRole)
  .delete(deleteUser);

module.exports = router;

const express = require("express");
const {
  getCategories,
  deleteCategory,
  updateCategory,
  getCategory,
  createCategory,
 } = require("../controllers/CategoryController");
 const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
 const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/category").post(createCategory);
router.route("/category/:id").get(getCategory);
router.route("/categories").get(getCategories);

router.route("/category/:id").delete(deleteCategory);
router.route("/categories/:id").put(updateCategory);


module.exports = router;

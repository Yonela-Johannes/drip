const express = require("express");
const { createAddress, getAddress, updateAddress } = require("../controllers/AddressController");
 const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
 const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/address").post(createAddress);
router.route("/address/:userId").get(getAddress);
router.route("/address/:id").put(updateAddress);

module.exports = router;

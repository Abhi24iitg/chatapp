const router = require("express").Router();
const {
  registerUser,
  authUser,
  allUsers,
  searchUsers,
} = require("../Controllers/userControllers");
const protect = require("../Middleware/authMiddleware");

// Creating User and getting all user
router.route("/signup").post(registerUser).get(protect, allUsers);
4;
router.route("/user").get(protect, searchUsers);

// Login User

router.route("/login").post(authUser);

module.exports = router;

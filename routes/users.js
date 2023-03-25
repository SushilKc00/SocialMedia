var express = require("express");
const { auth } = require("../midleware/auth");
var router = express.Router();
const {
  registerUser,
  loginUser,
  followUser,
  getAllUsers,
  getProfile,
  getMyProfile,
  changeProfile,
  searchUser,
  unfollowUser,
} = require("../controlers/userControls");

/* GET users listing. */
router.get("/islogin/:userid", auth, (req, res) => {
  res.json({ success: true });
});
router.get("/profile/:userid", getProfile);
router.get("/myprofile/:userid", auth, getMyProfile);
router.get("/getallusers/:userid", auth, getAllUsers);
router.post("/changeprofile/:userid", auth, changeProfile);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/follow/:userid", auth, followUser);
router.post("/unfollow/:userid", auth, unfollowUser);
router.post("/searchuser", searchUser);

module.exports = router;

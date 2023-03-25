var express = require("express");
var router = express.Router();
var { auth } = require("../midleware/auth");
const {
  getAllPost,
  createPost,
  likePost,
  unlikePost,
  comment,
} = require("../controlers/post");

/* GET users listing. */
router.get("/getpost/:userid", auth, getAllPost);
router.post("/createpost", createPost);
router.put("/like/:userid", auth, likePost);
router.put("/unlike/:userid", auth, unlikePost);
router.put("/comment/:userid", auth, comment);

module.exports = router;

var express = require("express");
var router = express.Router();
var { auth } = require("../midleware/auth");
const { sendMessage, getMessage } = require("../controlers/message");

/* GET users listing. */
router.get("/getmessage/:senderid", getMessage);
router.post("/sendmessage", sendMessage);
// router.put("/like/:userid", auth, likePost);
// router.put("/unlike/:userid", auth, unlikePost);
// router.put("/comment/:userid", auth, comment);

module.exports = router;

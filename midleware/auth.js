var jwt = require("jsonwebtoken");
var { userData } = require("../modals/userSchema");
const auth = async (req, res, next) => {
  if (req.params.userid !== "null") {
    await jwt.verify(
      req.params.userid,
      process.env.KEY,
      async (err, payload) => {
        const user = await userData.findById({ _id: payload.userID });
        req.user = user;
        next();
      }
    );
  } else {
    res.json({ success: false, message: "user not loggined" });
  }
};

module.exports = { auth };

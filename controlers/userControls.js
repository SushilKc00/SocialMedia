const { userData } = require("../modals/userSchema");
const { hashing } = require("../Bcryptpassword/bcrypt");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { post } = require("../modals/post");

const getAllUsers = async (req, res) => {
  await jwt.verify(req.params.userid, process.env.KEY, async (err, payload) => {
    const users = await userData.find({ _id: { $ne: payload.userID } });
    res.json({ success: true, users });
  });
};

const getProfile = async (req, res) => {
  const user = await userData.findById({ _id: req.params.userid });
  const userPost = await post.find({ postby: req.params.userid });
  user.gamil = undefined;
  user.password = undefined;
  user.confirmpassword = undefined;
  res.json({ success: true, user, userPost });
};

const getMyProfile = async (req, res) => {
  var userDetails = await userData.findById(req.user._id);
  userDetails.gmail = undefined;
  userDetails.password = undefined;
  userDetails.confirmpassword = undefined;
  var userPost = await post.find({ postby: req.user._id });
  res.json({ success: true, userDetails, userPost });
};

const changeProfile = async (req, res) => {
  await userData.findByIdAndUpdate(req.user._id, { profile: req.body.image });
  res.json({ success: true, message: "profile changed" });
};

const registerUser = async (req, res) => {
  const userExist = await userData.findOne({ gmail: req.body.gmail });
  try {
    if (!userExist) {
      const hashPasword = await hashing(req.body.password);
      const hashConfirmPassword = await hashing(req.body.confirmpassword);
      req.body.password = hashPasword;
      req.body.confirmpassword = hashConfirmPassword;
      await userData.create(req.body);
      res.json({ success: true, message: "Register Successfull" });
    } else {
      res.json({ success: false, message: "Already Register" });
    }
  } catch (error) {
    res.json({ message: error, success: false });
  }
};

const loginUser = async (req, res) => {
  const userExist = await userData.findOne({ gmail: req.body.gmail });
  try {
    if (userExist) {
      const token = await jwt.sign({ userID: userExist._id }, process.env.KEY);
      const isMatch = await bcrypt.compare(
        req.body.password,
        userExist.password
      );
      if (isMatch) {
        userExist.gmail = undefined;
        userExist.password = undefined;
        userExist.confirmpassword = undefined;
        res.json({
          success: true,
          message: "login successfull",
          token,
          user: userExist,
        });
      } else {
        res.json({ success: false, message: "Invalid Details" });
      }
    } else {
      res.json({ success: false, message: "user does not exist" });
    }
  } catch (error) {
    res.json({ success: false, message: error });
  }
};

const followUser = async (req, res) => {
  try {
    const currentUser = await userData.findById({ _id: req.user._id });
    const anotherUser = await userData.findById({ _id: req.body.userid });
    if (!currentUser.following.includes(req.body.userid)) {
      await currentUser.updateOne({ $push: { following: req.body.userid } });
      await anotherUser.updateOne({ $push: { followers: req.user._id } });
      return res.json({ message: "user follow", success: true, anotherUser });
    }
    return res.json({ success: false, message: "Alreday follow" });
  } catch (error) {
    res.json({ message: "error" });
  }
};

const unfollowUser = async (req, res) => {
  try {
    const currentUser = await userData.findById({ _id: req.user._id });
    const anotherUser = await userData.findById({ _id: req.body.userid });
    if (currentUser.following.includes(req.body.userid)) {
      await currentUser.updateOne({ $pull: { following: req.body.userid } });
      await anotherUser.updateOne({ $pull: { followers: req.user._id } });
      return res.json({ message: "user unfollow", success: true });
    }
    return res.json({
      message: "you already unfollow this user",
      success: false,
    });
  } catch (error) {
    res.json({ message: "catch error", success: false });
  }
};

const searchUser = async (req, res) => {
  if (req.body.email !== "") {
    const user = await userData.find({
      name: { $regex: `^${req.body.email}` },
    });
    for (ele of user) {
      ele.gmail = undefined;
      ele.password = undefined;
      ele.confirmpassword = undefined;
    }
    res.json({ success: true, user });
  } else {
    const user = await userData.find({
      name: req.body.email,
    });
    res.json({ success: false, user });
  }
};

module.exports = {
  registerUser,
  loginUser,
  followUser,
  unfollowUser,
  getAllUsers,
  getProfile,
  getMyProfile,
  changeProfile,
  searchUser,
  unfollowUser,
};
// 32b547b3e0e14aaaa612213676739f03

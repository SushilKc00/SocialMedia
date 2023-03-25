const { post } = require("../modals/post");
const { userData } = require("../modals/userSchema");
var jwt = require("jsonwebtoken");

const getAllPost = async (req, res) => {
  var adminPost = await post
    .find({ postby: req.user._id })
    .populate("postby", "name followers _id following profile")
    .populate("comments.postedby", "name  _id profile");
  var followuserPost = await post
    .find({
      postby: { $in: req.user.following },
    })
    .populate("postby", "name followers _id following profile")
    .populate("comments.postedby", "name  _id profile");
  res.json({ success: true, userPost: followuserPost, adminPost });
};

const createPost = async (req, res) => {
  const { desc, image, postby } = req.body;
  await jwt.verify(postby, process.env.KEY, async (err, payload) => {
    if (err) {
      res.json({ message: err });
    } else {
      await post.create({
        desc,
        image,
        postby: payload.userID,
      });
      const user = await userData.findById(payload.userID);
      res.json({ success: true, message: "post uploaded", user });
    }
  });
};

const likePost = async (req, res) => {
  try {
    const userPost = await post.findOne({ _id: req.body.postid });
    if (!userPost.likes.includes(req.user._id)) {
      const result = await post
        .findByIdAndUpdate(
          req.body.postid,
          {
            $push: { likes: req.user._id },
          },
          { new: true }
        )
        .populate("postby", "name profile _id followers following")
        .populate("comments.postedby", "name  _id profile");
      return res.json({ message: "post like", success: true, result });
    }
    return res.json({
      message: "you already like the post",
      success: false,
    });
  } catch (error) {
    res.json({ message: "catch error", success: false });
  }
};
const unlikePost = async (req, res) => {
  try {
    const userPost = await post.findById({ _id: req.body.postid });
    if (userPost.likes.includes(req.user._id)) {
      const result = await post
        .findByIdAndUpdate(
          req.body.postid,
          { $pull: { likes: req.user._id } },
          { new: true }
        )
        .populate("postby", "name profile _id followers following")
        .populate("comments.postedby", "name  _id profile");
      console.log(result);
      return res.json({ message: "post unlike", success: true, result });
    }
    return res.json({
      message: "you already unlike the post",
      success: false,
    });
  } catch (error) {
    res.json({ message: "catch error", success: false });
  }
};
const comment = async (req, res) => {
  try {
    const comment = {
      comment: req.body.comment,
      postedby: req.user._id,
    };
    const result = await post
      .findByIdAndUpdate(
        req.body.postid,
        { $push: { comments: comment } },
        { new: true }
      )
      .populate("comments.postedby", "name  _id profile")

      .populate("postby", "name followers _id following profile")
      .sort({ createdAt: -1 });
    return res.json({ message: "comment", success: true, result });
  } catch (error) {
    res.json({ message: "catch error", success: false });
  }
};

module.exports = { createPost, getAllPost, likePost, unlikePost, comment };

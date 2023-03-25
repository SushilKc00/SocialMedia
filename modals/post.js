const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const postSchema = new Schema(
  {
    desc: { type: String, default: "" },
    image: { type: String, default: "" },
    postby: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    comments: [
      {
        comment: { type: String, default: "" },
        postedby: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const post = new model("post", postSchema);
module.exports = { post };

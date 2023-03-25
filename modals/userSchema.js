const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    gmail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmpassword: { type: String, required: true },
    profile: { type: String, default: "no pic" },
    followers: [{ type: String, ref: "user" }],
    following: [{ type: String, ref: "user" }],
    isOnline: { type: String, default: "0" },
  },
  { timestamps: true }
);

const userData = new model("user", userSchema);
module.exports = { userData };

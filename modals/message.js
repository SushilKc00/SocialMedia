const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const messageSchema = new Schema(
  {
    sender: { type: String, default: "" },
    receiver: { type: String, default: "" },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const message = new model("message", messageSchema);
module.exports = { message };

const { post } = require("../modals/post");
const { userData } = require("../modals/userSchema");
const { message } = require("../modals/message");
var jwt = require("jsonwebtoken");

const getMessage = async (req, res) => {
  const userMessage = await message.find({ sender: req.params.senderid });
  if (userMessage.length > 0) {
    const receiverMessage = await message.find({
      sender: userMessage[0].receiver,
    });
    res.json({ success: true, userMessage, receiverMessage });
  }
};

const sendMessage = async (req, res) => {
  const userMessage = await message.create(req.body);
  res.json({ success: true, userMessage });
};

module.exports = { sendMessage, getMessage };

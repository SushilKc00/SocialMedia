var express = require("express");
var { message } = require("./modals/message");
var { userData } = require("./modals/userSchema");
require("dotenv").config();
var app = express();
var path = require("path");
var usersRouter = require("./routes/users");
var postRouter = require("./routes/post");
var messageRouter = require("./routes/message");
var Database = require("./Database/DB");
var PORT = process.env.PORT || 8000;
var http = require("http").Server(app);
var io = require("socket.io")(http);
var { userData } = require("./modals/userSchema");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("cors")());
app.use("/api/user", usersRouter);
app.use("/api/post", postRouter);
app.use("/api/message", messageRouter);

app.use(express.static(path.join(__dirname, "./Frontend/dist/")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./Frontend/dist/index.html"));
});

io.on("connection", async (socket) => {
  const senderId = socket.handshake.auth.token;
  const data = await userData.findByIdAndUpdate(
    senderId,
    { $set: { isOnline: "1" } },
    { new: true }
  );

  socket.on("existsChat", async (data) => {
    const allMessages = await message.find({
      $or: [
        { sender: data.senderId, receiver: data.receiverId },
        { sender: data.receiverId, receiver: data.senderId },
      ],
    });
    socket.emit("loadChats", { allMessages });
  });
  socket.on("recevier", async (data) => {
    const allMessages = await message.find({
      $or: [
        { sender: data.senderId, receiver: data.receiverId },
        { sender: data.receiverId, receiver: data.senderId },
      ],
    });
    const senderName = await userData.findById(data.senderId);
    socket.broadcast.emit("forreceiver", {
      allMessages,
      sender: data.senderId,
      receiver: data.receiverId,
      senderName,
    });
  });

  socket.on("disconnect", async (socket) => {
    await userData.findByIdAndUpdate(
      senderId,
      { $set: { isOnline: "0" } },
      { new: true }
    );
  });
});

Database(process.env.URL);
http.listen(PORT, () => {
  console.log("Server Connected");
});
module.exports = app;

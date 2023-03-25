const mongoose = require("mongoose");

module.exports = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("Datbase connected");
  } catch (error) {
    console.log(error);
  }
};

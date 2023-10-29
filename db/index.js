const mongoose = require("mongoose");
const dotenv = require("dotenv");
const logger = require("../logger");

dotenv.config();

const connect = (url) => {
  try {
    mongoose.connect(
      url || process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/Blog_db"
    );

    mongoose.connection.on("connected", () => {
      console.log("Connected to Database Successfully.");
    });

    mongoose.connection.on("error", (err) => {
      console.log("There was an error connecting to the database.");
      console.log(err);
    });
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({
      message: "Server Error",
      data: null,
    });
  }
};

module.exports = {
    connect
}
const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const User = require("./models/user");
var cookieParser = require('cookie-parser')
const cors = require("cors");
const { userAuth } = require("./middlewares/authMiddleware");

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/feed", userAuth , async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send("Error fetching feed: " + error.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(process.env.PORT, () => {
      console.log("Server is running on port " + process.env.PORT);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });

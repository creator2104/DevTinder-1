const express = require("express");
const {connectDB} = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json())

app.post("/signup",async (req, res) => {
  const user = new User(req.body);
  try{
    await user.save();
    res.send("User signed up successfully");
  } catch (error) {
    res.status(500).send("Error signing up user: " + error.messageN);
  }
});

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(7777, () => {
      console.log("Server is running on port 7777");
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });


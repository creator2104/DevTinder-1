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

app.get("/user",async(req,res)=>{
   const userEmail = req.body.emailId
  try {
    const user = await User.find({emailId : userEmail});
    if(user.length === 0){
      res.status(404).send("User not found");
    }
    else{
      res.send(user);
    }
  } catch (error) {
    res.status(400).send("Something went wrong"+error.message);
  }
})

app.get("/feed",async(req,res)=>{
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send("Error fetching feed: " + error.message);
  }
})

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


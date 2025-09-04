const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const User = require("./models/user");
const { ReturnDocument } = require("mongodb");
const { validateSignUpData } = require("./utils/signUpValidation");
const bcrypt = require("bcrypt");
var cookieParser = require('cookie-parser')
const cors = require("cors");
const { validateLoginData } = require("./utils/loginValidation");
var jwt = require('jsonwebtoken');
const user = require("./models/user");

app.use(cors());
app.use(express.json());
app.use(cookieParser())

app.post("/signup", async (req, res) => {
  try {
    // validating the data
    validateSignUpData(req);
    // Encrypt the password
    const { firstName , lastName , emailId , password } = req.body; 
    const passwordHash = await bcrypt.hash(password, 10);
    // Create a new user
    const user = new User({ firstName, lastName, emailId, password: passwordHash });
    await user.save();
    res.send("User signed up successfully");
  } catch (error) {
    res.status(500).send("ERROR : " + error.message);
  }
});

app.post("/login", async (req, res) =>{
  try{
    const { emailId , password } = req.body;
    validateLoginData(req)
    const user = await User.findOne({ emailId });
    if(!user){
      throw new Error("User not found");
    } 
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
      throw new Error("Invalid credentials");
    }
    // create a jwt token
    const token = await jwt.sign({ userId: user._id }, "PER6565FECT@QATEST43543", { expiresIn: "1h" });
    // Add the token to cookie and send it to the client
    res.cookie("token", token, { httpOnly: true });
    res.send("User logged in successfully");
  }catch (error) {
    res.status(500).send("ERROR : " + error.message);
  }
})

app.get("/profile",async (req,res)=>{
  try{
  // I want to validate my jwt here 
  const cookies =  req.cookies;
  const { token } = cookies;
  if(!token){
    return res.status(401).send("Unauthorized: No token provided");
  }
  // validate the token 
  const validateToken = jwt.verify(token,"PER6565FECT@QATEST43543")
  // console.log(validateToken);
  const {userId} = validateToken;
  // console.log("my Logged in user is : "+ userId);
  const user = await User.findById(userId)
  if(!user){
    return res.status(404).send("User not found");
  }
  console.log(user);
  // console.log(cookies);
  res.send(user)}
  catch(error){
    res.status(401).send("Unauthorized: Invalid token " + error.message);
  }
})

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.find({ emailId: userEmail });
    if (user.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(400).send("Something went wrong" + error.message);
  }
});

app.delete("/user", async (req, res) => {
  const { userId } = req.body;
  try {
    await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (error) {
    res.status(400).send("Something went wrong: " + error.message);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send("Error fetching feed: " + error.message);
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = [
      "password",
      "age",
      "gender",
      "photoUrl",
      "about",
      "skills",
    ];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Invalid updates!");
    }
    if(data?.skills.length > 5){
      throw new Error("Cannot have more than 5 skills");
    }
    await User.findByIdAndUpdate(
      userId,
      data,
      { runValidators: true },
      { returnDocument: "after" }
    );
    res.send("User updated successfully");
  } catch (error) {
    res.status(400).send("Error updating user: " + error.message);
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

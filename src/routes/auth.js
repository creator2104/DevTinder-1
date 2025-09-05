const express = require('express');
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  try {
    // validating the data
    validateSignUpData(req);
    // Encrypt the password
    const { firstName , lastName , emailId , password } = req.body; 
    const passwordHash = await bcrypt.hash(password, parseInt(process.env.PASSWORD_SALT_ROUNDS));
    // Create a new user
    const user = new User({ firstName, lastName, emailId, password: passwordHash });
    await user.save();
    res.send("User signed up successfully");
  } catch (error) {
    res.status(500).send("ERROR : " + error.message);
  }
});

authRouter.post("/login", async (req, res) =>{
  try{
    const { emailId , password } = req.body;
    validateLoginData(req)
    const user = await User.findOne({ emailId });
    if(!user){
      throw new Error("User not found");
    } 
    const isPasswordValid = await user.validatePassword(password);
    if(!isPasswordValid){
      throw new Error("Invalid credentials");
    }
    const token = await user.getJWT();
    res.cookie("token", token, { httpOnly: true , expires : new Date(Date.now() + parseInt(process.env.COOKIE_EXPIRY)) });
    res.send("User logged in successfully");
  }catch (error) {
    res.status(500).send("ERROR : " + error.message);
  }
})


module.exports = authRouter
const jwt = require('jsonwebtoken');
const User = require("../models/user");
const   userAuth =  async (req, res, next) => {
  try{
    // Read the token from the req. cookies
    const {token} = req.cookies;
    if(!token){
      res.status(401).send({ message: "Unauthorized access" });
    }
    const decodedObj = jwt.verify(token, process.env.JWT_SECRET)
    if(!decodedObj){
      res.status(401).send({ message: "Unauthorized access" });
  }
  const {userId} = decodedObj;
  const user = await User.findById(userId);
  if(!user){
    res.status(401).send({ message: "Unauthorized access" });
  }
  req.user = user;
  next()
  }catch(error){
    res.status(401).send({ message: "Unauthorized access" + error.message });
  }
  // validate the token
  // find the user 
}

module.exports = { userAuth };
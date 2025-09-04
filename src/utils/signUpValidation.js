const validator = require("validator");

const validateSignUpData = (req) => {
    const {firstName , lastName , emailId , password} = req.body
   if(!firstName || !lastName){
    throw new Error("First name and last name are required");
   }
   else if(!validator.isEmail(emailId)){
    throw new Error("Invalid email address");
   }
   else if(!validator.isStrongPassword(password)){
    throw new Error("Create strong password");
   }
   else if(firstName.length < 2 || firstName.length > 30){
    throw new Error("First name is not valid");
   }
   else if(lastName.length < 2 || lastName.length > 30){
    throw new Error("Last name is not valid");
   }
   else if(emailId.length > 20){
    throw new Error("Email is not valid");
   }
}

module.exports = {validateSignUpData};          
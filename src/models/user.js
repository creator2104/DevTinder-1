const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator")

const userSchema = new Schema({
    firstName: {
        type: String,
        trim:true,
        required: true
    },
    lastName: {
        trim:true,
        type: String,
    },
    emailId:{
        type: String,
        lowercase: true,
        required: true,
        trim:true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address"+value);
            }
        }
    },
    password: {
        type: String,
        trim:true,
        required: true,
          validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Create strong password"+value);
            }
        }
    },
    age: {
        trim:true,
        min:18,
        type: Number
    },
    gender:{
        trim:true,
        type: String,
        validate(value){
            if(!["Male", "Female", "Other"].includes(value)){
                throw new Error("Invalid gender");
            }
        }
    },
    photoUrl :{
        trim:true,
        type: String,
          validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid URL"+value);
            }
        }
    },
    about:{
        trim:true,
        type: String
    },
    skills:{
        trim:true,
        type: [String]
    }

}
,{timestamps:true});

module.exports = mongoose.model("User", userSchema);
// model is used to create new instances of User    
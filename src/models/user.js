const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

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
        },
        default: "https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png"
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

userSchema.methods.getJWT = async function(){
    const user = this;
    const token = await jwt.sign({ userId: this._id }, "PER6565FECT@QATEST43543", { expiresIn: "7d" });
    return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid;
}

module.exports = mongoose.model("User", userSchema);
// model is used to create new instances of User    
const mongoose = require("mongoose")

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://mrvinitprajapati07_db_user:FuCGNZNLqqoJ6Dbj@testqa.b3vymfk.mongodb.net/devTinder")
}

module.exports = { connectDB };

    

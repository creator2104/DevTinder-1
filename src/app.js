const express = require("express")

const app = express()

app.use("/",(req,res)=>{
    res.send("Works for all")
})

app.use("/about",(req,res)=>{
    res.send("About us page")
})

app.use("/home", (req, res) => {
  res.send("Welcome to the home page!")
})

app.use("/dashboard",(req,res)=>{
    res.send("Welcome to the dashboard!")
})

app.listen(7777, () => {
  console.log("Server is running on port 7777")
})


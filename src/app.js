const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/authadmin");

const app = express();

app.use("/admin", adminAuth);
app.use("/user", userAuth);

app.get("/user",(req, res, next) => {
  res.send({ message: "User data fetched successfully" });
});

app.get("/admin/getAllData", (req, res, next) => {
    res.send({ message: "All data fetched successfully" });
});

app.delete("/admin/getAllData", (req, res, next) => {
  res.send({ message: "All data deleted successfully" });
});

app.post("/user/:userId/:name/:location", (req, res, next) => {
  console.log(req.params);
  res.send({
    userId: req.params.userId,
    firstName: req.params.name,
    location: req.params.location,
  });
});

app.listen(7777, () => {
  console.log("Server is running on port 7777");
});

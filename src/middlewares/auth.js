const adminAuth =  (req, res, next) => {
  // Logic of authorization of admin
  const token = "xyz";
  const isAdminAuthorize = token === "xyz";
  if(!isAdminAuthorize){
    res.status(401).send({ message: "Unauthorized access" });
  }
  else{
    next()
  }
}

const userAuth =  (req, res, next) => {
  // Logic of authorization of user
  const token = "abc";
  const isUserAuthorized = token === "abc";
  if(!isUserAuthorized){
    res.status(401).send({ message: "Unauthorized access" });
  }
  else{
    next()
  }
}

module.exports = {adminAuth , userAuth};
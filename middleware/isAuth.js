module.exports = (req, res, next) => {
  //check login
  if (req.isAuthenticated()) {
    return res.redirect("/dashboard");
  }
  next();
};

module.exports = (req, res, next) => {
  if (req.user.email !== process.env.ADMIN_MAIL_LOGIN) {
    res.redirect("/dashboard");
  }
  if (req.user.userType !== "admin") {
    res.redirect("/dashboard");
  }
  next();
};

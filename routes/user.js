const express = require("express");
const router = express.Router();

const userCon = require("../controllers/user");
const isLoggedIn = require("../middleware/isLoggedIn");
const isAuth = require("../middleware/isAuth");
const upload = require("../utils/upload");
router.get("/signup", isAuth, userCon.getSignUp);
router.get("/signin", isAuth, userCon.getSignin);
router.get("/verifyUser/:id/:token", isAuth, userCon.verifyUsr);
router.post("/signin", isAuth, userCon.postSignin);
router.post("/signup", isAuth, userCon.postSignup);

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/signin");
  });
});

router.get("/dashboard", isLoggedIn, userCon.getDashboard);
router.get("/profile", isLoggedIn, userCon.getProfile);
router.get("/contact", isLoggedIn, userCon.getEditProfile);

router.get("/about", isLoggedIn, userCon.getAbout)
router.post("/contact", isLoggedIn, userCon.postContact)

module.exports = router;

require("./db/db.js");
const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./routes/user.js");


const cors = require("cors");
const bodyParser = require("body-parser");

const session = require("express-session");
const MongoDBstore = require("connect-mongodb-session")(session);
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const bcrypt = require("bcrypt");
const User = require("./models/user");

dotenv.config();

const app = express();
// sessions
const oSessionStore = new MongoDBstore({
  //calling constructor
  uri: process.env.clusterUrl,
  collection: "usersessions",
});

app.use(express.json());
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use("/files", express.static("uploads/images"));
app.use(
  session({
    secret: "Guide and Tourist is awsome",
    resave: false,
    saveUninitialized: false,
    store: oSessionStore,
  })
);
app.use(
  session({
    secret: process.env.MONGO_SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;

      next();
    })
    .catch((err) => console.log(err));
});
//local variable
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isAuthenticated;
  next();
});

// router
app.get("/", async (req, res, next) => {
  res.send("Hello From Express default route");
});

app.use(userRouter);



// google continue
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.G_CLIENT_ID,
      clientSecret: process.env.G_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOne({ email: profile.emails[0].value });

      if (!user) {
        const newUser = new User({
          email: profile.emails[0].value,
          name: profile.displayName,
          profile: profile.photos[0].value,
          verified: true,
        });
        await newUser.save();
        return done(null, newUser);
      }
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/signin" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

//  Routes
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is Runing on Port ${PORT}`);
});

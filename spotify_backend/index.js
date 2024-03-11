//npm init : package.json -- This is node project
//npm i express : expressJs package installed

const express = require("express");
const mongoose = require("mongoose");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const User = require("./models/User");
const authRoutes = require("./routes/auth");
require("dotenv").config();
const app = express();
const port = 8000;

app.use(express.json());

// connect mongodb to our node app
//mongoose.connect() takes 2 args : 1 which db to connect (db url)
//2 connection options
mongoose
  .connect(
    "mongodb+srv://admin:" +
      process.env.MONGO_PASSWORD +
      "@cluster0.k0na7vd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((x) => {
    console.log("Connected to Mongo!");
  })
  .catch((err) => {
    console.log("Error while connecting to Mongo!");
  });

//setup passport-jwt

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET_Key;
passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ id: jwt_payload.sub }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    });
  })
);

// API : GET -- return hello world
app.get("/", (req, res) => {
  //req contains all the data for request
  //res contains all the data for response
  res.send("Hello World");
});

app.use("/auth",authRoutes);

app.listen(port, () => {
  console.log("App is running on port " + port);
});

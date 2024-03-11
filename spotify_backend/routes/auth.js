const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const getToken = require("../utils/helpers");

//This POST route will help to register a user
router.post("/register", async (req, res) => {
  //This code is run when the /register api is hit
  //My req.body will be of the format(email, password,firstName,lastName, userName)
  const { email, password, firstName, lastName, username } = req.body;

  //Step 2 : check wheather email already exists

  const user = await User.findOne({ email: email });
  if (user) {
    return res
      .status(403)
      .json({ error: "A user with this email already exists" });
  }
  //this is valid request
  //Step 3: create new user
  //Step 3.1 :do not store password in plain text
  const hashedPassword = bcrypt.hash(password, 10);
  const newUserData = {
    email,
    password: hashedPassword,
    firstName,
    lastName,
    username,
  };
  const newUser = await User.create(newUserData);

  //step 4: we want to create token to return to user

  const token = await getToken(email, newUser);

  // step 5: return the result to the user
  const userToReturn = { ...newUser.toJSON(), token };
  delete userToReturn.password;

  return res.status(200).json(userToReturn);
});

module.exports = router;
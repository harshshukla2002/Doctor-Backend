const express = require("express");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { userModel } = require("../Model/User.model");

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (user) {
      res.status(200).send({ msg: "User Already Exists" });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) res.status(400).send({ msg: err.msg });
        else {
          const user = userModel({ email, password: hash });
          await user.save();
          res.status(200).send({ msg: "User Register" });
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "something went wrong" });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jsonwebtoken.sign({ user: user.email }, "doctors");
          res.status(200).send({ msg: "Login Successfull", token });
        } else {
          res.status(400).send({ msg: "Wrong Password" });
        }
      });
    } else {
      res.status(404).send({ msg: "User Not Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "something went wrong" });
  }
});

module.exports = { userRouter };

const db = require("../models");
const express = require("express");
const router = express.Router();
const User = db.user;
const bcrypt = require("bcrypt");
const {createTokens, validateToken} = require("../auth/jwt");

module.exports = productsEndpoints = () => {
  router.post("/register", async (req, res) => {
    const {username, password} = req.body;

    if (!username | !password) {
      return res.status(400).json({msg: "Please Provide Credentials."});
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        username,
        password: hashedPassword,
      });

      console.log(user);
      const accessToken = createTokens(user);
      res.cookie("access-token", accessToken, {
        maxAge: 60 * 60 * 24 * 30 * 1000,
        httpOnly: true,
      });

      return res.status(200).json({msg: "USER REGISTERED", accessToken});
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        res.status(400).json({
          msg: "Username already exists. Please choose a different username.",
        });
      } else {
        console.error("Error during registration:", error);
        res
          .status(500)
          .json({msg: "Failed to register. Please try again later."});
      }
    }
  });

  router.post("/login", async (req, res) => {
    const {username, password} = req.body;
    console.log(username, password);
    if (!username | !password) {
      return res.status(400).json({msg: "Please Provide Credentials."});
    }

    const user = await User.findOne({where: {username}});

    if (!user) {
      return res.status(400).json({msg: "User not Found."});
    }

    const dbPassword = user.password;
    bcrypt.compare(password, dbPassword).then((match) => {
      if (!match) {
        return res.status(400).json({msg: "Incorrect Password or Username."});
      } else {
        const accessToken = createTokens(user);
        res.cookie("access-token", accessToken, {
          maxAge: 60 * 60 * 24 * 30 * 1000,
          httpOnly: true,
        });
        return res
          .status(200)
          .json({msg: "Login Success.", token: accessToken});
      }
    });
  });

  router.get("/profile", validateToken, async (req, res) => {
    res.json("works");
  });

  return router;
};

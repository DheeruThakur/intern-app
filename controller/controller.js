const File = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  try {
    const userName = req.body.userName;
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 12);
    if (!hashedPassword) {
      console.log("error occured in hashing");
    }
    const user = new File({
      userName,
      password: hashedPassword,
    });
    const data = await user.save();
    if (data) {
      res.json({ message: "signup success" });
    } else {
      res.send("signup not success");
    }
  } catch (err) {
    res.send(err);
  }
};

exports.login = async (req, res) => {
  try {
    const userName = req.body.userName;
    const password = req.body.password;
    const user = await File.findOne({ userName });

    if (user) {
      const match = bcrypt.compare(password, user.password);
      if (!match) {
        console.log("password not matched");
      } else {
        jwt.sign(
          { user },
          process.env.SECRET_KEY,
          { expiresIn: "1h" },
          (err, token) => {
            if (err) {
              console.log(err);
            }
            res.json({ token: token });
          }
        );
      }
    } else {
      console.log("user not found");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.createPost = (req, res) => {
  res.json({ message: "post created successfully" });
};

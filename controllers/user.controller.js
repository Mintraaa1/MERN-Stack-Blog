const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config(); 
const secret = process.env.SECRET;

exports.register = async (req, res) => {
    const { username, password } = req.body;

    // เช็คข้อมูลที่ส่งมา
    if (!username || !password) {
      return res.status(400).send({
         message: "Please provide username and password",
         });
    }

    const existimgUser = await UserModel.findOne({ username });
    if (existimgUser) {
        return res.status(400).send({
            message: "This username is already existed",
        });
    }

    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt)
        const user = await UserModel.create({
            username,
            password: hashedPassword,
        });
        res.send({
            message: "User registered successfully",
        });
    } catch (error) {
    console.error("Register error:", error.message);
    res.status(500).send({ message: "Server error" });
  }


exports.login = async (req, res) => {
  const { username, password } = req.body;

  // เช็คข้อมูล
  if (!username || !password) {
    return res.status(400).send({
      message: "Please provide username and password",
    });
  }

  // หา user
  const user = await UserModel.findOne({ username });
  if (!user) {
    return res.status(400).send({ message: "Invalid username or password" });
  }

  // เช็ครหัสผ่าน
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).send({ message: "Invalid username or password" });
  }

  // สร้าง token
  const token = jwt.sign(
    { id: user._id, username: user.username },
    secret,
    { expiresIn: "1d" }
  );

  res.send({
    message: "Login successful",
    token,
  });
};
}
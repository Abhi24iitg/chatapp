const User = require("../Models/User");
const generateToken = require("../generateToken.js");

// SignUp Api
// api/signup
const registerUser = async (req, res) => {
  try {
    const { name, email, password, picture } = req.body;
    console.log(req.body);
    const user = await User.create({ name, email, password, picture });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      picture: user.picture,
      token: generateToken(user._id),
    });
  } catch (e) {
    let msg;
    if (e.code === 11000) {
      msg = "user already exists";
    } else {
      msg = e.message;
    }
    console.log(e);
    res.status(400).json(msg);
  }
};
// login Api
// api/login
const authUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(400).json("user not exist");
  }
  const passcheck = await user.matchPassword(password);
  if (user && passcheck) {
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      picture: user.picture,
      token: generateToken(user._id),
    });
  } else {
    return res.status(401).json("either email or password incorrect");
  }
};

// All users Api
// api/signup
const allUsers = async (req, res) => {
  // console.log(req.query);
  const keyword = req.query.search;
  if (keyword && keyword.trim() !== "") {
    const users = await User.find({
      email: { $regex: new RegExp(`^.*${keyword}.*@`, "i") },
    }).find({ _id: { $ne: req.user._id } });
    res.status(200).json(users);
  } else {
    // Handle the case when the search keyword is empty or contains only spaces
    res.status(400).json({ message: "Invalid search keyword" });
  }
  //   ? {
  //       $or: [
  //         { name: { $regex: req.query.search, $options: "i" } },
  //         { email: { $regex: req.query.search, $options: "i" } },
  //       ],
  //     }
  //   : {};
  // const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  // res.send(users);
};
const searchUsers = async (req, res) => {
  // console.log(req.query);
  const keyword = req.query.search;
  if (keyword && keyword.trim() !== "") {
    const users = await User.find({
      email: { $regex: req.query.search, $options: "i" },
    }).find({ _id: { $ne: req.user._id } });
    res.status(200).json(users);
  } else {
    // Handle the case when the search keyword is empty or contains only spaces
    res.status(400).json({ message: "Invalid search keyword" });
  }
};

module.exports = { registerUser, authUser, allUsers,searchUsers};

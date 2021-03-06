import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      userType: user.userType,
      unreadMessages: user.unreadMessages || 0,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("Invalid email or password");
  }
});
//Register user
//POST /api/users

const registerUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    gender,
    description,
    phone,
    region,
    experience,
    userType,
  } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    gender,
    description,
    phone,
    region,
    experience,
    userType,
    unreadMessages: 0,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      description: user.description,
      phone: user.phone,
      region: user.region,
      gender: user.gender,
      isAdmin: user.isAdmin,
      experience: user.experience,
      userType: user.userType,
      unreadMessages: user.unreadMessages,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//Get user profile
//Route GET /api/users/profile
//Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      region: user.region,
      description: user.description,
      experience: user.experience,
      gender: user.gender,
      userType: user.userType,
      phone: user.phone,
      busyStartDate: user?.busyStartDate,
      busyEndDate: user?.busyEndDate,
      unreadMessages: user.unreadMessages || 0,
    });
  } else {
    res.status(404);
    throw new Error("Invalid email or password");
  }
  res.send("Success!");
});

//Update user profile
//Route PUT /api/users/profile
//Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    const { user, body } = req;
    (user.name = req.body.name || user.name),
      (user.email = req.body.email || user.email);
    if (req.body.password) {
      user.password = req.body.password;
      user.region = body.region;
      user.phone = body.phone;
      user.experience = body.experience;
      user.description = body.description;
      user.gender = body.gender;
      user.userType = body.userType;
      user.busyStartDate = body?.busyStartDate;
      user.busyEndDate = body?.busyEndDate;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      gender: updatedUser.gender,
      userType: updatedUser.userType,
      experience: updatedUser.experience,
      description: updatedUser.description,
      phone: updatedUser.phone,
      region: updatedUser.region,
      busyStartDate: updatedUser?.busyStartDate,
      busyEndDate: updatedUser?.busyEndDate,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("Invalid email or password");
  }
  res.send("Success!");
});

// Get admin users
// Route GET /api/users
// Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const {
    _id,
    userType,
  } = req.user;
  const users = await User.find({ _id: { $ne: _id }, userType: userType === 'customer' ? 'assistant' : 'customer' });
  res.json(users);
});

// delete user
// Route DELETE /api/users/:id
// Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// Get user by ID
// Route GET /api/users/:id
// Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// Update user
// Route PUT /api/users/:id
// Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    (user.name = req.body.name || user.name),
      (user.email = req.body.email || user.email);
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("Invalid email or password");
  }
  res.send("Success!");
});

const getParticipatedUsers = asyncHandler(async (req, res) => {
  const { ids } = req.headers;
  const allIds = ids.split(',');
  const users = await User.find({ _id: { $in: allIds } });
  res.json(users);
});

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  getParticipatedUsers
};

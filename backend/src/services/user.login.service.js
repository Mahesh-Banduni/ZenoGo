const User = require("../models/user.model.js");
const JWTToken = require("../utils/token.generation.util.js");
const { sendOTP, verifyOTP } = require("../utils/email.util.js");
const hashValue = require("../utils/hashing.util.js");

const {
  ConflictError,
  NotFoundError,
  BadRequestError,
} = require("../errors/errors.js");
const crypto = require("crypto");

// Login a user and issue a JWT token
const loginUser = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFoundError("No user exist with this email address");
  }

  const hashPassword = hashValue.hash(password);

  // Check password is correct
  if (user.password !== hashPassword) {
    throw new BadRequestError("Incorrect password");
  }

  //const response = await sendOTP(user.email);
  const response=JWTToken.generateToken(user);
  return { response };
};

const verifyLoginOTP = async (email, otp) => {
   
  const response = await verifyOTP(email, otp);
  const user = await User.findOne({ email });
  // Generate JWT token after user creation

  if (response.success) {
    // Generate JWT token after user creation
    const user = await User.findOne({ email });
    const token = JWTToken.generateToken(user);

    user.isVerified = true;
    await user.save();
    return { response, token, user };
  }

  return { response };
};

// Logout the user (just a placeholder, JWT is stateless)
const logoutUser = async (req) => {
  // Since JWT is stateless, logout is handled on the frontend
  // But we can invalidate the token by managing a blacklist on the server-side (if needed)
  return { message: "User logged out successfully" };
};

const forgetPassword = async (email) => {

  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFoundError("User not found");
  }

  const response = await sendOTP(user.email);
  return { response, user }; // Return both user and token
};

module.exports = {
  loginUser,
  verifyLoginOTP,
  logoutUser,
  forgetPassword,
};

const userLoginService = require("../services/user.login.service.js");
const logger = require("../configs/winston.config.js");

// Login a user
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { response, user } = await userLoginService.loginUser(
      email,
      password
    );
    // Send back the user data and the token
    res.status(200).json({
      success: true,
      data: { response },
    });
  } catch (error) {
    next(error);
  }
};

const verifyLoginOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const { response, token, user } = await userLoginService.verifyLoginOTP(
      email,
      otp
    );
    res.status(200).json({
      success: true,
      data: { response, token, user },
    });
  } catch (error) {
    //console.log(error);
    next(error);
  }
};

// Logout a user
const logoutUser = async (req, res, next) => {
  try {
    const result = await userLoginService.logoutUser(req); // Usually handled on the frontend
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const forgetPassword = async (req, res, next) => {
  try {
    const { response, user } = await userLoginService.forgetPassword(
      req.body.email
    );
    res.status(200).json({
      success: true,
      data: { response },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginUser,
  verifyLoginOTP,
  logoutUser,
  forgetPassword,
};

const crypto = require('crypto');
const dotenv = require("dotenv");

dotenv.config();

exports.hash = (value)=> {
  return crypto.createHash('sha256', process.env.JWT_SECRET).update(value).digest('hex');
};
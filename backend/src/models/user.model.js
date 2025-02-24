const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  role: { type: String, enum: ["passenger", "driver", "admin"], required: true },
  profilePicture: { type: String }, // URL of profile picture
  isVerified: { type: Boolean, default: false }, // Email/Phone verification
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, unique: true },
  role: { type: String, enum: ["passenger", "driver", "admin"], default: "passenger", required: true },
  profilePicture: { type: String }, // URL of profile picture
  isVerified: { type: Boolean, default: false }, // Email/Phone verification
  rides: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ride" }],
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
module.exports= User;

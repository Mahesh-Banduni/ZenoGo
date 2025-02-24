const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  carModel: { type: String, required: true },
  carNumber: { type: String, required: true, unique: true },
  licenseNumber: { type: String, required: true, unique: true },
  isAvailable: { type: Boolean, default: true },
  rating: { type: Number, default: 5 },
  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], required: true }, // [longitude, latitude]
  },
});

driverSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Driver", driverSchema);

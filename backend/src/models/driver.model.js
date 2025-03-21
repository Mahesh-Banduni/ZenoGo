const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  vehicleType:{
    type:String
  },
  vehicleNumber: { type: String, required: true, unique: true },
  licenseNumber: { type: String, required: true, unique: true },
  isAvailable: { type: Boolean, default: true },
  rating: { type: Number, default: 5 },
  rides: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ride" }],
  locationAddress: { type: String},
  locationLat: {type: String},
  locationLng: {type: String},
  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], required: true }, // [longitude, latitude]
  },
});

driverSchema.index({ location: "2dsphere" });

const Driver = mongoose.model("Driver", driverSchema);
module.exports= Driver;

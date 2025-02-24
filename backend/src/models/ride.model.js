const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
  passengerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" },
  pickupLocation: {
    address: { type: String},
    eloc: { type: String},
  },
  dropoffLocation: {
    address: { type: String},
    eloc: { type: String},
  },
  sourceLocation: {
    address: { type: String},
    lat: { type: String},
    lng: {type: String}
  },
  destinationLocation: {
    address: { type: String},
    lat: { type: String},
    lng: {type: String}
  },
  status: {
    type: String,
    enum: ["requested", "accepted", "on_ride", "completed", "cancelled"],
    default: "requested",
  },
  distance:{
    type: String
  },
  duration:{
    type: String
  },
  fare: { type: Number },
  paymentMethod: { type: String, enum: ["Digital Payment", "cash"], required: true },
  paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

rideSchema.index({ pickupLocation: "2dsphere", dropoffLocation: "2dsphere" });

module.exports = mongoose.model("Ride", rideSchema);

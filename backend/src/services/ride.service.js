const Ride = require("../models/ride.model");
const User = require("../models/user.model");
const { findNearbyDrivers } = require("./driver.service");
const { getOptimizedRoute } = require("./olamaps.service");

const calculateFare = async (rideDetails) => {
    const {pickupLat, pickupLng, dropOffLat, dropOffLng, vehicleType} = rideDetails;
    const rideData= await getOptimizedRoute(pickupLat, pickupLng, dropOffLat, dropOffLng);
    const { distance, duration, polyline } = rideData[0];
    const distanceInKm = (distance / 1000).toFixed(2) + " km";
    const totalMinutes = Math.floor(duration / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const durationInHrMin = `${hours} hr ${minutes} min`;
    const baseFare = { Bike:20, Mini: 50, Sedan: 70, SUV: 90 };
    const perKmRate = { Bike:7, Mini: 10, Sedan: 12, SUV: 15 };
    const totalFare=baseFare[vehicleType] + perKmRate[vehicleType] * ((distance / 1000).toFixed(2));
    return {totalFare, distanceInKm, durationInHrMin, polyline};
};  

const createRide = async (userId, rideDetails) => {
    // Find nearby drivers
    // const availableDrivers = await findNearbyDrivers(pickupLocation);
    // if (!availableDrivers.length) {
    //   return res.status(404).json({ message: "No drivers available" });
    // }

    // Create ride request
    const ride = new Ride({
      passengerId: userId,
      pickupLocation: { address: rideDetails.pickupAddress, lat: rideDetails.pickupLat, lng:rideDetails.pickupLng},
      dropoffLocation: { address: rideDetails.dropOffAddress, lat: rideDetails.dropOffLat, lng:rideDetails.dropOffLng},
      distance: rideDetails.distanceInKm,
      duration: rideDetails.durationInHrMin,
      fare: rideDetails.fare,
      vehicleType: rideDetails.vehicleType,
      polyline: rideDetails.polyline,
      paymentMethod: rideDetails.paymentMethod
    });

    await ride.save();
    const user = await User.findById(userId);
    user.rides.push(ride._id);
    await user.save();
};

// Verify Razorpay payment
const verifyPayment = async (razorpay_order_id, razorpay_payment_id, razorpay_signature) => {
  const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

  if (generatedSignature !== razorpay_signature) {
      throw new BadRequestError("Payment verification failed");
  }

  const ride = await Ride.findOne({ paymentId: razorpay_order_id });
  if (!ride) throw new NotFoundError("Ride not found");

  ride.paymentStatus = "Paid";
  await ride.save();

  return { message: "Payment successful", ride };
};

// Get all Rides of a user
const getRidesByUserId = async (userId) => {
  const rides = await Order.find({ userId }).populate("userId","name phone email");
  if (!rides) throw new NotFoundError("Rides not found");
  return rides;
};

// Get a single ride by ID
const getRideById = async (rideId) => {
  const ride = await Ride.findById(rideId).populate("items.productId");
  if (!ride) throw new NotFoundError("Ride not found");
  return ride;
};

module.exports = { calculateFare, createRide, verifyPayment, getRidesByUserId, getRideById };

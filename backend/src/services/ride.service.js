const Ride = require("../models/ride.model");
const User = require("../models/user.model");
const Driver= require("../models/driver.model");
const { findNearbyDrivers } = require("./driver.service");
const { getOptimizedRoute } = require("./olamaps.service");
const crypto= require("crypto");
const Razorpay = require("razorpay");

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const generateRideCode = async () => {
  let id;
  do {
      id = Math.floor(10 ** 14 + Math.random() * 9 * 10 ** 14); // Generates a number between 10^14 and 10^15 - 1
  } while (id % 10 === 0); // Ensures it does not end in zero
  return id; // Returns the number as a string
};

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


  // Generate ride code
  const rideCodePrefix = "ZNG";
  let currentDate;
  let rideCode, rideCodeCheck;
  
  do {
      const generatedCode = await generateRideCode();
      rideCode = rideCodePrefix + generatedCode;
      rideCodeCheck = await Ride.exists({ rideCode });
  } while (rideCodeCheck);

  if (rideDetails.day === "Tomorrow" || rideDetails.day === "Today") {
  // Get current date and adjust for "Tomorrow"
  currentDate = new Date();
  if (rideDetails.day === "Tomorrow") {
    currentDate.setDate(currentDate.getDate() + 1);
  }
  } else {
  // Convert "YYYY-MM-DD" string to Date object
  currentDate = new Date(rideDetails.day);
  }

  // Extract and convert ride timing
  const [hours, minutes, period] = rideDetails.timing.split(/[: ]/);
  let hours24 = parseInt(hours, 10);
  
  if (period.toLowerCase() === "pm" && hours24 !== 12) {
  hours24 += 12; // Convert PM to 24-hour format
  } else if (period.toLowerCase() === "am" && hours24 === 12) {
  hours24 = 0; // Convert 12 AM to 00 hours
  }
  
  currentDate.setHours(hours24, parseInt(minutes, 10), 0, 0);

  const ride = new Ride({
      passengerId: userId,
      rideCode: rideCode,
      pickupAddress: rideDetails.pickupAddress,
      pickupLat: rideDetails.pickupLat, 
      pickupLng: rideDetails.pickupLng,
      dropOffAddress: rideDetails.dropOffAddress,
      dropOffLat: rideDetails.dropOffLat, 
      dropOffLng: rideDetails.dropOffLng,
      distance: rideDetails.distance,
      duration: rideDetails.duration,
      fare: rideDetails.fare,
      vehicleType: rideDetails.vehicleType,
      polyline: rideDetails.polyline,
      paymentMethod: rideDetails.paymentMethod,
      rideTiming: currentDate // Store as Date object
  });

  await ride.save();
  const user = await User.findById(userId);
  user.rides.push(ride._id);
  await user.save();

  if (ride.paymentMethod === 'Digital Payment') {
      // Initiate Razorpay payment
      const razorpayOrder = await razorpay.orders.create({
          amount: Math.round(ride.fare * 100),
          currency: "INR",
          receipt: `ORDER_${ride.rideCode}`,
      });

      ride.paymentId = razorpayOrder.id;
      await ride.save();

      return { ride, razorpayOrder };
  }

  return { ride };
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

  ride.paymentStatus = "paid";
  await ride.save();

  return { message: "Payment successful", ride };
};

// Get all Rides of a user
const getRidesByUserId = async (passengerId) => {
  const rides = await Ride.find({ passengerId }).populate("passengerId","name phone email");
  if (!rides) throw new NotFoundError("Rides not found");
  return rides;
};

// Get a single ride by ID
const getRideById = async (rideId) => {
  const ride = await Ride.findById(rideId);
  if (!ride) throw new NotFoundError("Ride not found");
  return ride;
};

// Update Ride status
const updateRideStatus = async (rideId, status) => {
  const ride = await Ride.findById(rideId);
  if (!ride) throw new NotFoundError("Ride not found");
  if (!status) throw new BadRequestError("Ride status is required");

  ride.rideStatus=status;
  await ride.save();
  return ride;
};

const updateRideStatusByDriver = async (driverId, rideId, status) => {
  const ride = await Ride.findById(rideId);
  if (!ride) throw new NotFoundError("Ride not found");
  if (!status) throw new BadRequestError("Ride status is required");
  const driver = await Driver.findById(rideId);
  if (!driver) throw new NotFoundError("Driver not found");
  ride.driverId=driverId;
  ride.rideStatus=status;
  await ride.save();
  driver.rides.push(ride._id);
  await driver.save();
  return ride;
};

// Delete an ride
const deleteRide = async (rideId) => {
  const ride = await Ride.findByIdAndDelete(rideId);
  if (!ride) throw new NotFoundError("Ride not found");
  const user = await User.findById(ride.userId);
  user.rides = user.rides.filter(
      (id) => id.toString() !== rideId.toString()
  );
  await user.save();
  const driver = await Driver.findById(ride.driverId);
  driver.rides = driver.rides.filter(
      (id) => id.toString() !== rideId.toString()
  );
  await driver.save();
  
  return { message: "Ride deleted successfully", ride };
};

const getAllRides = async (filters) => {
  const query = {};

  // Apply filters
  if (filters.vehicleType) query.vehicleType = filters.vehicleType;
  if (filters.rideStatus) query.rideStatus= filters.rideStatus;

  // Advanced price filter (minPrice, maxPrice)
  if (filters.duration) {
      let startDate = null;
      let endDate = new Date(); // Default end date is today
      const today = new Date();
  
      // Past durations
      if (filters.duration === "Past 1 Week") {
          startDate = new Date();
          startDate.setDate(today.getDate() - 7);
      } else if (filters.duration === "Past 1 Month") {
          startDate = new Date();
          startDate.setMonth(today.getMonth() - 1);
      } else if (filters.duration === "Past 1 Quarter") {
          const currentQuarter = Math.floor(today.getMonth() / 3); // Get current quarter (0-3)
          const lastQuarterEndMonth = currentQuarter * 3 - 1; // Last quarter's last month
          const lastQuarterStartMonth = lastQuarterEndMonth - 2; // Last quarter's first month
  
          startDate = new Date(today.getFullYear(), lastQuarterStartMonth, 1);
          endDate = new Date(today.getFullYear(), lastQuarterEndMonth + 1, 0); // Last day of last quarter
      } else if (filters.duration === "Past 1 Last Year") {
          startDate = new Date(today.getFullYear() - 1, 0, 1); // January 1st of last year
          endDate = new Date(today.getFullYear() - 1, 11, 31); // December 31st of last year
      }
  
      // Apply date filter to the query
      if (startDate) {
          query.timing = { $gte: startDate };
          if (filters.duration.includes("Past 1 Last Quarter") || filters.duration.includes("Past 1 Last Year")) {
              query.timing.$lte = endDate;
          }
      }

  }
  
  // Query database with filters and sorting
  const filteredRides = await Ride.find(query).populate("userId","name phone email").populate("driverId").exec();

  if (!filteredRides || filteredRides.length === 0) {
      throw new Error("No orders found matching the criteria.");
  }

  // If a search query is provided, use js-search for in-memory searching
  let finalResults = filteredRides;
  
  return finalResults;
};

module.exports = { calculateFare, createRide, verifyPayment, getRidesByUserId, getRideById };

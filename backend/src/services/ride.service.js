const Ride = require("../models/Ride");
const { getAddressFromEloc, getOptimalRoute } = require("./mappls.service");
const { findNearbyDrivers } = require("./driver.service");

const calculateFare = async (distance, carType) => {
    const baseFare = { Mini: 50, Sedan: 70, SUV: 90 };
    const perKmRate = { Mini: 10, Sedan: 12, SUV: 15 };
    const totalFare=baseFare[carType] + perKmRate[carType] * distance;
    return totalFare;
};  

const rideDetails = async(start, end, carType)=>{
  const routes= await mapplsService.getOptimizedRoute(start, end);
  const source =await mapplsService.getAddressFromEloc(start);
  const destination=await mapplsService.getAddressFromEloc(end);
  const totalFare= await calculateFare(((routes.distances[0][0] / 1000).toFixed(2)),carType);
  const distance = (routes.distances[0][0] / 1000).toFixed(2) + " km";
  const totalMinutes = Math.floor(routes.durations[0][0] / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const duration = `${hours} hr ${minutes} min`;
  return ( start, end, source, destination, distance, duration, totalFare);
};

const requestRide = async (rideDetails) => {
  try {
    const { start, end, source, destination, distance, duration, totalFare, paymentMethod } = rideDetails;

    // Find nearby drivers
    const availableDrivers = await findNearbyDrivers(pickupLocation);
    if (!availableDrivers.length) {
      return res.status(404).json({ message: "No drivers available" });
    }

    // Create ride request
    const ride = await Ride.create({
      passengerId: userId,
      pickupLocation: { address: source, eloc: start},
      dropoffLocation: { address: destination, eloc: end },
      distance: distance,
      duration: duration,
      fare: totalFare,
      paymentMethod: paymentMethod,
    });

    res.status(201).json({ ride});
  } catch (error) {
    console.error("Error requesting ride:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { requestRide, rideDetails };

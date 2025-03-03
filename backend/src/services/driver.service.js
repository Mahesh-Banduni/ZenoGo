const Driver = require("../models/driver.model");

const findNearbyDrivers = async (pickupLocation) => {
  try {
    const drivers = await Driver.find({
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [pickupLocation.lon, pickupLocation.lat] },
          $maxDistance: 5000, // Search within 5km
        },
      },
      isAvailable: true,
    });

    return drivers;
  } catch (error) {
    console.error("Error finding nearby drivers:", error);
    return [];
  }
};

module.exports = { findNearbyDrivers };

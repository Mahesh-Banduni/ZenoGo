const rideService =require("../services/ride.service");

const calculateFare = async(req, res, next)=>{
    try {
        const {totalFare, distanceInKm, durationInHrMin, polyline}= await rideService.calculateFare(req.body);
        console.log({totalFare, distanceInKm, durationInHrMin, polyline});
        res.status(200).json({
            success: true,
            data: {totalFare, distanceInKm, durationInHrMin, polyline},
          });
    } catch (error) {
        next(error);
    }
};

const createRide = async(req, res, next)=>{
    try {
        const address= await rideService.createRide(req.body);
        res.status(200).json({
            success: true,
            data: address,
          });
    } catch (error) {
        next(error);
    }
};

// Verify Razorpay payment
const verifyPayment = async (req, res, next) => {
    try {
        const { message, ride }= await rideService.verifyPayment(req.body.razorpay_order_id, req.body.razorpay_payment_id, req.body.razorpay_signature);
        res.status(200).json({ message, ride });
    } catch (error) {
         next(error);
    }
};

// Get all rides for a user
const getRidesByUserId = async (req, res, next) => {
    try {
        const rides = await rideService.getRidesByUserId(req.user.id);
        res.status(200).json({
            success: true,
            data: rides,
          });
    } catch (error) {
         next(error);
    }
};

// Get a single ride by ID
const getRideById = async (req, res, next) => {
    try {
        const ride = await rideService.getRideById(req.params.rideId);
        res.status(200).json(ride);
    } catch (error) {
         next(error);
    }
};


module.exports={calculateFare, createRide, verifyPayment, getRidesByUserId, getRideById};
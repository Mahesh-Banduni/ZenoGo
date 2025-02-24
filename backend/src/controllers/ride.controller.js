const rideService =require("../services/ride.service");

const rideDetails = async(req, res, next)=>{
    try {
        const address= await rideService.rideDetails(req.body);
        res.status(200).json({
            success: true,
            data: address,
          });
    } catch (error) {
        next(error);
    }
}

const getCoordinatesFromAddress = async(req, res, next)=>{
    try {
        const results= await rideService.getCoordinatesFromAddress(req.query.address);
        res.status(200).json({
            success: true,
            data: results,
          });
    } catch (error) {
        next(error);
    }
}

module.exports={searchLocation, getOptimizedRoute, getAddressFromCoordinates, getCoordinatesFromAddress};
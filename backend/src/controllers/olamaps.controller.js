const olaMapsService =require("../services/olamaps.service");

const searchLocation = async(req, res, next)=>{
    try {
        const locations= await olaMapsService.searchLocation(req.query.input);
        res.status(200).json({
            success: true,
            data: locations,
          });
    } catch (error) {
        next(error);
    }
}

const getOptimizedRoute = async(req, res, next)=>{
    try {
        const routes= await olaMapsService.getOptimizedRoute(req.query.pickupLat, req.query.pickupLng,req.query.dropOffLat, req.query.dropOffLng, );
        res.status(200).json({
            success: true,
            data: routes,
          });
    } catch (error) {
        next(error);
    }
}

const getAddressFromCoordinates = async(req, res, next)=>{
    try {
        const address= await olaMapsService.getAddressFromCoordinates(req.query.lat, req.query.lon);
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
        const results= await olaMapsService.getCoordinatesFromAddress(req.query.address);
        res.status(200).json({
            success: true,
            data: results,
          });
    } catch (error) {
        next(error);
    }
}

module.exports={searchLocation, getOptimizedRoute, getAddressFromCoordinates, getCoordinatesFromAddress};
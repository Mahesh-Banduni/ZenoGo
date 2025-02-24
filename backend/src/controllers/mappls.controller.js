const mapplsService =require("../services/mappls.service");

const searchLocation = async(req, res, next)=>{
    try {
        const locations= await mapplsService.searchLocation(req.query.query);
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
        const routes= await mapplsService.getOptimizedRoute(req.query.start, req.query.end);
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
        const address= await mapplsService.getAddressFromCoordinates(req.query.lat, req.query.lon);
        res.status(200).json({
            success: true,
            data: address,
          });
    } catch (error) {
        next(error);
    }
}

const getAddressFromEloc = async(req, res, next)=>{
    try {
        const results= await mapplsService.getAddressFromEloc(req.query.eloc);
        res.status(200).json({
            success: true,
            data: results,
          });
    } catch (error) {
        next(error);
    }
}

module.exports={searchLocation, getOptimizedRoute, getAddressFromCoordinates, getAddressFromEloc};
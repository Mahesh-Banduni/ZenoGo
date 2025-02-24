const axios = require("axios");
const { getOlaMapsAuthToken } = require("./olamapsAuth.service");
const { NotFoundError } = require("../errors/errors");

const api_key=process.env.OLAMAPS_API_KEY;
const AUTOCOMPLETE_URL = "https://api.olamaps.io/places/v1/autocomplete";
const ROUTE_URL = "https://api.olamaps.io/routing/v1/distanceMatrix/basic";
const REVERSE_GEOCODE_URL = "https://api.olamaps.io/places/v1/reverse-geocode";
const GEOCODE_URL = "https://api.olamaps.io/places/v1/geocode";

const searchLocation = async (input) => {
    const token = await getOlaMapsAuthToken();
    const response = await axios.get(`${AUTOCOMPLETE_URL}?input=${input}&api_key=${api_key}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if(response.data.status=="ok"){
    const mappedLocations = response.data.predictions.map(({ description, geometry: { location } }) => ({
      address: description,
      lat: location.lat,
      lng: location.lng
    }));
    return mappedLocations;
  }
  return response.data;
};

 const getOptimizedRoute = async (start, end) => {
     const token = await getOlaMapsAuthToken();
    const response = await axios.get(
       `${ROUTE_URL}?origins=${start}&destinations=${end}`,
       { headers: { Authorization: `Bearer ${token}` } }
     );
     if(response.data.status=="SUCCESS"){
    const routeData = response.data.rows[0].elements.map(({ distance, duration, polyline }) => ({
      // distance_km: (distance / 1000).toFixed(2) + " km",
      // duration_min: Math.floor(duration / 60) + " min",
      distance: distance,
      duration: duration,
      polyline: polyline
    }));
     return routeData;
    }

     return response.data;
 };

const getAddressFromCoordinates = async (lat, lon) => {
    const token = await getOlaMapsAuthToken();
    const response = await axios.get(
      `${REVERSE_GEOCODE_URL}?latlng=${lat},${lon}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(response);
    if(response.data.status=="ok"){
    const mappedLocations = response.data.results.map(({ formatted_address, geometry: { location } }) => ({
      address: formatted_address,
      lat: location.lat,
      lng: location.lng
    }));
    return mappedLocations;
  }
  return response.data;
};

const getCoordinatesFromAddress = async (address) => {
    const token = await getOlaMapsAuthToken();
    const response = await axios.get(`${GEOCODE_URL}?address=${address}&language=English`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);
    if(response.data.status=="ok"){
    const mappedLocations = response.data.geocodingResults.map(({ formatted_address, geometry: { location } }) => ({
      address: formatted_address,
      lat: location.lat,
      lng: location.lng
    }));
    return mappedLocations;
  }
  return response.data;
};

module.exports = { searchLocation, getOptimizedRoute, getAddressFromCoordinates, getCoordinatesFromAddress};

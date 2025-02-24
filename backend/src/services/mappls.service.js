const axios = require("axios");
const { getMapplsAuthToken } = require("./mapplsAuth.service");
const { NotFoundError } = require("../errors/errors");

const rest_key=process.env.MAPPLS_REST_KEY;
const AUTOSUGGEST_URL = "https://atlas.mappls.com/api/places/search/json";
const ROUTE_URL = `https://apis.mappls.com/advancedmaps/v1/${rest_key}/distance_matrix_eta/driving`;
const REVERSE_GEOCODE_URL = `https://apis.mappls.com/advancedmaps/v1/${rest_key}/rev_geocode`;
const GEOCODE_URL = "https://atlas.mappls.com/api/places/geocode";;

const searchLocation = async (query) => {
    const token = await getMapplsAuthToken();
    const response = await axios.get(`${AUTOSUGGEST_URL}?query=${query}&location=&region=IND&tokenizeAddress=&pod=`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    //console.log(response);
    if(response.data.suggestedLocations.length<=0){
      throw new NotFoundError("No address found");
    }
    const mappedData = response.data.suggestedLocations.map(({ placeName, placeAddress, eLoc }) => ({
      address: `${placeName} - ${placeAddress}`,
      eloc: eLoc
    }));
    return mappedData;
};

 const getOptimizedRoute = async (start, end) => {
     const token = await getMapplsAuthToken();
    const response = await axios.get(
       `${ROUTE_URL}/${start};${end}?sources=0&rtype=0&destinations=1&region=IND`,
       { headers: { Authorization: `Bearer ${token}` } }
     );
     if(response.data.responseCode=="200"){
    //  const distance = (response.data.results.distances[0][0] / 1000).toFixed(2) + " km";
    //  const totalMinutes = Math.floor(response.data.results.durations[0][0] / 60);
    //  const hours = Math.floor(totalMinutes / 60);
    //  const minutes = totalMinutes % 60;
    //  const duration = `${hours} hr ${minutes} min`;
    const distance=response.data.results.distances[0][0];
    const duration=response.data.results.distances[0][0];
     return {distance, duration};
    }

    else if(response.data.responseCode=="404"){
      throw new NotFoundError("No Route found");
    }
     return response.data.results;
 };

const getAddressFromCoordinates = async (lat, lon) => {
    const token = await getMapplsAuthToken();
    const response = await axios.get(
      `${REVERSE_GEOCODE_URL}?lat=${lat}&lng=${lon}&region=IND&lang=hi`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data.results[0];
};

const getAddressFromEloc = async (eloc) => {
    const token = await getMapplsAuthToken();
    const response = await axios.get(`${GEOCODE_URL}?region=ind&eloc=${eloc}&itemCount=1&bias=0&bound=`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);
    if (response.data.copResults) {
      return response.data.copResults.formattedAddress; // Returns { latitude, longitude, formatted_address }
    }
    return null;
};

module.exports = { searchLocation, getOptimizedRoute, getAddressFromCoordinates, getAddressFromEloc};

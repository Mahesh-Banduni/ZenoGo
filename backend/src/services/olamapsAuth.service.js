const axios = require("axios");

const OLAMAPS_CLIENT_ID = process.env.OLAMAPS_CLIENT_ID;
const OLAMAPS_CLIENT_SECRET = process.env.OLAMAPS_CLIENT_SECRET;
const TOKEN_URL = "https://account.olamaps.io/realms/olamaps/protocol/openid-connect/token";

const getOlaMapsAuthToken = async () => {
  try {
    const response = await axios.post(
      TOKEN_URL,
      `grant_type=client_credentials&client_id=${OLAMAPS_CLIENT_ID}&client_secret=${OLAMAPS_CLIENT_SECRET}`,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );
    console.log(response.data.access_token);
    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching Mappls token:", error);
    throw new Error("Failed to get Mappls auth token");
  }
};

module.exports = { getOlaMapsAuthToken };

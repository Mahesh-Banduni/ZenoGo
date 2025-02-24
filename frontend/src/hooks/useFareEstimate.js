import axios from "axios";

const useFareEstimate = () => {
  const estimateFare = async (pickup, drop) => {
    try {
      const response = await axios.post("/api/fare-estimate", { pickup, drop });
      return response.data.fare;
    } catch (error) {
      console.error("Error fetching fare estimate:", error);
      return null;
    }
  };

  return { estimateFare };
};

export default useFareEstimate;

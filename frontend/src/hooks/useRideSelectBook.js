import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const useRideSelectRide = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    pickupAddress: "",
    pickupLat: "",
    pickupLng: "",
    dropOffAddress: "",
    dropOffLat: "",
    dropOffLng: "",
    day: "Today",
    timing: "",
    selectedRide: "Bike",
    fare: "",
    distance: "",
    duration: "",
    polyline: "",
  });

  const [locationResults, setLocationResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Select a ride option
  const handleSelectRide = (value) => {
    setFormData((prev) => ({ ...prev, selectedRide: value }));
  };

  // Handle input field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "pickupAddress" || name === "dropOffAddress") {
      debouncedSearchLocation(value);
      setShowDropdown(true);
    }
  };

  // Clear input field
  const clearInput = (field) => {
    setFormData((prev) => ({ ...prev, [field]: "" }));
    setLocationResults([]);
    setShowDropdown(false);
  };

  // Select a location from dropdown
  const handleSelectLocation = (field, address) => {
    setFormData((prev) => ({ ...prev, [field]: address }));
    setShowDropdown(false);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedFormData = await calculateFare(
        formData.pickupLat,
        formData.pickupLng,
        formData.dropOffLat,
        formData.dropOffLng,
        formData.selectedRide
      );

      console.log("Updated Form Data:", updatedFormData);

      navigate("/book-ride", { state: { rideData: updatedFormData } });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate fare and return updated data
  const calculateFare = async (pickupLat, pickupLng, dropOffLat, dropOffLng, vehicleType) => {
    try {
      const response = await axiosInstance.post("/rides/calculate-fare", {
        pickupLat,
        pickupLng,
        dropOffLat,
        dropOffLng,
        vehicleType,
      });

      if (response?.data?.success) {
        const { totalFare, distanceInKm, durationInHrMin, polyline } = response.data.data;

        return new Promise((resolve) => {
          setFormData((prev) => {
            const updatedData = {
              ...prev,
              fare: totalFare,
              distance: distanceInKm,
              duration: durationInHrMin,
              polyline: polyline,
            };
            resolve(updatedData);
            return updatedData;
          });
        });
      }
    } catch (error) {
      console.error("Error calculating fare:", error);
      return formData; // Return existing state if an error occurs
    }
  };

  // Fetch location search results
  const searchLocation = async (input) => {
    if (!input) return;
    try {
      const response = await axiosInstance.get(`olamaps/search-location?input=${input}`);
      if (response?.data?.success) {
        setLocationResults(response?.data?.data || []);
      }
    } catch (error) {
      console.error("Error searching location:", error);
    }
  };

  // Debounce function to optimize API calls
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedSearchLocation = useCallback(debounce(searchLocation, 500), [searchLocation]);

  return {
    formData,
    handleChange,
    handleSubmit,
    clearInput,
    handleSelectLocation,
    handleSelectRide,
    loading,
    locationResults,
    showDropdown,
    calculateFare,
  };
};

export default useRideSelectRide;

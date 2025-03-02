import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const useRide = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const initialFormData = {
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
  };

  const [formData, setFormData] = useState(initialFormData);
  const [locationResults, setLocationResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSelectRide = (value) => {
    setFormData((prev) => ({ ...prev, selectedRide: value }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "pickupAddress" || name === "dropOffAddress") {
      debouncedSearchLocation(value);
      setShowDropdown(true);
    }
  };

  const clearInput = (field) => {
    setFormData((prev) => ({ ...prev, [field]: "" }));
    setLocationResults([]);
    setShowDropdown(false);
  };

  const handleSelectLocation = (field, address) => {
    setFormData((prev) => ({ ...prev, [field]: address }));
    setShowDropdown(false);
  };

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

      navigate("/book-ride", { state: { rideData: updatedFormData } });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleHeroSection = async (e, rideData) => {
    e.preventDefault();
    setLoading(true);
  
    if (rideData) {
      setFormData((prev) => ({
        ...prev,
        ...rideData,
      }));
    }
  
    setLoading(false);
    
    navigate("/select-ride", { state: { rideData } });
  };
  
  

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
      return formData;
    }
  };

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

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedSearchLocation = useCallback(debounce(searchLocation, 500), [searchLocation]);

  // Clear all form values
  const clearAllValues = () => {
    setFormData(initialFormData);
  };

  // Check if values match initial state, then navigate to select-ride page
  const checkAndNavigate = ({rideData}) => {
    const isSameAsInitial = JSON.stringify({rideData}) === JSON.stringify(initialFormData);
    if (isSameAsInitial) {
      navigate("/select-ride");
    }
  };

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
    clearAllValues,
    checkAndNavigate,
    handleHeroSection,
    setFormData
  };
};

export default useRide;

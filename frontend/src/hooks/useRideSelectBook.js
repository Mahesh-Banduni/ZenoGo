import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const useRideSelectRide = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    pickup: "",
    dropoff: "",
    day: "Today",
    timing: "",
    selectedRide: "",
    fare: "",
    distance: ""
  });

  const [locationResults, setLocationResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [showDropdown, setShowDropdown] = useState(false);

  // Select a ride option
  const handleSelectRide = (rideType) => {
    setFormData((prev) => ({ ...prev, selectedRide: rideType }));
  };

  // Handle input field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "pickup" || name === "dropoff") {
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
  const handleSubmit = (e) => {
    e.preventDefault();
  
    setLoading(true);
    
    setTimeout(() => { // Ensure state update before navigation
      navigate("/book-ride", { state: { rideData: formData } });
      console.log("Submitting Form:", formData);
      setLoading(false);
    }, 100);
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

  const debouncedSearchLocation = useCallback(debounce(searchLocation, 500), []);

  return {
    formData,
    handleChange,
    handleSubmit,
    clearInput,
    handleSelectLocation,
    handleSelectRide,
    loading,
    status,
    locationResults,
    showDropdown
  };
};

export default useRideSelectRide;

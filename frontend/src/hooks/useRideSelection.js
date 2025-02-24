import React from 'react';
import { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom'; // Added missing import
import { TimerIcon } from 'lucide-react';

const useRideSelection = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    pickup: '',
    dropoff: '',
    timing: '',
  });
  
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Clears input field
  const clearInput = (field) => {
    setFormData({ ...formData, [field]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });
    

    try {
      const response = await axiosInstance.post('auth/login', formData); // Changed userData to formData
      
      if (response?.data?.success === true) {
        localStorage.setItem(
          "token",
          JSON.stringify(response?.data?.data?.response)
        );
        
        setStatus({
          type: 'success',
          message: response.data.message || 'Login successful!'
        });
        
        // Reset form
        setFormData({
          pickup: '',
          dropoff: '',
          timing: '',
        });
        
        navigate("/");
      } 
    } catch (error) {
      setStatus({
        type: 'error', // Changed from success to error
        message: error?.response?.data?.message || 'Login failed. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    clearInput,
    loading,
    status // Added status to return object
  };
};

export default useRideSelection;
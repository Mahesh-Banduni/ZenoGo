import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

const useSignUp = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: ''
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

  const validateForm = () => {
    const errors = [];
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.push('Please enter a valid email address');
    }

    // Name validation
    if (formData.name.trim().length < 6) {
      errors.push('Name must be at least 6 characters long');
    }

    // Password validation
    if (formData.password.trim().length < 8) {
      errors.push('Password must be at least 8 characters long');
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    // Assign role before submission
    const updatedFormData = { ...formData, role: "passenger" };

    // Validate form
    const errors = validateForm();
    if (errors.length > 0) {
      setStatus({
        type: 'error',
        message: errors.join('. ')
      });
      setLoading(false);
      return;
    }

    try {
      console.log(updatedFormData);
      const response = await axiosInstance.post('users/signup', updatedFormData);
      
      if (response?.data?.success) {
        localStorage.setItem(
          "token",
          JSON.stringify(response?.data?.data?.response)
        );
        
        setStatus({
          type: 'success',
          message: response.data.message || 'Signed-up successfully!'
        });

        // Reset form
        setFormData({
          name: '',
          email: '',
          password: '',
          role: ''
        });

        navigate("/");
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: error?.response?.data?.message || 'Sign-up failed. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitRidePartner = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    // Assign role before submission
    const updatedFormData = { ...formData, role: "driver" };

    // Validate form
    const errors = validateForm();
    if (errors.length > 0) {
      setStatus({
        type: 'error',
        message: errors.join('. ')
      });
      setLoading(false);
      return;
    }

    try {
      console.log(updatedFormData);
      const response = await axiosInstance.post('users/signup', updatedFormData);
      
      if (response?.data?.success) {
        localStorage.setItem(
          "token",
          JSON.stringify(response?.data?.data?.response)
        );

        setStatus({
          type: 'success',
          message: response.data.message || 'Signed-up successfully!'
        });

        // Reset form
        setFormData({
          name: '',
          email: '',
          password: '',
          role: ''
        });

        navigate("/");
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: error?.response?.data?.message || 'Sign-up failed. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    handleSubmitRidePartner,
    loading,
    status
  };
};

export default useSignUp;

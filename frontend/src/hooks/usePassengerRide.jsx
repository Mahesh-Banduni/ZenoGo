import axiosInstance from "../utils/axiosInstance";
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { setRideDetails, setError, setLoading } from '../store/rideSlice';

export const usePassengerRide = () => {
    const token = localStorage.getItem("token");
    const dispatch = useDispatch();
  
    const fetchRides = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axiosInstance.get(`/rides/user`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        dispatch(setRideDetails(response.data));
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setError(error.response?.data || 'Error fetching cart'));
        dispatch(setLoading(false));
        throw error;
      }
    };

    const fetchAllRides = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axiosInstance.get(`/rides/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        dispatch(setRideDetails(response.data));
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setError(error.response?.data || 'Error fetching cart'));
        dispatch(setLoading(false));
        throw error;
      }
    };
  
    const createBuyNowRide = async (addressId, productId, quantity,size) => {
      dispatch(setLoading(true));
      try {
        const response = await axiosInstance.post(
          `/rides/buy-now`, 
          { addressId, productId, quantity, size}, 
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        dispatch(setRideDetails(response.data));
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setError(error.response?.data || 'Error adding item'));
        dispatch(setLoading(false));
        throw error;
      }
    };

    const createCartRide = async (addressId) => {
        dispatch(setLoading(true));
        try {
          const response = await axiosInstance.post(
            `/rides/cart`, 
            { addressId}, 
            { headers: { Authorization: `Bearer ${token}` } }
          );
          
          dispatch(setRideDetails(response.data));
          dispatch(setLoading(false));
        } catch (error) {
          dispatch(setError(error.response?.data || 'Error adding item'));
          dispatch(setLoading(false));
          throw error;
        }
      };

    const updateRide = async (rideId, rideStatus) => {
        dispatch(setLoading(true));
        try {
          const response = await axiosInstance.put(
            `/rides/${rideId}/update`, 
            { rideStatus}, 
            { headers: { Authorization: `Bearer ${token}` } }
          );
          
          dispatch(setRideDetails(response.data));
          dispatch(setLoading(false));
        } catch (error) {
          dispatch(setError(error.response?.data || 'Error adding item'));
          dispatch(setLoading(false));
          throw error;
        }
      };

  
    return {
      fetchRides,
      createBuyNowRide,
      createCartRide,
      updateRide,
      fetchAllRides
    };
  };
  
  export default usePassengerRide;
import axiosInstance from "../utils/axiosInstance";
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { setProfileData, setError, setLoading } from '../store/profileSlice';

export const useProfile = () => {
    const [status, setStatus] = useState({type:'',message: '' });
    const token = localStorage.getItem("token");
    const dispatch = useDispatch();
    const profile = useSelector(state => state.profile);
    
  
    const fetchProfile = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axiosInstance.get(`/users/details`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        dispatch(setProfileData(response.data));
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setError(error.response?.data || 'Error fetching cart'));
        dispatch(setLoading(false));
        throw error;
      }
    };

    const checkRole = async () => {
      try {
        const response = await axiosInstance.get(`/users/details`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        return response.data.data.role;
      } catch (error) {
        throw error;
      }
    };
  
    const updateProfile = async (name,phone) => {

        const validateForm = () => {
            const errors = [];
            
            // Name validation
            if (name?.trim().length < 6) {  // Changed from fullName to name
                name='';
              errors.push('Name must be at least 6 characters long');
            }
    
            // Phone validation
           if (phone?.trim().length < 7 || phone?.trim().length > 11 ) {
            phone='';
            errors.push('Enter a valid phone number');
            }
        
            return errors;
          };

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
     
      dispatch(setLoading(true));
      try {
        const response = await axiosInstance.put(
          `/users/update`, 
          { name, phone}, 
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        dispatch(setProfileData(response.data));
        setStatus({type:"success",
            message: response.data.message || 'Profile Updated Successfully!'
          });
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setError(error.response?.data || 'Error adding item'));
        setStatus({type:'error',
            message: response.data.message || 'Error updating details. Please try again!'
          });
        dispatch(setLoading(false));
        throw error;
      }
    };
  
    return {
      status,
      profile,
      checkRole,
      setStatus,
      fetchProfile,
      updateProfile
    };
  };
  
  export default useProfile;
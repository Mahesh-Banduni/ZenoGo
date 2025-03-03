import { useEffect, useState } from 'react';

import OlaMap from '../components/OlaMap';
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import MobileRideBook from '../components/RideBook/MobileRideBook';
import RideDetails from '../components/RideBook/RideDetails';

const BookRide = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const token = localStorage.getItem("token"); 

  useEffect(() => {
    if(!token){
      navigate("/login");
    }

    // Check if screen is mobile on mount
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Set up listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const location = useLocation();
  const { rideData } = location.state || { rideData: null };

  // Render mobile or desktop layout based on screen size
  return isMobile ? (
    <>
    <MobileRideBook rideData={rideData} />
    <ToastContainer />
    </>
  ) : (
    <div className="min-h-screen bg-gray-50 p-4 flex">
      <RideDetails rideData={rideData} />
      <OlaMap rideData={rideData}/>
      <ToastContainer />
    </div>
  );
};

export default BookRide;

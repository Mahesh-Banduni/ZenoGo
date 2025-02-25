import { useEffect, useState } from 'react';
import MobileRideSelection from '../components/RideBook/MobileRideSelection';
import RideDetails from '../components/RideBook/RideDetails';
import OlaMap from '../components/OlaMap';
import { useNavigate, useLocation } from "react-router-dom";

const BookRide = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
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
    <MobileRideSelection rideData={rideData} />
  ) : (
    <div className="min-h-screen bg-gray-50 p-4 flex">
      <RideDetails rideData={rideData} />
      <OlaMap />
    </div>
  );
};

export default BookRide;
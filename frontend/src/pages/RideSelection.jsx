import { useEffect, useState } from 'react';
import MobileRideSelection from '../components/RideSelection/MobileRideSelection';
import FillRideDetails from '../components/RideSelection/FillRideDetails';
import OlaMap from '../components/OlaMap';

const RideSelection = () => {
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

  // Render mobile or desktop layout based on screen size
  return isMobile ? (
    <MobileRideSelection />
  ) : (
    <div className="min-h-screen bg-gray-50 p-4 flex">
      <FillRideDetails />
      <OlaMap />
    </div>
    
  );
};

export default RideSelection;
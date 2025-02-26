import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BadgeIndianRupee, WalletCards, Wallet, MapPin, Locate, Clock10, ChevronUp, ChevronDown, Calendar1, Navigation, Cross } from 'lucide-react';
import OlaMap from '../OlaMap';
import RideOptions from './RideOptions';
import useRideSelectBook from '../../hooks/useRideSelectBook';

const MobileRideSelection = (rideData) => {
  console.log(rideData.rideData);
  const navigate = useNavigate();
  const [paymentMode, setPaymentMode] = useState("Cash");
  const { formData, handleChange, handleSubmit, loading, status, clearInput } = useRideSelectBook();
  const [day, setDay] = useState("Today"); // Default to Today
  
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Map takes full screen in the background */}
      <div className="absolute inset-0 w-full h-full">
        <OlaMap />
      </div>

      {/* Bottom sheet UI */}
      <div className="absolute bottom-0 left-0 right-0 pb-10 mb-5">
        <div className="bg-white rounded-t-xl shadow-lg">
          {/* Drag handle */}
          <div 
            className="flex justify-center py-2 cursor-pointer gap-2" 
            onClick={toggleExpanded}
          >
            <center>
        <h1 className='text-xl text-gray-800 font-bold mb-2 mt-2'>Ride Details</h1>
        </center>
            {isExpanded ? 
              <ChevronDown className="text-gray-500 mb-2 mt-2" size={24} /> : 
              <ChevronUp className="text-gray-500 mb-2 mt-2" size={24} />
            }
            
          </div>
          
          {/* Basic info always visible */}
          <div className="px-4 pb-2">
            {/* Pickup location */}
            <div className="mb-4 mt-2 relative flex items-center">   
             <MapPin className="absolute left-3 text-black " size={20} />
              <input
                type="text"
                name="pickup"
                value={rideData.rideData.pickup}
                disabled={true}
                className="w-full p-2 pl-10 pr-8 bg-neutral-200 border border-gray-300 rounded-lg focus:bg-gray-100 focus:border-transparent"
                placeholder="Pickup Location..."
                required
              />
            </div>

            {/* Dropoff location */}
            <div className="mb-4 relative flex items-center">   
            <Navigation className="absolute left-3 text-black fill-gray-800" size={20} />
              <input
                type="text"
                name="dropoff"
                value={rideData.rideData.dropoff}
                disabled={true}
                className="w-full p-2 pl-10 pr-8 bg-neutral-200 border border-gray-300 rounded-lg focus:bg-gray-100 focus:border-transparent"
                placeholder="Dropoff Location..."
                required
              />
            </div>
          </div>

          {/* Expandable section */}
          {isExpanded && (
            <div className="px-4 pb-4 space-y-4 text-sm animate-slideUp">
              {/* Timing selection */}
              <div className="space-y-2 flex flex-row justify-items-start gap-2">
      {/* Day Selection Dropdown */}
      <div className="relative items-center">
      <Calendar1 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" size={20} />
        <input
          value={rideData.rideData.day}
          disabled={true}
          className="w-full p-2 pl-10 mr-7 bg-neutral-100 border border-gray-200 rounded-lg transition duration-200 ease-in-out text-gray-700 cursor-pointer appearance-none"
        >
        </input>
      </div>

      {/* Timing Selection Dropdown */}
      <div className="relative items-center">
      <Clock10 className="absolute left-3 top-2/5 transform -translate-y-1/2 text-black" size={20} />
        <input
          name="timing"
          value={rideData.rideData.timing}
          disabled={true}
          required
          className="w-full p-2 pl-10 mr-5 bg-neutral-100 border border-gray-200 rounded-lg transition duration-200 ease-in-out text-gray-700 cursor-pointer appearance-none"
        >
        </input>
      </div>
    </div>

    <div className="mb-4 mt-2 relative flex items-center gap-2">   
          <Wallet className="absolute left-3 fill-amber-500 text-black" size={22} />
          <p className="absolute pl-11 text-black">Fare</p>
              <input
                type="text"
                name="pickup"
                // value={rideData.rideData.fare}
                value="₹1234"
                disabled={true}
                className="w-full p-2 pl-20 pr-8 bg-neutral-100 border border-gray-400 font-bold text-black rounded-lg focus:bg-gray-100 focus:border-transparent"
                placeholder="Pickup Location..."
                required
              />
            </div>

            <div className="relative flex items-center">
  <BadgeIndianRupee className="absolute left-2.5 top-1/2 transform fill-emerald-500 -translate-y-1/2 text-white" size={28} />
  
  <select
    value={paymentMode} // Ensure it reflects the selected option
    onChange={(e) => setPaymentMode(e.target.value)} // Fix function to set state
    className="w-full p-2 pl-13 pr-8 bg-neutral-100 border border-gray-200 font-semibold rounded-lg transition duration-200 ease-in-out text-gray-700 cursor-pointer appearance-none"
  >
    <option value="Cash">Pay By Cash</option>
    <option value="Digital Payment">Digital Payment</option>
  </select>
  
  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-800">
    ▼
  </span>
</div>

<p className="text-sm mb-3 font-medium">Selected Ride:</p>
          <RideOptions
            selectedOption={rideData.rideData.selectedRide}
          />
            </div>
          )}

          {/* Book ride button - always visible */}
          <div className="px-4 pb-6 pt-2">
            <button
              className="w-full py-3 bg-gray-700 text-white rounded-lg font-bold"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Processing..." : "Continue Booking"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileRideSelection;
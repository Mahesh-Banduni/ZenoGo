import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MapPin, Locate, Clock10, ChevronUp, ChevronDown, Calendar1, Navigation, Cross } from 'lucide-react';
import OlaMap from '../OlaMap';
import RideOptions from './RideOptions';
import useRide from '../../hooks/useRide';

const MobileRideSelection = ({}) => {
  const location=useLocation();
  const navigate = useNavigate();
  const { 
    formData, handleChange, handleSubmit, clearInput, loading, locationResults, handleSelectRide,
    showDropdown, handleSelectLocation, setFormData
  } = useRide();
  const [day, setDay] = useState("Today");
  const [dropdownType, setDropdownType] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const rideData = location.state?.rideData || {}; // Extract rideData from navigation
  
    useEffect(() => {
      if (Object.keys(rideData).length > 0) {
        setFormData((prev) => ({
          ...prev,
          ...rideData,
        }));
      }
    }, [rideData, setFormData]);

  // Function to generate valid timing options
  const generateTimings = () => {
    const currentHour = new Date().getHours();
    return Array.from({ length: 24 }, (_, i) => {
      const hour = i % 12 === 0 ? 12 : i % 12;
      const period = i < 12 ? "AM" : "PM";
      
      if (day === "Today" && i <= currentHour) return null; // Exclude past hours

      return (
        <option key={i} value={`${hour}:00 ${period}`} className="bg-gray-50 focus:bg-gray-100 hover:border-gray-400">
          {hour}:00 {period}
        </option>
      );
    }).filter(Boolean);
  };

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Fullscreen Map */}
      <div className="absolute inset-0 w-full h-full">
       <OlaMap rideData={Object.keys(rideData).length > 0 ? rideData : {}} />
     </div>


      {/* Bottom Sheet UI */}
      <div className="absolute bottom-0 left-0 right-0 pb-10 mb-16 mt-20">
        <form className="bg-white rounded-t-xl shadow-lg" onSubmit={handleSubmit}>
          {/* Drag handle */}
          <div className="flex justify-center py-2 cursor-pointer gap-2" onClick={toggleExpanded}>
          <center>
        <h1 className='text-sm text-gray-800 font-bold mb-1.5 mt-1.5'>Add Ride Details</h1>
        </center>
            {isExpanded ? 
              <ChevronDown className="text-gray-500 mb-1.5 mt-1.5" size={24} /> : 
              <ChevronUp className="text-gray-500 mb-1.5 mt-1.5" size={24} />
            }
          </div>

          {/* Pickup Location */}
          <div className="px-4 pb-2">
            <div className="mb-3 relative">
              <div className="flex items-center">
                <MapPin className="absolute left-3 top-3 text-black" size={20} />
                <input
                  type="text"
                  name="pickupAddress"
                  value={formData.pickupAddress}
                  onChange={(e) => { handleChange(e); setDropdownType('pickup'); }}
                  onClick={()=>setIsExpanded(true)}
                  className="w-full p-2 pl-10 pr-8 text-sm rounded-lg bg-gray-100 border border-gray-300"
                  placeholder="Pickup Location..."
                  required
                />
                {!formData.pickupAddress && <Locate className="absolute right-3 top-3 text-black" size={20} />}
                {formData.pickupAddress && <Cross className="absolute right-3 cursor-pointer rotate-45 bg-gray-800 rounded-full fill-white" size={16} onClick={() => clearInput("pickupAddress")} />}
              </div>
              {showDropdown && dropdownType === 'pickup' && locationResults.length > 0 && (
                <ul className="absolute w-full bg-white border rounded-lg shadow-lg mt-1 z-50 max-h-60 overflow-y-auto  text-sm">
                  {locationResults.map((location, index) => (
                    <li key={index} className="p-2 hover:bg-gray-100 cursor-pointer text-sm" 
                    onClick={() => {
                      handleSelectLocation('pickupAddress', location.address);
                      handleSelectLocation('pickupLat', location.lat);
                      handleSelectLocation('pickupLng', location.lng);
                  }}
                  >
                    {location.address}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Dropoff Location */}
            <div className="mb-1 relative">
              <div className="flex items-center">
                <Navigation className="absolute left-3 top-3 text-black fill-black" size={20} />
                <input
                  type="text"
                  name="dropOffAddress"
                  value={formData.dropOffAddress}
                  onChange={(e) => { handleChange(e); setDropdownType('dropoff'); }}
                  onClick={()=>setIsExpanded(true)}
                  className="w-full p-2 pl-10 rounded-lg text-sm pr-8 bg-gray-100 border border-gray-300"
                  placeholder="Dropoff Location..."
                  required
                />
                {formData.dropOffAddress && <Cross className="absolute right-3 cursor-pointer rotate-45 bg-gray-800 rounded-full fill-white" size={16} onClick={() => clearInput("dropOffAddress")} />}
              </div>
              {showDropdown && dropdownType === 'dropoff' && locationResults.length > 0 && (
                <ul className="absolute w-full bg-white border rounded-lg shadow-lg mt-1 z-50">
                  {locationResults.map((location, index) => (
                    <li key={index} className="p-2 hover:bg-gray-100 cursor-pointer text-sm" 
                    onClick={() => {
                      handleSelectLocation('dropOffAddress', location.address);
                       handleSelectLocation('dropOffLat', location.lat);
                        handleSelectLocation('dropOffLng', location.lng)
                      }}
                      >
                      {location.address}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Expandable Section */}
          {isExpanded && (
            <div className="px-4 pb-4 space-y-4 animate-slideUp">
              {/* Date & Time Selection */}
              <div className="flex gap-2">
                {/* Day Selection */}
                <div className="relative">
                  <Calendar1 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" size={20} />
                  <select
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    className="w-full p-2 pl-10 mr-5 text-sm border border-gray-200 rounded-lg cursor-pointer appearance-none bg-neutral-100"
                    required
                  >
                    <option value="Today">Today</option>
                    <option value="Tomorrow">Tomorrow</option>
                  </select>
                  <span className="absolute right-2 top-2/4 transform -translate-y-1/2 pointer-events-none text-gray-800">▼</span>
                </div>

                {/* Time Selection */}
                <div className="relative items-center">
                  <Clock10 className="absolute left-3 text-sm top-1/2 transform -translate-y-1/2 text-black" size={20} />
                  <select
                    name="timing"
                    value={formData.timing}
                    onChange={handleChange}
                    className="w-full p-2 pl-10 mr-5 text-sm border border-gray-200 rounded-lg cursor-pointer appearance-none bg-neutral-100"
                    required
                  >
                    <option value="" disabled>Select Time...</option>
                    {generateTimings()}
                  </select>
                  <span className="absolute right-2 top-2/4 transform -translate-y-1/2 pointer-events-none text-gray-800">▼</span>
                </div>
              </div>

              {/* Ride Options */}
              <div>
               <p className="text-sm mb-3 mt-2 font-medium">Available Rides:</p>
               <RideOptions onSelect={handleSelectRide} value={formData.selectedRide} required />
              </div>
            </div>
          )}

          {/* Book Ride Button */}
          <div className="px-4 pb-4 pt-1">
            {/* Submit Button */}
            <button className="w-full py-3 bg-black text-white rounded-lg font-bold hover:bg-gray-800 transition duration-200" type="submit" disabled={loading}>
          {loading ? "Processing..." : "Continue Booking"}
        </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MobileRideSelection;

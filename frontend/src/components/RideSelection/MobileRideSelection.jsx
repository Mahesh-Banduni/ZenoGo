import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Locate, Clock10, ChevronUp, ChevronDown, Calendar1, Navigation, Cross } from 'lucide-react';
import OlaMap from '../OlaMap';
import RideOptions from './RideOptions';
import useRideSelectBook from '../../hooks/useRideSelectBook';

const MobileRideSelection = () => {
  const navigate = useNavigate();
  const { 
    formData, handleChange, handleSubmit, clearInput, loading, locationResults, handleSelectRide,
    showDropdown, handleSelectLocation 
  } = useRideSelectBook();
  const [day, setDay] = useState("Today");
  const [dropdownType, setDropdownType] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

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
        <OlaMap />
      </div>

      {/* Bottom Sheet UI */}
      <div className="absolute bottom-0 left-0 right-0 pb-10 mb-5">
        <form className="bg-white rounded-t-xl shadow-lg " onSubmit={handleSubmit}>
          {/* Drag handle */}
          <div className="flex justify-center py-2 cursor-pointer" onClick={toggleExpanded}>
            {isExpanded ? <ChevronDown className="text-gray-500" size={24} /> : <ChevronUp className="text-gray-500" size={24} />}
          </div>

          {/* Pickup Location */}
          <div className="px-4 pb-2">
            <div className="mb-4 relative">
              <div className="flex items-center">
                <MapPin className="absolute left-3 top-3 text-black" size={20} />
                <input
                  type="text"
                  name="pickup"
                  value={formData.pickup}
                  onChange={(e) => { handleChange(e); setDropdownType('pickup'); }}
                  onClick={toggleExpanded}
                  className="w-full p-2 pl-10 pr-8 border-2 rounded-lg bg-gray-50"
                  placeholder="Pickup Location..."
                  required
                />
                {!formData.pickup && <Locate className="absolute right-3 top-3 text-black" size={20} />}
                {formData.pickup && <Cross className="absolute right-3 cursor-pointer rotate-45 bg-gray-800 rounded-full fill-white" size={16} onClick={() => clearInput("pickup")} />}
              </div>
              {showDropdown && dropdownType === 'pickup' && locationResults.length > 0 && (
                <ul className="absolute w-full bg-white border rounded-lg shadow-lg mt-1 z-50 max-h-60 overflow-y-auto">
                  {locationResults.map((location, index) => (
                    <li key={index} className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleSelectLocation('pickup', location.address)}>
                      {location.address}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Dropoff Location */}
            <div className="mb-2 relative">
              <div className="flex items-center">
                <Navigation className="absolute left-3 top-3 text-black fill-black" size={20} />
                <input
                  type="text"
                  name="dropoff"
                  value={formData.dropoff}
                  onChange={(e) => { handleChange(e); setDropdownType('dropoff'); }}
                  className="w-full p-2 pl-10 border-2 rounded-lg pr-8 bg-gray-50"
                  placeholder="Dropoff Location..."
                  required
                />
                {formData.dropoff && <Cross className="absolute right-3 cursor-pointer rotate-45 bg-gray-800 rounded-full fill-white" size={16} onClick={() => clearInput("dropoff")} />}
              </div>
              {showDropdown && dropdownType === 'dropoff' && locationResults.length > 0 && (
                <ul className="absolute w-full bg-white border rounded-lg shadow-lg mt-1 z-50">
                  {locationResults.map((location, index) => (
                    <li key={index} className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleSelectLocation('dropoff', location.address)}>
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
                    className="w-full p-2 pl-10 border-2 border-gray-500 rounded-lg cursor-pointer appearance-none bg-gray-50"
                    required
                  >
                    <option value="Today">Today</option>
                    <option value="Tomorrow">Tomorrow</option>
                  </select>
                </div>

                {/* Time Selection */}
                <div className="relative">
                  <Clock10 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" size={20} />
                  <select
                    name="timing"
                    value={formData.timing}
                    onChange={handleChange}
                    className="w-full p-2 pl-10 border-2 border-gray-500 rounded-lg cursor-pointer appearance-none bg-gray-50"
                    required
                  >
                    <option value="" disabled>Select Time...</option>
                    {generateTimings()}
                  </select>
                </div>
              </div>

              {/* Ride Options */}
              <p className="text-sm mb-3 mt-2 font-medium">Available Rides:</p>
              <RideOptions onSelect={handleSelectRide} selectedOption={formData.selectedRide} />
            </div>
          )}

          {/* Book Ride Button */}
          <div className="px-4 pb-6 pt-2">
            {/* Submit Button */}
            <button className="w-full py-3 mt-4 bg-gray-700 text-white rounded-lg font-bold" type="submit" disabled={loading}>
          {loading ? "Processing..." : "Continue Booking"}
        </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MobileRideSelection;

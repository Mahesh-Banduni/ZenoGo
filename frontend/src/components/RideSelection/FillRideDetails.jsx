import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RideOptions from './RideOptions';
import useRideSelectBook from '../../hooks/useRideSelectBook';
import { MapPin, Navigation, Cross, Calendar1, Clock10, Locate } from 'lucide-react';

const FillRideDetails = () => {
  const navigate = useNavigate();
  const { 
    formData, handleChange, handleSubmit, clearInput, loading, locationResults, handleSelectRide,
    showDropdown, handleSelectLocation 
  } = useRideSelectBook();
  const [dropdownType, setDropdownType] = useState(null);

  const generateTimings = () => {
    const currentHour = new Date().getHours();
    return Array.from({ length: 24 }, (_, i) => {
      if (formData.day === "Today" && i <= currentHour) return null;
      const hour = i % 12 === 0 ? 12 : i % 12;
      const period = i < 12 ? "AM" : "PM";
      return (
        <option key={i} value={`${hour} ${period}`} className="bg-gray-50 focus:bg-gray-100">
          {hour}:00 {period}
        </option>
      );
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <form className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg relative" onSubmit={handleSubmit}>
        <center><h1 className='text-xl font-bold mb-6'>Add Ride Details</h1></center>
        
        {/* Pickup Input */}
        <div className="mb-4 relative">
          <div className='flex items-center'>
            <MapPin className="absolute left-3 top-3 text-black" size={20} />
            <input
              type="text"
              name="pickup"
              value={formData.pickup}
              onChange={(e) => { handleChange(e); setDropdownType('pickup'); }}
              className="w-full p-2 pl-10 pr-8 border-2 rounded-lg bg-gray-50"
              placeholder="Pickup Location..."
              required
            />

            {/* Show Locate icon when input is empty */}
            {formData.pickup === "" && (
              <Locate className="absolute right-3 top-3 text-black" size={20} />
            )}

            {/* Show Cross icon when input has text */}
            {formData.pickup && (
              <Cross 
                className="absolute right-3 cursor-pointer rotate-45 bg-gray-800 rounded-full fill-white" 
                size={16} 
                onClick={() => clearInput("pickup")} 
              />
            )}
            </div>

            {/* Dropdown for location suggestions */}
            {showDropdown && dropdownType === 'pickup' && locationResults.length > 0 && (
              <ul className="absolute w-full bg-white border rounded-lg shadow-lg mt-1 z-50 max-h-60 overflow-y-auto">
                {locationResults.map((location, index) => (
                  <li 
                    key={index} 
                    className="p-2 hover:bg-gray-100 cursor-pointer" 
                    onClick={() => handleSelectLocation('pickup', location.address)}
                  >
                    {location.address}
                  </li>
                ))}
              </ul>
            )}
          </div>


        {/* Dropoff Input */}
        <div className="mb-4 relative">
          <div className='flex items-center'>
          <Navigation className="absolute left-3 top-3 text-black fill-black" size={20} />
          <input
            type="text"
            name="dropoff"
            value={formData.dropoff}
            onChange={(e) => { handleChange(e); setDropdownType('dropoff'); }}
            className="w-full p-2 pl-10 border-2 rounded-lg bg-gray-50 pr-8"
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

        <div>
        <div className="space-y-2 flex flex-row justify-items-start gap-2">
        <div className="relative items-center">
        <Calendar1 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" size={20} />
        <select
          name="day"
          value={formData.day}
          onChange={handleChange}
          className="w-full p-2 pl-10 mr-7 bg-gray-50 border-2 border-gray-500 rounded-lg transition duration-200 ease-in-out text-gray-700 cursor-pointer appearance-none"
        >
          <option value="Today">Today</option>
          <option value="Tomorrow">Tomorrow</option>
        </select>
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-800">▼</span>
      </div>

      {/* Timing Selection Dropdown */}
      <div className="relative items-center">
        <Clock10 className="absolute left-3 top-2/5 transform -translate-y-1/2 text-black" size={20} />
        <select
          name="timing"
          value={formData.timing}
          onChange={handleChange}
          required
          className="w-full p-2 pl-10 mr-5 bg-gray-50 border-2 border-gray-500 rounded-lg transition duration-200 ease-in-out text-gray-700 cursor-pointer appearance-none"
        >
          <option value="" disabled className="text-gray-400 bg-gray-50 text-wrap">
            Select Time...
          </option>
          {generateTimings()}
        </select>
        <span className="absolute right-3 top-2/5 transform -translate-y-1/2 pointer-events-none text-gray-800">▼</span>
      </div>
      
    </div>

        {/* Ride Options */}
        <p className="text-sm mb-3 mt-2 font-medium">Available Rides:</p>
        <RideOptions onSelect={handleSelectRide} selectedOption={formData.selectedRide} />
        </div>

        {/* Submit Button */}
        <button className="w-full py-3 mt-4 bg-gray-700 text-white rounded-lg font-bold" type="submit" disabled={loading}>
          {loading ? "Processing..." : "Continue Booking"}
        </button>
        
      </form>
    </div>
  );
};

export default FillRideDetails;

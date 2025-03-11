import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useRide from '../../hooks/useRide';
import RideOptions from './RideOptions';
import { MapPin, Navigation, X, Calendar, Clock, Locate } from 'lucide-react';

const FillRideDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    formData, handleChange, handleSubmit, clearInput, loading, locationResults, handleSelectRide,
    showDropdown, handleSelectLocation , setFormData
  } = useRide();

  const [dropdownType, setDropdownType] = useState(null);
  const rideData = location.state?.rideData || {}; // Extract rideData from navigation

  useEffect(() => {
    if (Object.keys(rideData).length > 0) {
      setFormData((prev) => ({
        ...prev,
        ...rideData,
      }));
    }
  }, [rideData, setFormData]);

  const generateTimings = () => {
    const currentHour = new Date().getHours();
    return Array.from({ length: 24 }, (_, i) => {
      if (formData.day === "Today" && i <= currentHour) return null;
      const hour = i % 12 === 0 ? 12 : i % 12;
      const period = i < 12 ? "AM" : "PM";
      return (
        <option key={i} value={`${hour}:00 ${period}`} className="bg-white text-gray-700">
          {hour}:00 {period}
        </option>
      );
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <form className="bg-white shadow-xl rounded-xl p-6 space-y-6" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-semibold text-center text-gray-900">Add Ride Details</h1>
        
        {/* Pickup Input */}
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600" size={20} />
          <input
            type="text"
            name="pickupAddress"
            value={formData.pickupAddress}
            onChange={(e) => { handleChange(e); setDropdownType('pickup'); }}
            className="w-full py-3 pl-12 pr-10 rounded-lg bg-gray-100 border border-gray-300"
            placeholder="Pickup Location..."
            required
          />
          {formData.pickupAddress && (
            <X className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500" size={18} onClick={() => clearInput("pickupAddress")} />
          )}
          {showDropdown && dropdownType === 'pickup' && locationResults.length > 0 && (
            <ul className="absolute w-full bg-white border rounded-lg shadow-md mt-2 max-h-60 overflow-y-auto z-50">
              {locationResults.map((location, index) => (
                <li key={index} className="p-3 hover:bg-gray-100 cursor-pointer" 
                    onClick={() => {handleSelectLocation('pickupAddress', location.address);
                      handleSelectLocation('pickupLat', location.lat);
                      handleSelectLocation('pickupLng', location.lng);
                    }}>
                  {location.address}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Dropoff Input */}
        <div className="relative">
          <Navigation className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 fill-black" size={20} />
          <input
            type="text"
            name="dropOffAddress"
            value={formData.dropOffAddress}
            onChange={(e) => { handleChange(e); setDropdownType('dropoff'); }}
            className="w-full py-3 pl-12 pr-10 rounded-lg bg-gray-100 border border-gray-300"
            placeholder="Dropoff Location..."
            required
          />
          {formData.dropOffAddress && (
            <X className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500" size={18} onClick={() => clearInput("dropOffAddress")} />
          )}
          {showDropdown && dropdownType === 'dropoff' && locationResults.length > 0 && (
            <ul className="absolute w-full bg-white border rounded-lg shadow-md mt-2 max-h-60 overflow-y-auto z-50">
              {locationResults.map((location, index) => (
                <li key={index} className="p-3 hover:bg-gray-100 cursor-pointer" 
                    onClick={() => {handleSelectLocation('dropOffAddress', location.address);
                      handleSelectLocation('dropOffLat', location.lat);
                      handleSelectLocation('dropOffLng', location.lng);
                    }}>
                  {location.address}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600" size={20} />
            <select
              name="day"
              value={formData.day}
              onChange={handleChange}
              className="w-full py-3 pl-12 pr-4 bg-gray-100 border border-gray-300 rounded-lg cursor-pointer"
            >
              <option value="Today">Today</option>
              <option value="Tomorrow">Tomorrow</option>
            </select>
          </div>
          <div className="relative">
            <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600" size={20} />
            <select
              name="timing"
              value={formData.timing}
              onChange={handleChange}
              required
              className="w-full py-3 pl-12 pr-4 bg-gray-100 border border-gray-300 rounded-lg cursor-pointer"
            >
              <option value="" disabled>Select Time...</option>
              {generateTimings()}
            </select>
          </div>
        </div>

        {/* Ride Options */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Available Rides:</p>
          <RideOptions onSelect={handleSelectRide} value={formData.selectedRide || 'Bike'} />
        </div>

        {/* Submit Button */}
        <button className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition duration-200" type="submit" disabled={loading}>
          {loading ? "Processing..." : "Continue Booking"}
        </button>
      </form>
    </div>
  );
};

export default FillRideDetails;
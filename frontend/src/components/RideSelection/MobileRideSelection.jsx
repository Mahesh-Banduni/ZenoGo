import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Locate, Clock10, ChevronUp, ChevronDown } from 'lucide-react';
import OlaMap from '../../pages/OlaMap';
import RideOptions from './RideOptions';
import useRideSelection from '../../hooks/useRideSelection';

const MobileRideSelection = () => {
  const navigate = useNavigate();
  const [selectedRide, setSelectedRide] = useState(null);
  const { formData, handleChange, handleSubmit, loading, status, clearInput } = useRideSelection();
  const [isExpanded, setIsExpanded] = useState(false);

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
      <div className="absolute bottom-0 left-0 right-0">
        <div className="bg-white rounded-t-xl shadow-lg">
          {/* Drag handle */}
          <div 
            className="flex justify-center py-2 cursor-pointer" 
            onClick={toggleExpanded}
          >
            {isExpanded ? 
              <ChevronDown className="text-gray-500" size={24} /> : 
              <ChevronUp className="text-gray-500" size={24} />
            }
          </div>
          
          {/* Basic info always visible */}
          <div className="px-4 pb-2">
            {/* Pickup location */}
            <div className="mb-3 relative flex items-center">
              <MapPin className="absolute left-3 text-black" size={20} />
              <input
                type="text"
                name="pickup"
                value={formData.pickup}
                onChange={handleChange}
                className="w-full p-2 pl-10 pr-8 bg-gray-50 border-2 border-gray-500 rounded-lg focus:bg-gray-100 focus:border-transparent"
                placeholder="Pickup Location..."
                required
              />
            </div>

            {/* Dropoff location */}
            <div className="mb-3 relative flex items-center">
              <Locate className="absolute left-3 text-black" size={20} />
              <input
                type="text"
                name="dropoff"
                value={formData.dropoff}
                onChange={handleChange}
                className="w-full p-2 pl-10 bg-gray-50 border-2 border-gray-500 rounded-lg focus:bg-gray-100 focus:border-transparent"
                placeholder="Dropoff Location..."
                required
              />
            </div>
          </div>

          {/* Expandable section */}
          {isExpanded && (
            <div className="px-4 pb-4 space-y-4 animate-slideUp">
              {/* Timing selection */}
              <div className="relative">
                <Clock10 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" size={20} />
                <select
                  name="timing"
                  value={formData.timing}
                  onChange={handleChange}
                  required
                  className="w-full p-2 pl-10 bg-gray-50 border-2 border-gray-500 rounded-lg transition duration-200 ease-in-out text-gray-700 cursor-pointer appearance-none"
                >
                  <option value="" disabled className="text-gray-400 bg-gray-50">
                    Select Time...
                  </option>
                  {Array.from({ length: 24 }, (_, i) => {
                    const hour = i % 12 === 0 ? 12 : i % 12;
                    const period = i < 12 ? "AM" : "PM";
                    return (
                      <option key={i} value={`${hour} ${period}`} className="bg-gray-50 focus:bg-gray-100 hover:border-gray-400">
                        {hour}:00 {period}
                      </option>
                    );
                  })}
                </select>
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-800">
                  ▼
                </span>
              </div>

              {/* Ride options */}
              <RideOptions
                onSelect={setSelectedRide}
                selectedOption={selectedRide}
                prices={{ mini: 10, sedan: 15, suv: 20 }}
                required
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
              {loading ? "Processing..." : "Book Ride"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileRideSelection;
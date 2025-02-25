import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RideOptions from './RideOptions';
import useRideSelection from '../../hooks/useRideSelection';
import { X, Compass, CompassIcon, Cross, CrossIcon, Locate, LucideCrosshair, MapIcon, MapPin, MapPinHouse, Navigation, Navigation2, Navigation2Icon, Navigation2Off, Navigation2OffIcon, NavigationIcon, NavigationOff, NavigationOffIcon, Calendar, ClockAlertIcon, Clock10, LocateFixed } from 'lucide-react';

const FillRideDetails = () => {
  const navigate = useNavigate();
  const [selectedRide, setSelectedRide] = useState(null);
  const { formData, handleChange, handleSubmit, loading, status, clearInput } = useRideSelection();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <form 
        className="sm:relative bg-white-800 rounded-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <center>
        <h1 className='text-xl text-gray-800 font-bold mb-6'>Add Ride Details</h1>
        </center>
          <div className="mb-4 mt-2 relative flex items-center">   
          <MapPin className="absolute left-3 text-black " size={20} />
              <input
                type="text"
                name="pickup"
                value={formData.pickup}
                onChange={handleChange}
                className="w-full p-2 pl-10  pr-8 bg-gray-50 border-2 border-gray-500 rounded-lg focus:bg-gray-100 focus:border-transparent"
                placeholder="Pickup Location..."
                required
              />
                {/* Show Navigation Icon when input is empty or focused */}
                {formData.pickup === "" && (
                  <Locate className="absolute right-3 text-black " size={20} />
                )}

                {/* Show Cross Icon when input has text */}
                {formData.pickup && (
                  <Cross
                    className="absolute right-3 cursor-pointer rotate-45 bg-gray-800 rounded-full fill-white"
                     size={16}
                    onClick={() => clearInput("pickup")}
                  />
                )}
            </div>
          <div className="mb-4 relative flex items-center">   
          <Navigation className="absolute left-3 text-black fill-gray-800" size={20} />
              <input
                type="text"
                name="dropoff"
                value={formData.dropoff}
                onChange={handleChange}
                className="w-full p-2 pl-10 bg-gray-50 border-2 border-gray-500 rounded-lg focus:bg-gray-100 focus:border-transparent"
                placeholder="Dropoff Location..."
                required
              />
              {/* Show Cross Icon when input has text */}
                   {formData.dropoff && (
                     <Cross
                       className="absolute right-3 cursor-pointer rotate-45 bg-gray-800 rounded-full fill-white"
                       size={16}
                      onClick={() => clearInput("dropoff")}
                     />
                   )}
            </div>
            <div className="mb-4 relative">
                <Clock10 className="absolute  left-3 top-1/2 transform -translate-y-1/2 text-black" size={20} />
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
                      <option key={i} value={`${hour} ${period}`} className='bg-gray-50 focus:bg-gray-100 hover:border-gray-400'>
                        {hour}:00 {period}
                      </option>
                    );
                  })}
                </select>
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-800">
                  ▼
                </span>
              </div>

          
          <RideOptions
            onSelect={setSelectedRide}
            selectedOption={selectedRide}
            prices={{ mini: 10, sedan: 15, suv: 20 }}
            required
          />

          <button
            className="w-full py-3 bg-gray-700 text-white rounded-lg font-bold"
            onSubmit={handleSubmit}
          >
            Continue Booking
          </button>
        </div>
        </form>
        </div>
  );
};

export default FillRideDetails;
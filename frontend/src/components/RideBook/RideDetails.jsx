import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RideOptions from './RideOptions';
import useRideSelectBook from '../../hooks/useRideSelectBook';
import { Calendar1, Currency, Cross, CrossIcon, Locate, LucideCrosshair, MapIcon, MapPin, MapPinHouse, Navigation, Navigation2, Navigation2Icon, Navigation2Off, Navigation2OffIcon, NavigationIcon, NavigationOff, NavigationOffIcon, Calendar, ClockAlertIcon, Clock10, LocateFixed, IndianRupee, BadgeIndianRupee, WalletCards, Wallet } from 'lucide-react';
import { IoCash } from 'react-icons/io5';

const RideDetails = (rideData) => {
  console.log(rideData.rideData);
  const navigate = useNavigate();
  const [paymentMode, setPaymentMode] = useState("Cash");
  const { formData, handleChange, handleSubmit, loading, status, clearInput } = useRideSelectBook();
  const [day, setDay] = useState("Today"); // Default to Today

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <form 
        className="sm:relative bg-white-800 rounded-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <center>
        <h1 className='text-xl text-gray-800 font-bold mb-6'>Ride Details</h1>
        </center>
          <div className="mb-4 mt-2 relative flex items-center">   
          <MapPin className="absolute left-3 text-black " size={20} />
              <input
                type="text"
                name="pickup"
                value={rideData.rideData.pickup}
                disabled={true}
                className="w-full p-2 pl-10 pr-8 bg-gray-50 border-2 border-gray-500 rounded-lg focus:bg-gray-100 focus:border-transparent"
                placeholder="Pickup Location..."
                required
              />
            </div>

          <div className="mb-4 relative flex items-center">   
          <Navigation className="absolute left-3 text-black fill-gray-800" size={20} />
              <input
                type="text"
                name="dropoff"
                value={rideData.rideData.dropoff}
                disabled={true}
                className="w-full p-2 pl-10 pr-8 bg-gray-50 border-2 border-gray-500 rounded-lg focus:bg-gray-100 focus:border-transparent"
                placeholder="Dropoff Location..."
                required
              />
            </div>
            <div className="space-y-2 flex flex-row justify-items-start gap-2">
      {/* Day Selection Dropdown */}
      <div className="relative items-center">
        <Calendar1 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" size={20} />
        <input
          value={rideData.rideData.day}
          disabled={true}
          className="w-full p-2 pl-10 mr-7 bg-gray-50 border-2 border-gray-500 rounded-lg transition duration-200 ease-in-out text-gray-700 cursor-pointer appearance-none"
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
          className="w-full p-2 pl-10 mr-5 bg-gray-50 border-2 border-gray-500 rounded-lg transition duration-200 ease-in-out text-gray-700 cursor-pointer appearance-none"
        >
        </input>
      </div>
    </div>

    <div className="mb-4 mt-2 relative flex items-center gap-2">   
          <Wallet className="absolute left-3 fill-amber-500 text-black" size={22} />
          <p className="absolute pl-10 text-black font-semibold text-xl">Fare</p>
              <input
                type="text"
                name="pickup"
                // value={rideData.rideData.fare}
                value="₹1234"
                disabled={true}
                className="w-full p-2 pl-23 pr-8 bg-gray-50 text-xl text-black border-2 border-gray-500 rounded-lg focus:bg-gray-100 focus:border-transparent"
                placeholder="Pickup Location..."
                required
              />
            </div>

            <div className="relative flex items-center">
  <BadgeIndianRupee className="absolute left-3 top-1/2 transform fill-emerald-500 -translate-y-1/2 text-white" size={28} />
  
  <select
    value={paymentMode} // Ensure it reflects the selected option
    onChange={(e) => setPaymentMode(e.target.value)} // Fix function to set state
    className="w-full p-2 pl-13 pr-8 bg-gray-50 border-2 font-semibold border-gray-500 rounded-lg transition duration-200 ease-in-out text-gray-700 cursor-pointer appearance-none"
  >
    <option value="Cash">Cash</option>
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

          <button
            className="w-full py-3 bg-gray-700 text-white rounded-lg font-bold"
            onSubmit={handleSubmit}
            disabled={loading}
          >

            {loading ? "Processing..." : "Book Now"}
          </button>
        </div>
        </form>
        </div>
  );
};

export default RideDetails;
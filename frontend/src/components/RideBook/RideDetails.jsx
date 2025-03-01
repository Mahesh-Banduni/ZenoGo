import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RideOptions from './RideOptions';
import useRideSelectBook from '../../hooks/useRideSelectBook';
import { Calendar1, MapPin, Navigation, Milestone, ClockIcon, Wallet, BadgeIndianRupee } from 'lucide-react';
import { IoCash } from 'react-icons/io5';

const RideDetails = ({ rideData }) => {
  const navigate = useNavigate();
  const [paymentMode, setPaymentMode] = useState("Cash");
  const { handleSubmit, loading } = useRideSelectBook();

  return (
    <div className="max-w-lg mx-auto px-4">
      <form 
        className="bg-white shadow-xl rounded-2xl p-6 space-y-5"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold text-gray-800 text-center">Ride Details</h1>

        {/* Pickup Address */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700" size={20} />
          <span className="block w-full p-3 pl-10 bg-gray-100 border border-gray-300 rounded-lg text-gray-800">
            {rideData.pickupAddress}
          </span>
        </div>

        {/* Drop-Off Address */}
        <div className="relative">
          <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700 fill-black" size={20} />
          <span className="block w-full p-3 pl-10 bg-gray-100 border border-gray-300 rounded-lg text-gray-800">
            {rideData.dropOffAddress}
          </span>
        </div>

        {/* Ride Info - Day, Distance, Duration */}
        <div className="grid grid-cols-3 gap-3">
          <div className="relative  p-3 rounded-lg border bg-amber-50 border-amber-500 text-center">
            <Calendar1 className="text-gray-700 mx-auto mb-1" size={20} />
            <p className="text-xs text-gray-600">Timings</p>
            <p className="font-semibold text-black">{rideData.day}, {rideData.timing}</p>
          </div>

          <div className="relative p-3 rounded-lg border bg-amber-50 border-amber-500 text-center">
            <Milestone className="text-gray-700 mx-auto mb-1" size={20} />
            <p className="text-xs text-gray-600">Distance</p>
            <p className="font-semibold text-black">{rideData.distance}</p>
          </div>

          <div className="relative p-3 rounded-lg border bg-amber-50 border-amber-500 text-center">
            <ClockIcon className="text-gray-700 mx-auto mb-1" size={20} />
            <p className="text-xs text-gray-600">Duration</p>
            <p className="font-semibold text-black">{rideData.duration}</p>
          </div>
        </div>

        {/* Fare Amount */}

        <div className="relative">
  <p className="text-gray-700 font-medium mb-1">Total Fare</p>
  <div className="relative">
    <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500 " size={22} />
    <p className="w-full p-3 pl-12 bg-gray-100 border border-gray-300 rounded-lg text-gray-800">
      {rideData.fare}
    </p>
  </div>
</div>


        {/* Payment Mode Selection */}
        <div className="relative">
  <p className="text-gray-700 font-medium mb-1">Payment Method</p>
  <div className="relative">
    <BadgeIndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" size={22} />
    <select
      value={paymentMode}
      onChange={(e) => setPaymentMode(e.target.value)}
      className="w-full p-3 pl-12 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 appearance-none cursor-pointer"
    >
      <option value="Cash">Pay By Cash</option>
      <option value="Digital Payment">Digital Payment</option>
    </select>
  </div>
</div>


        {/* Selected Ride */}
        <div>
          <p className="text-sm font-medium text-gray-600">Selected Ride:</p>
          <RideOptions selectedOption={rideData.selectedRide} />
        </div>

        {/* Book Now Button */}
        <button
          className="w-full py-3 bg-black text-white rounded-lg font-bold hover:bg-gray-800 transition duration-200"
          type="submit"
          disabled={loading}
        >
          {loading ? "Processing..." : "Book Now"}
        </button>
      </form>
    </div>
  );
};

export default RideDetails;

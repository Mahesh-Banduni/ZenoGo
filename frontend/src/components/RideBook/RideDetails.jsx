import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RideOptions from './RideOptions';
import useRideSelectBook from '../../hooks/useRideSelectBook';
import { Calendar1, MapPin, Navigation, Milestone, ClockIcon, Wallet, BadgeIndianRupee } from 'lucide-react';
import { useSelector } from 'react-redux';
import PaymentButton from './PaymentButton';
import useProfile from '../../hooks/useProfile';
import { toast } from 'react-toastify';

const RideDetails = ({ rideData }) => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const { handleSubmit, loading, clearAllValues, checkAndNavigate } = useRideSelectBook();
  const profile = useSelector((state) => state.profile);
  const { fetchProfile } = useProfile();

  useEffect(() => {
      fetchProfile(); // Fetch user data when component mounts
      checkAndNavigate({rideData});
    }, []);

    const handleRideSuccess = () => {
      toast.success("Ride successfully booked !", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          background: "#FAD767",
          color: "#3C423A",
          border: "2px solid white",
        },
        progressStyle: {
          background: "white",
        },
      });
      clearAllValues();
      setTimeout(() => {
        navigate("/all-rides");
      }, 1500);
    };

  const handlePaymentSuccess = (response) => {
    toast.success("Payment successful!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        background: "#FAD767",
        color: "#3C423A",
        border: "2px solid white",
      },
      progressStyle: {
        background: "white",
      },
    });
    handleRideSuccess();
    clearAllValues();
    setTimeout(() => {
      navigate("/all-rides", {
        state: {
          orderDetails: response,
          paymentId: response.razorpay_payment_id,
        },
      });
    }, 1500);
  };

  const handlePaymentError = (error) => {
    toast.error("Payment failed. Please try after some time...", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        background: "#FAD767",
        color: "#3C423A",
        border: "2px solid white",
      },
      progressStyle: {
        background: "white",
      },
    });
    clearAllValues();
    setTimeout(() => {
      navigate("/select-ride");
    }, 1500);
  };

  return (
    <div className="max-w-lg mx-auto px-4">
      <div 
        className="bg-white shadow-xl rounded-2xl p-6 space-y-5"
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
      value={paymentMethod}
      onChange={(e) => setPaymentMethod(e.target.value)}
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

        <div className="mt-6">
              <PaymentButton
                disabled={loading}
                rideData={rideData}
                paymentMethod={paymentMethod}
                passengerDetails={profile}
                onRideSuccess={handleRideSuccess}
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentError={handlePaymentError}
              />
            </div>
      </div>
    </div>
  );
};

export default RideDetails;

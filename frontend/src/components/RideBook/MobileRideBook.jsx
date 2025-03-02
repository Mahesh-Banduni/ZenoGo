import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BadgeIndianRupee,Milestone, ClockIcon, WalletCards, Wallet, MapPin, Locate, Clock10, ChevronUp, ChevronDown, Calendar1, Navigation, Cross } from 'lucide-react';
import OlaMap from '../OlaMap';
import RideOptions from './RideOptions';
import useRide from '../../hooks/useRide';
import useProfile from '../../hooks/useProfile';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import PaymentButton from './PaymentButton';

const MobileRideBook = ({rideData}) => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const { handleSubmit, loading, clearAllValues, checkAndNavigate } = useRide();
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
  
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Map takes full screen in the background */}
      <div className="absolute inset-0 w-full h-full">
        <OlaMap rideData={rideData}/>
      </div>

      {/* Bottom sheet UI */}
      <div className={`absolute bottom-0 left-0 right-0 pb-2 mb-6`}>
        <div className="bg-white rounded-t-xl shadow-lg">
          {/* Drag handle */}
          <div 
            className="flex justify-center py-2 cursor-pointer gap-2" 
            onClick={toggleExpanded}
          >
            <center>
        <h1 className='text-sm text-gray-800 font-bold mt-1'>Ride Details</h1>
        </center>
            {isExpanded ? 
              <ChevronDown className="text-gray-500 mt-1" size={24} /> : 
              <ChevronUp className="text-gray-500 mt-1" size={24} />
            }
            
          </div>
          
          {/* Basic info always visible */}
          <div className="px-4 pb-2 flex flex-col gap-3">
            
            {/* Pickup Address */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700" size={20} />
          <span className="text-sm block w-full p-2.5 pl-10 bg-gray-100 border border-gray-300 rounded-lg text-gray-800">
            {rideData.pickupAddress}
          </span>
        </div>

            {/* Dropoff location */}
            <div className="relative">
          <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700 fill-black" size={20} />
          <span className="block text-sm w-full p-2.5 pl-10 bg-gray-100 border border-gray-300 rounded-lg text-gray-800">
            {rideData.dropOffAddress}
          </span>
        </div>
          </div>

          {/* Expandable section */}
          {isExpanded && (
            <div className="px-4 pb-4 space-y-2.5 text-sm animate-slideUp">
              {/* Timing selection */}
              <div className="space-y-2 flex flex-row justify-items-start gap-2">
      {/* Day Selection Dropdown */}
      <div className="grid grid-cols-3 gap-3 mt-1">
          <div className="relative  p-2.5 rounded-lg border bg-amber-50 border-amber-500 text-center">
            <Calendar1 className="text-gray-700 mx-auto mb-1" size={20} />
            <p className="text-xs text-gray-600">Timings</p>
            <p className="font-semibold text-black text-sm">{rideData.day}, {rideData.timing}</p>
          </div>

          <div className="relative p-2.5 rounded-lg border bg-amber-50 border-amber-500 text-center">
            <Milestone className="text-gray-700 mx-auto mb-1" size={20} />
            <p className="text-xs text-gray-600">Distance</p>
            <p className="font-semibold text-black  text-sm">{rideData.distance}</p>
          </div>

          <div className="relative p-2.5 rounded-lg border bg-amber-50 border-amber-500 text-center">
            <ClockIcon className="text-gray-700 mx-auto mb-1" size={20} />
            <p className="text-xs text-gray-600">Duration</p>
            <p className="font-semibold text-black  text-sm">{rideData.duration}</p>
          </div>
        </div>
    </div>

    <div className="relative">
  <p className="text-gray-700 font-medium  text-sm mb-1">Total Fare</p>
  <div className="relative">
    <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500 " size={22} />
    <p className="w-full text-sm p-2.5 pl-12 bg-gray-100 border border-gray-300 rounded-lg text-gray-800">
      {rideData.fare}
    </p>
  </div>
</div>

<div className="relative">
  <p className="text-gray-700 font-medium mb-1  text-sm">Payment Method</p>
  <div className="relative">
    <BadgeIndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" size={22} />
    <select
      value={paymentMethod}
      onChange={(e) => setPaymentMethod(e.target.value)}
      className="w-full text-sm p-2.5 pl-12 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 appearance-none cursor-pointer"
    >
      <option value="Cash">Pay By Cash</option>
      <option value="Digital Payment">Digital Payment</option>
    </select>
    <span className="absolute right-2 top-2/4 transform -translate-y-1/2 pointer-events-none text-gray-800">▼</span>
  </div>
</div>

        <div>
          <p className="text-sm font-medium text-gray-700 mb-1.5">Selected Ride:</p>
          <RideOptions selectedOption={rideData.selectedRide} />
        </div>

            </div>
          )}

            <div className="mb-2 pb-1">
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
    </div>
  );
};

export default MobileRideBook;
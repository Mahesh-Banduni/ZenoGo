import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Calendar, Clock, MapPin, Car, ChevronDown, ChevronUp } from 'lucide-react';
import { setRideDetails, setLoading, setError } from '../store/rideSlice';
import usePassengerRide from '../hooks/usePassengerRide';

const RideStatusBadge = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'Confirmed':
        return 'bg-amber-600 text-white';
      case 'Ongoing':
        return 'bg-orange-500 text-white';
      case 'Completed':
        return 'bg-gray-600 text-white';
      case 'Cancelled':
        return 'bg-red-600 text-white';
      default:
        return 'bg-gray-300 text-gray-800';
    }
  };

  return (
    <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${getStatusStyles()}`}>
      {status}
    </span>
  );
};

const RideCard = ({ ride }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div 
        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <Car className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-medium text-gray-900">Ride #{ride.rideCode}</span>
          </div>
          <RideStatusBadge status={ride.rideStatus} />
        </div>
        <div className="flex flex-col sm:flex-row gap-3 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <div className='inline-flex  gap-1'>
            <p className="text-xs text-gray-600 font-semibold">Ride Date:</p>
            <p className="text-xs text-gray-600">{new Date(ride.rideTiming).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <div className='inline-flex  gap-1'>
            <p className="text-xs text-gray-600 font-semibold">Time:</p>
            <p className="text-xs text-gray-600">{new Date(ride.rideTiming).toLocaleTimeString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            <span>{isExpanded ? 'Show less' : 'Show more'}</span>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 border-t border-gray-200">
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-gray-600" />
              <h4 className="text-sm font-medium text-gray-900">Pickup & Drop-off</h4>
            </div>
            <div className='inline-flex gap-1'>
            <p className="text-xs text-gray-600 font-semibold">Pickup Location:</p>
            <p className="text-xs text-gray-600">{ride.pickupAddress}</p>
            </div>
            <br />
            <div className='inline-flex  gap-1'>
            <p className="text-xs text-gray-600 font-semibold">Drop-off Location:</p>
            <p className="text-xs text-gray-600">{ride.dropOffAddress}</p>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Ride Details</h4>
            <div className='inline-flex  gap-1'>
            <p className="text-xs text-gray-600 font-semibold">Distance:</p>
            <p className="text-xs text-gray-600">{ride.distance}</p>
            </div>
            <br />
            <div className='inline-flex  gap-1'>
            <p className="text-xs text-gray-600 font-semibold">Duration: </p>
            <p className="text-xs text-gray-600">{ride.duration}</p>
            </div>
            <br />
            <div className='inline-flex  gap-1'>
            <p className="text-xs text-gray-600 font-semibold">Payment: </p>
            <p className="text-xs text-gray-600">{ride.paymentMethod} - {ride.paymentStatus}</p>
            </div>
            <br />
            <div className='inline-flex  gap-1'>
            <p className="text-xs text-gray-600 font-semibold">Fare: </p>
            <p className="text-xs text-gray-600">₹{ride.fare}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ActiveRides = () => {
  const dispatch = useDispatch();
  const { rides, loading, error } = useSelector(state => state.ride);
  const { fetchRides } = usePassengerRide();

  useEffect(() => {
    fetchRides();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-red-600">{error}</p>
      </div>
    );
  }

  if (!rides.length) {
    return (
      <div className="text-center py-8">
        <Car className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No active rides</h3>
        <p className="text-sm text-gray-600">Your scheduled rides will appear here</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
  <h2 className="text-xl font-semibold text-gray-900 mb-6">Active Rides</h2>
  {rides
    .filter(
      (ride) =>
        ride.rideTiming > Date.now() &&
        ride.rideStatus !== "completed" &&
        ride.rideStatus !== "cancelled"
    )
    .map((ride) => (
      <RideCard key={ride.rideId} ride={ride} />
    ))}
</div>
  );
};

export default ActiveRides;
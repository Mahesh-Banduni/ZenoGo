import { useState } from 'react';
import RideOptions from '../components/RideOptions';
import OlaMap from "./OlaMap";

const Book =()=>{
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedRide, setSelectedRide] = useState('mini');
  const [paymentMethod, setPaymentMethod] = useState('card');
  

  const estimatedFare = calculateFare(pickup, destination, selectedRide);

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card' },
    { id: 'upi', name: 'UPI' },
    { id: 'cash', name: 'Cash' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pickup Location
                </label>
                <input
                  type="text"
                  className="mt-1 w-full px-4 py-2 rounded-lg border"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Destination
                </label>
                <input
                  type="text"
                  className="mt-1 w-full px-4 py-2 rounded-lg border"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
            </div>

            <div className="bg-gray-100 rounded-lg p-4">
              {/* Mappls Map Component would go here */}
              <div className="h-64 bg-gray-300 rounded-lg"></div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-bold mb-4">Estimated Fare: ${estimatedFare}</h3>
            
            <RideOptions
              onSelect={setSelectedRide}
              selectedOption={selectedRide}
              prices={{ mini: 10, sedan: 15, suv: 20 }}
            />
          </div>

          <div className="mt-6">
            <h3 className="font-bold mb-4">Payment Method</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  className={`p-4 rounded-lg border ${
                    paymentMethod === method.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300'
                  }`}
                  onClick={() => setPaymentMethod(method.id)}
                >
                  {method.name}
                </button>
              ))}
            </div>
          </div>

          <button
            className="mt-6 w-full py-3 bg-blue-500 text-white rounded-lg font-bold"
            onClick={() => console.log('Booking ride...')}
          >
            Book Ride
          </button>
        </div>
      </div>
    </div>
  );
  }

const BookRide = () => {
    return (
        <div>
            <h1>Ola Maps Integration</h1>
            <Book />
            <OlaMap />
        </div>
    );

};

export default BookRide;
import { createSlice } from '@reduxjs/toolkit';

const rideSlice = createSlice({
  name: 'ride',
  initialState: {
    rides: [],
    loading: false,
    error: null
  },
  reducers: {
    setRideDetails: (state, action) => {
        const rideData = action.payload.data;
        if (!Array.isArray(rideData) || rideData.length === 0) {
          state.rides = []; // Clear previous rides if no new data
          return;
        }
      
        // Mapping multiple rides
        state.rides = rideData.map(ride => ({
          rideId: ride._id,
          fare: ride.fare,
          paymentStatus: ride.paymentStatus,
          rideStatus: ride.rideStatus,
          rideTiming: ride.rideTiming,
          pickupAddress: ride.pickupAddress,
          dropOffAddress: ride.dropOffAddress,
          distance: ride.distance,
          duration: ride.duration,
          paymentMethod: ride.paymentMethod,
          paymentStatus: ride.paymentStatus,
          rideCode: ride.rideCode,
          createdAt: ride.createdAt
        }));
      },
      
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { setRideDetails, setLoading, setError } = rideSlice.actions;
export default rideSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './profileSlice';
import rideSlicer from './rideSlice';

// If you have more reducers, add them here
const store = configureStore({
  reducer: {
    profile: profileReducer,
    ride: rideSlicer
  },
});

export default store;

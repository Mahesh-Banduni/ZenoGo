import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './profileSlice';

// If you have more reducers, add them here
const store = configureStore({
  reducer: {
    profile: profileReducer,
  },
});

export default store;

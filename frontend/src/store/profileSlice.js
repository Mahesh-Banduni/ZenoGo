import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    name:'',
    email:'',
    phone:'',
    role: '',
    loading: false,
    error: null
  },
  reducers: {
    setProfileData: (state, action) => {
      const profileData = action.payload.data;
      state.email=profileData.email;
      state.phone=profileData.phone;
      state.name=profileData.name;
      state.role=profileData.role;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { setProfileData, setLoading, setError } = profileSlice.actions;
export default profileSlice.reducer;
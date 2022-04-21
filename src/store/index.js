import userSlice from './userSlice';
import videoSlice from './videoSlice';
import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({
    reducer: {
      user:userSlice.reducer,
      video:videoSlice.reducer
    }
  });
  
  export default store;
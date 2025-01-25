import { configureStore } from '@reduxjs/toolkit';
   import userSliceReducer from './UserSlice';

   const store = configureStore({
       reducer: {
           Users: userSliceReducer
       }
   });

   export default store;